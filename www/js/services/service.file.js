angular.module('starter.service.file', [])

.factory('FileService', function($http,  $cordovaFile){
    return {
        checkSpace: function(){
            return $cordovaFile.getFreeDiskSpace()
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        checkFileByDir: function(dir){
            return $cordovaFile.checkDir(cordova.file.dataDirectory, dirName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },
        
        checkFileByFile: function(fileName){
            return $cordovaFile.checkFile(cordova.file.dataDirectory, fileName)
            .then(function (success) {

                return true;
            }, function (error) {
                
                return false;
            });
        },
        
        createDir: function(dirName){
            return $cordovaFile.createDir(cordova.file.dataDirectory, dirName, false)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        removeAndCreateAndWrite: function(fileName, content){
            return $cordovaFile.removeFile(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                $cordovaFile.createFile(cordova.file.dataDirectory, fileName, true)
                .then(function (success) {
                    $cordovaFile.writeExistingFile(cordova.file.dataDirectory, fileName, content)
                    .then(function (success) {
                        return success;
                    }, function (error) {
                        return error;
                    });  
                }, function (error) {
                    return error;
                });  
            }, function (error) {
                $cordovaFile.createFile(cordova.file.dataDirectory, fileName, true)
                .then(function (success) {
                    $cordovaFile.writeExistingFile(cordova.file.dataDirectory, fileName, content)
                    .then(function (success) {
                        return success;
                    }, function (error) {
                        return error;
                    });  
                }, function (error) {
                    return error;
                });
            });            
        },

        createFile: function(fileName){
           return $cordovaFile.createFile(cordova.file.dataDirectory, fileName, true)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });       
        },
        
        removeDir: function(dirName){
           return $cordovaFile.removeDir(cordova.file.dataDirectory, dirName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });    
        },
        
        removeFile: function(fileName){
           return $cordovaFile.removeFile(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });    
        },
        
        writeNewFile: function(fileName, content){
            return $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, content, true)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },
        
        writeInAFile: function(fileName, content){
           return $cordovaFile.writeExistingFile(cordova.file.dataDirectory, fileName, content)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });  
        },
        
        readAsText: function(fileName){
           return $cordovaFile.readAsText(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        readAsDataURL: function(fileName){
           return $cordovaFile.readAsDataURL(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        readAsBinaryString: function(fileName){
           return $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        readAsArrayBuffer: function(fileName){
           return $cordovaFile.readAsArrayBuffer(cordova.file.dataDirectory, fileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        moveDir: function(dirName, newDirName){
            return $cordovaFile.moveDir(cordova.file.dataDirectory, dirName, cordova.file.tempDirectory, newDirName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        moveFile: function(fileName, newDirName){
           return $cordovaFile.moveFile(cordova.file.dataDirectory, fileName, cordova.file.tempDirectory, newDirName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        copyDir: function(dirName, newDirName){
           return $cordovaFile.copyDir(cordova.file.dataDirectory, dirName, cordova.file.tempDirectory, newDirName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        },

        copyFile: function(fileName, newFileName){
           return $cordovaFile.copyFile(cordova.file.dataDirectory, fileName, cordova.file.tempDirectory, newFileName)
            .then(function (success) {
                return success;
            }, function (error) {
                return error;
            });
        }
        
        
    }

});





