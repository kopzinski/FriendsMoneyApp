angular.module('starter.service', [])

.factory('ContactsService', function($http){
    return {
        setContact: function(contacts){

        var data = {
            contacts : contacts
        }
         var url = "http://10.96.127.155:3000/api/contacts";


        return $http.post(url, data).then(function(response){
            var responses = response.data;
            return responses;
        })
        },
/*
    $scope.getData = function() {
        $http.get("http://localhost/example.json", { params: { "key1": "value1", "key2": "value2" } })
            .success(function(data) {
                $scope.firstname = data.firstname;
                $scope.lastname = data.lastname;
            })
            .error(function(data) {
                alert("ERROR");
            });
    }
 
});*/

        registerTransactionWithNoFlag: function(user, transaction){
 
            var data = {
                transaction : transaction
            }
            var url = "http://10.96.127.155:3000/api/userOrTransaction";
 
            return $http.post(url, data).then(function(response){
                var responses = response.data;
                return responses;
            })
        },

        registerTransactionWithFlag:function(transaction){
            var data = transaction;
            var url = "http://10.96.127.155:3000/api/transaction";
           
            return $http.post(url, data).then(function(response){

       
            })
            }
    }
})

.factory('PendeciesService', function($http){
    return {
        getListContacts: function(phone){
            return $http.get('http://10.96.127.155:3000/api/pendenciesTransactions/'+phone).then(function(response){
                return response.data;
            })
        },
        changeStatusPendencie: function(transaction){

            var url = "http://10.96.127.155:3000/api/transaction";
            var req = {
                method: 'PUT',
                url: url,				   
                data: transaction
            }

            return $http(req).then(function(response){
                var responses = response.data;
                return responses;
            })
        }
    }
})

.factory('registerService', function($http){
    return {
        setUser: function(user, device){
        
        var data = {
            user:{
                name: user.name,
                phone:{value: user.phone.value},
                deviceId: device
            } 
        }

         var url = "http://10.96.127.155:3000/api/userOrTransaction";
        return $http.post(url, data).then(function(response){
            return response;
        })
        }
    }
})

.factory('timelineService', function($http){
    return {

        getAllTransactions:function(phone){            
            var url = "http://10.96.127.155:3000/api/transactions/" + phone ;
           
            return $http.get(url).then(function(response){
                return response.data;       
            })
        }
    }
})





