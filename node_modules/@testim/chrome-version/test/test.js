const chai = require('chai');
const expect = chai.expect;
const Buffer = require('buffer').Buffer;

// rewrite to get access for testing
const rewire = require("rewire");
const chromeVersionModule = rewire("../index.js");
const extractChromeVersionNumer = chromeVersionModule.__get__('extractChromeVersionNumer');
const getChromeVersionFromOsa = chromeVersionModule.__get__('getChromeVersionFromOsa');
const chromeFinderLinuxModule = rewire("../chrome-finder/linux.js");
const findChromeExecutablesForLinuxDesktop = chromeFinderLinuxModule.__get__('findChromeExecutablesForLinuxDesktop');
const findChromeExecutablesForLinux = chromeFinderLinuxModule.__get__('findChromeExecutablesForLinux');
const chromeFinderDarwinModule = rewire("../chrome-finder/darwin.js");
const findChromeForDarwin = chromeFinderDarwinModule.__get__('darwin');
const chromeFinderWin32Module = rewire("../chrome-finder/win32.js");
const findChromeForWin32 = chromeFinderWin32Module.__get__('win32');

describe('Chrome Finder', function() {

  describe('extractChromeVersionNumer from Google Chrome 95.0.4638', function() {
    it('should return "95.0.4638"', function() {
      const versionString = 'Google Chrome 95.0.4638';
      const versionNumber = extractChromeVersionNumer(versionString);
      expect(versionNumber).to.equal('95.0.4638');
    });
  });

  describe('extractChromeVersionNumer from Google Chrome 96.0.4664.110', function() {
    it('should return "96.0.4664.110"', function() {
      const versionString = 'Google Chrome 96.0.4664.110';
      const versionNumber = extractChromeVersionNumer(versionString);
      expect(versionNumber).to.equal('96.0.4664.110');
    });
  });

  describe('extractChromeVersionNumer from Google Chrome 97.0.4692.71', function() {
    it('should return "97.0.4692.71"', function() {
      const versionString = 'Google Chrome 97.0.4692.71';
      const versionNumber = extractChromeVersionNumer(versionString);
      expect(versionNumber).to.equal('97.0.4692.71');
    });
  });

  describe('extractChromiumVersionNumer from Chromium 90.0.4430.212 Fedora Project', function() {
    it('should return "90.0.4430.212"', function() {
      const versionString = 'Chromium 90.0.4430.212 Fedora Project';
      const versionNumber = extractChromeVersionNumer(versionString);
      expect(versionNumber).to.equal('90.0.4430.212');
    });
  });

  describe('extractChromiumVersionNumer from Chromium 98.0.4753.0', function() {
    it('should return "98.0.4753.0"', function() {
      const versionString = 'Chromium 98.0.4753.0';
      const versionNumber = extractChromeVersionNumer(versionString);
      expect(versionNumber).to.equal('98.0.4753.0');
    });
  });

  describe('getChromeVersionFromOsa when includeChromium=false', function() {
    it('should only find Chrome', function() {
      const includeChromium = false;

      const mockVersion = '97.0.4692.71';

      var execSyncCommand;
      chromeVersionModule.__set__('execSync', function(command) {
          execSyncCommand = command;
          return Buffer.from(mockVersion);
      });

      const version = getChromeVersionFromOsa(includeChromium);

      expect(execSyncCommand).to.include('Google Chrome');
      expect(execSyncCommand).to.not.include('Chromium');

      expect(version).to.equal(mockVersion);
    });
  });

  describe('getChromeVersionFromOsa when includeChromium=true', function() {
    it('should only find Chromium', function() {
      const includeChromium = true;

      const mockVersion = '98.0.4753.0';

      var execSyncCommands = [];
      chromeVersionModule.__set__('execSync', function(command) {
          execSyncCommands.push(command);
          if (execSyncCommands.length == 1) {
            throw "not found"
          }
          return Buffer.from(mockVersion);
      });

      const version = getChromeVersionFromOsa(includeChromium);

      expect(execSyncCommands.length).equal(2);
      expect(execSyncCommands[0]).to.include('Google Chrome');
      expect(execSyncCommands[1]).to.include('Chromium');

      expect(version).to.equal(mockVersion);
    });
  });
});

