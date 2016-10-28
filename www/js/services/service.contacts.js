angular.module('starter.service', [])
.factory('GroupLocalService',function(){
    var group = {};
    return {
        getGroup:function(){
            return group;
        },
        setGroup:function(groupParameter){
            group = groupParameter;
        }
    }
})

.factory('ContactsService', function($http, ApiEndpoint){
    return {
        //ok
        setContact: function(contacts){
        console.log("service ", contacts);
        var data = {
            contacts : contacts
        }

        var url = ApiEndpoint.url +"/contacts";


        return $http.post(url, data).then(function(response){
            var responses = response.data;
            return responses;
        })
        },
        //ok
        registerTransactionWithNoFlag: function(transaction){
 
            var data = {
                transaction : transaction
            }
            var url = ApiEndpoint.url + "/userFromTransaction";
            return $http.post(url, data).then(function(response){
                return response;
            })
        },
        //ok
        registerTransactionWithFlag:function(transaction){
            var data = transaction;
            var url = ApiEndpoint.url + "/transaction";
           
            return $http.post(url, data).then(function(response){
                var response = response.data;
                return response;
            })
            }
    }
})

.factory('pendencieService', function($http, ApiEndpoint){
    return {
        //ok
        getPendings: function(phone){
            return $http.get(ApiEndpoint.url + "/pending/" +phone).then(function(response){

                return response.data;
            })
        },
        //ok
        changeStatusTransaction: function(transaction){
        
            var url = ApiEndpoint.url + "/transaction";
            var req = {
                method: 'PUT',
                url: url,				   
                data: transaction
            }

            return $http(req).then(function(response){
                var responses = response.data;
                return responses;
            })
        },
        //ok
        acceptGroup: function(phone, id_group){
            var url = ApiEndpoint.url + "/group/accept"
            var req = {
                method: 'PUT',
                url: url,
                data:{
                    userPhone: phone,
                    id_group: id_group
                }
            }
            return $http(req).then(function(response){
                return  response.data;
            })
        },
        //ok
        denyGroup: function(phone, id_group){
            var url = ApiEndpoint.url + "/group/deny"
            var req = {
                method: 'PUT',
                url: url,
                data:{
                    userPhone: phone,
                    id_group: id_group
                }
            }
            return $http(req).then(function(response){
                return  response.data;
            })
        },

        denyGroupDeleteTransaction: function(idGroup, idTransaction){
            var url = "http://10.96.127.185:3000/api/group/denyDeleteT"
            var req = {
                method: 'PUT',
                url: url,
                data:{
                    idGroup: idGroup,
                    idTransaction: idTransaction
                }
            }
            return $http(req).then(function(response){
                return  response.data;
            })
        }
    }
})

.factory('registerService', function($http, ApiEndpoint){
    return {
        setUser: function(user, device){
        var data = {
            user:{
                name: user.name,
                phone:{value: "+55"+user.phone.value},
                deviceId: device
            } 
        }
         var url = ApiEndpoint.url + "/user";
        return $http.post(url, data).then(function(response){
            return response;
        })
        }
    }
})

.factory('groupsService', function($http, ApiEndpoint){    
    return {
        getListGroups: function(phone){

            return $http.get(ApiEndpoint.url + '/groups/'+phone).then(function(response){
                return response.data;
            })
        },
        getListTransactionsGroup : function(idGroup){

            return $http.get(ApiEndpoint.url + '/group/'+idGroup+'/transactions').then(function(response){
                return response.data;
            })
        },
        registerGroupTransaction:function(user, idGroup, transaction){
            var data = {
                idGroup: idGroup,
                transaction: {
                    creditor: user,
                    description:transaction.description,
                    valuePaid:transaction.valuePaid
                }
            }

            var url = ApiEndpoint.url+ "/group/transaction";
            return $http.post(url, data).then(function(response){
                return response;
            })
        },
        createGroup: function(group){
            var url = ApiEndpoint.url + "/group";
            return $http.post(url, group).then(function(response){
                return response;
            })
        },

        acceptDeleteGroup: function(id, phone){
            return $http.delete(ApiEndpoint.url + '/group/'+id + "/" + phone ).then(function(response){
                return response.data;
            })

        },

        denyDeleteGroup: function(id){
    
            return $http.delete(ApiEndpoint.url + '/groupDeny/'+id).then(function(response){
                console.log(response);
                return response.data;
            })

        },

        deleteTransactionGroup: function(id, idTransaction, phoneCreator){
            return $http.delete(ApiEndpoint.url + '/group/deleteT/'+id + "/" + idTransaction + "/" + phoneCreator).then(function(response){
                return response.data;
            })

        },
       
        getListMembersByGroup : function(idGroup, phone){

            return $http.get(ApiEndpoint.url + '/group/'+idGroup+'/user/'+phone).then(function(response){
                return response.data;
            })
        }



    }
})

.factory('timelineService', function($http, ApiEndpoint){
    return {
        getAllTransactions:function(phone){            
            var url = ApiEndpoint.url + "/transactions/" + phone ;
            return $http.get(url).then(function(response){
                return response.data;       
            })
        }
    }
})





