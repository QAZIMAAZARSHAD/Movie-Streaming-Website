const { execSync, execFileSync } = require('child_process');
const path = require('path').posix;
const fs = require('fs');
const { canAccess, sort, isExecutable, newLineRegex } = require('./util');


function findChromeExecutablesForLinuxDesktop(folder, includeChromium = false) {
  const argumentsRegex = /(^[^ ]+).*/; // Take everything up to the first space
  const chromeExecRegex = '^Exec=\/.*\/(google|chrome' + (includeChromium ? '|chromium' : '') + ')-.*';

  let installations = [];
  if (canAccess(folder)) {
    // Output of the grep & print looks like:
    //    /opt/google/chrome/google-chrome --profile-directory
    //    /home/user/Downloads/chrome-linux/chrome-wrapper %U
    let execPaths;
    execPaths = execSync(`find "${folder}" -type f -exec grep -E "${chromeExecRegex}" "{}" \\; | awk -F '=' '{print $2}'`);

    execPaths = execPaths
      .toString()
      .split(newLineRegex)
      .map((execPath) => execPath.replace(argumentsRegex, '$1'));

    execPaths.forEach((execPath) => canAccess(execPath) && installations.push(execPath));
  }

  return installations;
}

function findChromeExecutablesForLinux(validChromePaths, includeChromium = false) {
  const executables = [
    'google-chrome-stable',
    'google-chrome',
    ... includeChromium ? ['chromium', 'chromium-browser', 'chromium/chrome'] : []  // chromium/chrome is for toradex machines where "chromium" is a directory. seen on Angstrom v2016.12
  ];

  return executables.map(executable => {
    const existingPaths = validChromePaths.map(possiblePath => {
      try {
        const chromePathToTest = possiblePath + '/' + executable;
        if (fs.existsSync(chromePathToTest) && canAccess(chromePathToTest) && isExecutable(chromePathToTest)) {
          return [ chromePathToTest ];
        }
      } catch (err) {
        // not installed on this path or inaccessible
      }
      return [];
    }).reduce((acc, val) => acc.concat(val), []); //.filter((foundChromePath) => foundChromePath);

    // skip asking "which" command if the binary was found by searching the known paths.
    if (existingPaths && existingPaths.length > 0) {
      return existingPaths;
    }

    try {
      const chromePath = execFileSync('which', [executable]).toString().split(newLineRegex)[0];
      if (canAccess(chromePath)) {
        return [ chromePath ];
      }
    } catch (err) {
      // cmd which not installed.
    }

    return [];

  }).reduce((acc, val) => acc.concat(val), []);
}

/**
 * Look for linux executables in 2 ways
 * 1. Look into the directories where .desktop are saved on gnome based distro's
 * 2. Look for google-chrome-stable and google-chrome executables by using the which command
 * If includeChromium is set, also look for chromium, chromium-browser, and chromium/chrome executables by using the which command
 */
function linux(includeChromium = false) {
  let installations = [];

  // 1. Look into the directories where .desktop are saved on gnome based distro's
  const desktopInstallationFolders = [
    path.join(require('os').homedir(), '.local/share/applications/'),
    '/usr/share/applications/',
  ];
  desktopInstallationFolders.forEach(folder => {
    installations = installations.concat(findChromeExecutablesForLinuxDesktop(folder, includeChromium));
  });

  // 2. Look for google-chrome-stable and google-chrome (and optionally chromium, chromium-browser, and chromium-chrome) executables by using the which command
  // see http://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/
  const validChromePaths = [
    '/usr/bin',
    '/usr/local/bin',
    '/usr/sbin',
    '/usr/local/sbin',
    '/opt/bin',
    '/usr/bin/X11',
    '/usr/X11R6/bin'
  ];
  installations = installations.concat(findChromeExecutablesForLinux(validChromePaths, includeChromium));

  const priorities = [
    { regex: /chromium$/, weight: 52 },
    { regex: /chrome-wrapper$/, weight: 51 },
    { regex: /google-chrome-stable$/, weight: 50 },
    { regex: /google-chrome$/, weight: 49 },
    { regex: /chromium-browser$/, weight: 48 },
    { regex: /chrome$/, weight: 47 },
  ];

  return sort(Array.from(new Set(installations.filter(Boolean))), priorities);
}

module.exports = linux;