describe('Chrome Finder Linux Module', function() {

  describe('Linux Desktop when includeChromium=false', function() {
    it('should only find Chrome', function() {

      const includeChromium = false;

      const mockChromePaths = [
        '/opt/google/chrome/google-chrome',
        '/home/user/Downloads/chrome-linux/chrome-wrapper'
      ];

      chromeFinderLinuxModule.__set__('canAccess', function(file) {
        return true;
      });

      var execSyncCommand;
      chromeFinderLinuxModule.__set__('execSync', function(command) {
          execSyncCommand = command;
          return Buffer.from(mockChromePaths.join('\n'));
      });

      const mockDesktopFolder = "mock-desktop-folder";
      const executables = findChromeExecutablesForLinuxDesktop(mockDesktopFolder, includeChromium);

      expect(execSyncCommand).to.include(mockDesktopFolder);
      expect(execSyncCommand).to.not.include('|chromium');

      expect(executables).to.have.lengthOf(2);
      expect(executables).to.deep.equal(mockChromePaths);
    });
  });

  describe('Linux Desktop when includeChromium=true', function() {
    it('should find Chrome and Chromium', function() {

      const includeChromium = true;

      const mockChromePaths = [
        '/opt/google/chrome/google-chrome',
        '/home/user/Downloads/chrome-linux/chrome-wrapper',
        '/usr/local/bin/chromium-browser'
      ];

      chromeFinderLinuxModule.__set__('canAccess', function(file) {
        return true;
      });

      var execSyncCommand;
      chromeFinderLinuxModule.__set__('execSync', function(command) {
          execSyncCommand = command;
          return Buffer.from(mockChromePaths.join('\n'));
      });

      const mockDesktopFolder = "mock-desktop-folder";
      const executables = findChromeExecutablesForLinuxDesktop(mockDesktopFolder, includeChromium);

      expect(execSyncCommand).to.include(mockDesktopFolder);
      expect(execSyncCommand).to.include('|chromium');

      expect(executables).to.have.lengthOf(3);
      expect(executables).to.deep.equal(mockChromePaths);
    });
  });

  describe('Linux when includeChromium=false', function() {
    it('should only find Chrome', function() {

      const includeChromium = false;

      const mockPaths = [
        '/mock-path'
      ];

      chromeFinderLinuxModule.__set__('fs', {
        existsSync: function(file) {
          return true;
        }
      });
      chromeFinderLinuxModule.__set__('canAccess', function(file) {
        return true;
      });
      chromeFinderLinuxModule.__set__('isExecutable', function(file) {
        return true;
      });

      const executables = findChromeExecutablesForLinux(mockPaths, includeChromium);
      expect(executables).to.have.lengthOf(2);

      const expectedExecutables = mockPaths.map(mockPath => ['google-chrome-stable', 'google-chrome'].map(executable => mockPath + '/' + executable)).reduce((acc, val) => acc.concat(val), []);
      expect(executables).to.deep.equal(expectedExecutables);
    });
  });

  describe('Linux when includeChromium=true', function() {
    it('should find Chrome and Chromium', function() {

      const includeChromium = true;

      const mockPaths = [
        '/mock-path'
      ];

      chromeFinderLinuxModule.__set__('fs', {
        existsSync: function(file) {
          return true;
        }
      });
      chromeFinderLinuxModule.__set__('canAccess', function(file) {
        return true;
      });
      chromeFinderLinuxModule.__set__('isExecutable', function(file) {
        return true;
      });

      const executables = findChromeExecutablesForLinux(mockPaths, includeChromium);
      expect(executables).to.have.lengthOf(5);

      const expectedExecutables = mockPaths.map(mockPath => ['google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser', 'chromium/chrome'].map(executable => mockPath + '/' + executable)).reduce((acc, val) => acc.concat(val), []);
      expect(executables).to.deep.equal(expectedExecutables);
    });
  });
});

