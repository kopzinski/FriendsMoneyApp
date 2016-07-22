angular.module('starter.Storage',[])
.service('localStorage', function() {
  
  var local_var = "friendsMoney"

  this.localVar = function(str){
    local_var = str
  },

  this.set = function(key, value){            
    window.localStorage[local_var + key] = value;
  },
  
  this.get = function(key, defaultValue){
    return window.localStorage[local_var + key] || defaultValue;
  },

  this.setObject = function(key, value){
    window.localStorage[local_var + key] = JSON.stringify(value);
  },

  this.getObject = function(key){
    return JSON.parse(window.localStorage[local_var + key] || '{}');
  }
  
});