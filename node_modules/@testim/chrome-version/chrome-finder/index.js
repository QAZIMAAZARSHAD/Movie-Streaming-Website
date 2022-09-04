'use strict';
const ERROR_PLATFORM_NOT_SUPPORT = new Error('platform not support');
const ERROR_NO_INSTALLATIONS_FOUND = new Error('no chrome installations found');

/**
 * Find a executable Chrome (or Chromium) for all supported systems.
 *
 * Supports macOS, Linux, and Windows.
 *
 * @param {boolean} includeChromium true if we should consider Chromium in our search, false otherwise.
 * @returns {string} the first full path to an executable Chrome (or Chromium)
 * @throws
 * if no executable Chrome (or Chromium) find, ERROR_NO_INSTALLATIONS_FOUND will be throw
 * if platform is not one if ['win32','darwin','linux'], ERROR_PLATFORM_NOT_SUPPORT will be throw
 */
function findChrome(includeChromium = false) {
  const { platform } = process;
  let installations = [];
  switch (platform) {
    case 'win32':
      installations = require('./win32')(includeChromium);
      break;
    case 'darwin':
      installations = require('./darwin')(includeChromium);
      break;
    case 'linux':
      installations = require('./linux')(includeChromium);
      break;
    default:
      throw ERROR_PLATFORM_NOT_SUPPORT;
  }
  if (installations.length) {
    return installations[0];
  } else {
    throw ERROR_NO_INSTALLATIONS_FOUND;
  }
}

module.exports = findChrome;
