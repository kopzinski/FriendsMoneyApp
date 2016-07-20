angular.module('starter.service', [])

.factory('setContacts', function($http) {
    
    return {
        setContact : function(contacts){        
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
        

        $http(req).then(function sucessCallback(response){	
            console.log(response);	
            return response;
        }, function errorCallback(response){

            console.log(response);
            return response;
        });		
            console.log(data);
        }   
    }      
})






