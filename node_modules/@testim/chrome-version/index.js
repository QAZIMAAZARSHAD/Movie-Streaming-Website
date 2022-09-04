'use strict';

const findChrome = require('./chrome-finder');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const readdir = util.promisify(require('fs').readdir);
const { execSync } = require('child_process');

async function getChromeVersionFromCli(includeChromium) {

    let chromePath;
    try {
        chromePath = findChrome(includeChromium);
    } catch (err) {
        return null;
    }

    const res = await exec(chromePath.replace(/ /g, '\\ ') + ' --version');

    const version = extractChromeVersionNumer(res.stdout);
    return version;
}

function extractChromeVersionNumer(chromeVersionString) {
    return chromeVersionString.replace(/.+\s([0-9]+(\.[0-9]+)*)\s?.*/, '$1');
}

async function getChromeVersionWin(includeChromium) {

    let chromePath;
    try {
        chromePath = findChrome(includeChromium);
    } catch (err) {
        return null;
    }

    const versionPath = path.dirname(chromePath);

    const contents = await readdir(versionPath);

    const versions = contents.filter(a => /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/g.test(a));

    // returning oldest in case there is an updated version and chrome still hasn't relaunched
    const oldest = versions.sort((a, b) => a > b)[0];

    return oldest;
}

function getChromeVersionFromOsa(includeChromium) {

    try {
        const version = execSync('osascript -e \'tell application "Google Chrome" to get version\'').toString().trim();
        return version;
    } catch (err) {
        if (!includeChromium) {
            return null;
        }
        // else fall-through to check for Chromium below
    }

    try {
        const version = execSync('osascript -e \'tell application "Chromium" to get version\'').toString().trim();
        return version;
    } catch (err) {
        return null;
    }
}


async function innerGetChromeVersion(includeChromium = false) {

    const os = process.platform;

    if (os === 'darwin') return getChromeVersionFromOsa(includeChromium);
    if (os === 'linux') return getChromeVersionFromCli(includeChromium);
    if (os.includes('win')) return getChromeVersionWin(includeChromium);

    console.log(`${os} is not supported`);

    return null;
}

/**
 * Gets the version of Chrome (or Chromium) that is installed.
 *
 * Supports macOS, Linux, and Windows.
 *
 * @param {boolean} includeChromium true if we should consider Chromium in our search, false otherwise.
 * @returns {string} the version number of Chrome (or Chromium), or null if the OS is not supported.
 */
async function getChromeVersion(includeChromium = false) {
    const res = await innerGetChromeVersion(includeChromium);
    if (typeof res === 'string') {
        return res.trim();
    }
    return res;
}

if (require.main == module) {
    getChromeVersion().then(v => console.log(v));
}

module.exports = {
    getChromeVersion
};