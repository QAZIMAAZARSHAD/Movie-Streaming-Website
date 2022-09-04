const path = require('path').win32;
const { canAccess } = require('./util');
const procesEnv = process.env;


function win32(includeChromium = false) {
  const installations = [];
  const suffixes = [
    '\\Google\\Chrome SxS\\Application\\chrome.exe',
    '\\Google\\Chrome\\Application\\chrome.exe',
    '\\chrome-win32\\chrome.exe',
    ... includeChromium ? ['\\Chromium\\Application\\chrome.exe'] : [],
    // '\\Google\\Chrome Beta\\Application\\chrome.exe',
  ];
  const prefixes = [
    procesEnv.LOCALAPPDATA,
    procesEnv.PROGRAMFILES,
    procesEnv['PROGRAMFILES(X86)']
  ].filter(prefix => prefix);  // filter out undefined

  prefixes.forEach(prefix => suffixes.forEach(suffix => {
    const chromePath = path.join(prefix, suffix);
    if (canAccess(chromePath)) {
      installations.push(chromePath);
    }
  }));
  return installations;
}

module.exports = win32;
