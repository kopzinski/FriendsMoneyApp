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
        },

        registerTransactionWithNoFlag: function(user, transaction){
 
            var data = {
                transaction : transaction,
                user : user
            }
            var url = "http://10.96.127.185:3000/api/userTransaction";
 
            return $http.post(url, data).then(function(response){
                var responses = response.data;
                return responses;
            })
        },

        registerTransactionWithFlag:function(transaction){
            var data = transaction;
            var url = "http://10.96.127.185:3000/api/transaction";
           
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
        
        var newUser = {
            name: user.name,
            phone: user.phone,
            deviceId: device
        }

         var url = "http://10.96.127.185:3000/api/user";
        return $http.post(url, newUser).then(function(response){
            console.log('aqui', response);
            return response;
        })
        }
    }
})