describe('Chrome Finder Darwin Module', function() {

  describe('Darwin when includeChromium=false', function() {
    it('should only find Chrome', function() {

      const includeChromium = false;

      const mockChromePaths = [
        '/Applications/Google Chrome.app'
      ];

      chromeFinderDarwinModule.__set__('canAccess', function(file) {
        return true;
      });

      var execSyncCommand;
      chromeFinderDarwinModule.__set__('execSync', function(command) {
          execSyncCommand = command;
          return Buffer.from(mockChromePaths.join('\n'));
      });

      const executables = findChromeForDarwin(includeChromium);
      expect(execSyncCommand).to.not.include('|chromium');

      expect(executables).to.have.lengthOf(1);
      expect(executables).to.deep.equal(mockChromePaths.map(mockChromePath => mockChromePath + '/Contents/MacOS/Google Chrome'));
    });
  });

  describe('Darwin when includeChromium=true', function() {
    it('should only find Chrome', function() {

      const includeChromium = true;

      const mockChromePaths = [
        '/Applications/Google Chrome.app',
        '/Applications/Chromium.app'
      ];

      const expectedExecutables = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium'
      ];

      chromeFinderDarwinModule.__set__('canAccess', function(file) {
        return expectedExecutables.includes(file);
      });

      var execSyncCommand;
      chromeFinderDarwinModule.__set__('execSync', function(command) {
          execSyncCommand = command;
          return Buffer.from(mockChromePaths.join('\n'));
      });

      const executables = findChromeForDarwin(includeChromium);
      expect(execSyncCommand).to.include('|chromium');

      expect(executables).to.have.lengthOf(2);
      expect(executables).to.deep.equal(expectedExecutables);
    });
  });
});

describe('Chrome Finder Win32 Module', function() {

  describe('Win32 when includeChromium=false', function() {
    it('should only find Chrome', function() {

      const includeChromium = false;

      chromeFinderWin32Module.__set__('canAccess', function(file) {
        return true;
      });

      chromeFinderWin32Module.__set__('procesEnv', {
        LOCALAPPDATA: 'mock-local-app-data',
        PROGRAMFILES: 'mock-program-files',
        'PROGRAMFILES(X86)': 'mock-program-files-x86'
      });

      const executables = findChromeForWin32(includeChromium);

      expect(executables).to.have.lengthOf(9);
      expect(executables).to.deep.equal([
        'mock-local-app-data\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-local-app-data\\Google\\Chrome\\Application\\chrome.exe',
        'mock-local-app-data\\chrome-win32\\chrome.exe',
        'mock-program-files\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-program-files\\Google\\Chrome\\Application\\chrome.exe',
        'mock-program-files\\chrome-win32\\chrome.exe',
        'mock-program-files-x86\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-program-files-x86\\Google\\Chrome\\Application\\chrome.exe',
        'mock-program-files-x86\\chrome-win32\\chrome.exe'
      ]);
    });
  });

  describe('Win32 when includeChromium=true', function() {
    it('should only find Chrome', function() {

      const includeChromium = true;

      chromeFinderWin32Module.__set__('canAccess', function(file) {
        return true;
      });

      chromeFinderWin32Module.__set__('procesEnv', {
        LOCALAPPDATA: 'mock-local-app-data',
        PROGRAMFILES: 'mock-program-files',
        'PROGRAMFILES(X86)': 'mock-program-files-x86'
      });

      const executables = findChromeForWin32(includeChromium);

      expect(executables).to.have.lengthOf(12);
      expect(executables).to.deep.equal([
        'mock-local-app-data\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-local-app-data\\Google\\Chrome\\Application\\chrome.exe',
        'mock-local-app-data\\chrome-win32\\chrome.exe',
        'mock-local-app-data\\Chromium\\Application\\chrome.exe',
        'mock-program-files\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-program-files\\Google\\Chrome\\Application\\chrome.exe',
        'mock-program-files\\chrome-win32\\chrome.exe',
        'mock-program-files\\Chromium\\Application\\chrome.exe',
        'mock-program-files-x86\\Google\\Chrome SxS\\Application\\chrome.exe',
        'mock-program-files-x86\\Google\\Chrome\\Application\\chrome.exe',
        'mock-program-files-x86\\chrome-win32\\chrome.exe',
        'mock-program-files-x86\\Chromium\\Application\\chrome.exe'
      ]);
    });
  });
});
