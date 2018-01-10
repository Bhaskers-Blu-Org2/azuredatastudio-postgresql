var gulp = require('gulp');
var fs = require('fs');
var gutil = require('gulp-util');
var cproc = require('child_process');
var os = require('os');
var del = require('del');
var path = require('path');

function installSqlToolsService(platform) {
   let installer = getServiceInstaller()
   return installer.installService(platform);
}

function getServiceInstaller() {
    var Constants = require('../out/src/models/constants').Constants;
    var ServiceInstaller = require('../out/src/languageservice/serviceInstallerUtil').ServiceInstaller;
    return new ServiceInstaller(new Constants())
}

gulp.task('ext:install-service', () => {
    return installSqlToolsService();
});

function doPackageSync(packageName) {
    var vsceArgs = [];
    vsceArgs.push('vsce');
    vsceArgs.push('package'); // package command

    if (packageName !== undefined) {
        vsceArgs.push('-o');
        vsceArgs.push(packageName);
    }
    var command = vsceArgs.join(' ');
    console.log(command);
    return cproc.execSync(command);
}

function cleanServiceInstallFolder() {
    let installer = getServiceInstaller();
    return new Promise((resolve, reject) => {
        installer.getServiceInstallDirectoryRoot().then((serviceInstallFolder) => {
            console.log('Deleting Service Install folder: ' + serviceInstallFolder);
            del(serviceInstallFolder + '/*').then(() => {
                resolve();
            }).catch((error) => {
                reject(error)
            });
        });
    });

}

function doOfflinePackage(runtimeId, platform, packageName) {
    return installSqlToolsService(platform).then(() => {
       return doPackageSync(packageName + '-' + runtimeId + '.vsix');
    });
}

//Install vsce to be able to run this task: npm install -g vsce
gulp.task('package:online', () => {
    return cleanServiceInstallFolder().then(() => {
         return doPackageSync();
         //return installSqlToolsService();
    });
});

//Install vsce to be able to run this task: npm install -g vsce
gulp.task('package:offline', () => {
    const platform = require('../out/src/models/platform');
    const Runtime = platform.Runtime;
    var json = JSON.parse(fs.readFileSync('package.json'));
    var name = json.name;
    var version = json.version;
    var packageName = name + '-' + version;

    var packages = [];
    packages.push({rid: 'win-x64', runtime: Runtime.Windows_64});
    packages.push({rid: 'win-x86', runtime: Runtime.Windows_86});
    packages.push({rid: 'osx', runtime: Runtime.OSX});
    packages.push({rid: 'linux-x64', runtime: Runtime.Linux_64});

    var promise = Promise.resolve();
    cleanServiceInstallFolder().then(() => {
            packages.forEach(data => {
              promise = promise.then(() => {
                 return doOfflinePackage(data.rid, data.runtime, packageName).then(() => {
                        return cleanServiceInstallFolder();
                 });
              });
           });
    });

    return promise;
});
