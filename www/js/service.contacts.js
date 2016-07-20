angular.module('starter.service', [])

.factory('ContactsService', function($http){
    return {
        setContact: function(contacts){
            var jsonContact = contacts;
        var data = {
            contacts : jsonContact
        }
         var url = "http://10.96.127.155:3000/api/contacts";
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





