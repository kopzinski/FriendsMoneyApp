angular.module('starter.service', [])

.factory('ContactsService', function($http){
    return {
        setContact: function(contacts){
            var jsonContact = contacts;
        var data = {
            contacts : jsonContact
        }
         var url = "http://10.96.127.185:3000/api/contacts";
         var req = {
           method: 'POST',
           url: url,				   
           data: data
        }
        return $http.post(url, data).then(function(response){
            var responses = response.data;
            return responses;
        })
        }
    }
})

.factory('registerService', function($http){
    return {
        setUser: function(user, device){
        var jsonContact = user;
        var data = {
            name : user.name,
            phone: user.number,
            deviceId: device 
        }

         var url = "http://10.96.127.185:3000/api/user";
         var req = {
           method: 'POST',
           url: url,				   
           data: data
        }
        return $http.post(url, data).then(function(response){
            console.log('aqui', response);
            return response;
        })
        }
    }
})





