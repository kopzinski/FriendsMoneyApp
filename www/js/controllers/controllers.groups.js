angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($location,$rootScope,$ionicHistory, $state, GroupLocalService, groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {
  $scope.groupCreate = {};

     $ionicModal.fromTemplateUrl('templates/groups/groupsCreate.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })
      $scope.cancelCreateGroup = function(){
        $state.go("groups");
      }
      $scope.startGroup = function(members){
        members = members.map(function(user){
          delete user['selected'];
          return user;
        });
        
        

        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        members.push({name: user.data.name, phone:{value: phone}});          
        var newGroup = {
            title: $scope.groupCreate.title,
            description: $scope.groupCreate.description,
            mode: $scope.groupCreate.choice,
            creator:{phone:{value: phone}, name: user.data.name},
            members: members
        }
        
      
        groupsService.createGroup(newGroup).then(function(response){
            console.log(response);
            $scope.listGroups();
            $state.go("groups");
            $scope.users = $scope.users.map(function(user){
              delete user['selected'];
              return user;
            });          
            
          })
      }
      $scope.contactsOnLoad = function(){

        if($cordovaNetwork.isOnline() == true){

          function onSuccess(contacts) {
            if(ionic.Platform.isIOS() == true){
              var array = [];
              for(var i = 0; i < contacts.length; i++){
                var contact = {
                  "id": contacts[i].id,
                  "rawId": contacts[i].rawId,
                  "displayName": contacts[i].name.givenName,
                  "name": [{ "formatted": contacts[i].name.formatted , "givenName":  contacts[i].name.givenName}],
                  "nickname": null,
                  "phoneNumbers": [{ "type": contacts[i].phoneNumbers[0].type, "value": contacts[i].phoneNumbers[0].value, "id": contacts[i].phoneNumbers[0].id, "pref": contacts[i].phoneNumbers[0].pref }] ,
                  "emails": null,
                  "addresses": null,
                  "ims": null,
                  "organizations": null,
                  "birthday": null,
                  "note": null,
                  "photos": null,
                  "categories": null,
                  "urls": null
                };
                array.push(contact);
              }
              ContactsService.setContact(array).then(function(responses){
                var contacts = responses;
                $scope.users = contacts;
              });
              $scope.$broadcast('scroll.refreshComplete');
            }else{
              ContactsService.setContact(contacts).then(function(responses){
                $scope.users = responses;
              });
            }

            $scope.$broadcast('scroll.refreshComplete');
          }

          function onError(contactError) {
            alert(contactError);
          }
          var options = {};
          options.filter = "";
          if(ionic.Platform.isAndroid()){
                options.hasPhoneNumber = true;
          }
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);
        }else{

          $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão');

        }
      }

      // $scope.addFriend = function(members, registerForm){
      //   console.log(members);

      //   var user =  localStorage.getObject("user");
      //   var phone = user.data.phone.value;

      //   if(registerForm.title){
      //     members.push({name: user.data.name, phone:{value: phone}});

      //     var user={
      //       phone: phone,
      //       name: user.data.name
      //     }

      //     groupsService.createGroup(members, registerForm.title, user).then(function(response){
      //       console.log(response);
      //       $scope.listGroups();
      //       $scope.modal.hide();
      //     })
      //   }else{
      //     $cordovaToast.showLongCenter('É preciso ter um titulo para o grupo.');
      //   }

      // }

      // $scope.openGroupsModal = function(){
      //   $scope.modal.show();
      // }

      $scope.listGroups = function(){
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        if(phone){
          groupsService.getListGroups(phone).then(function(response){
            console.log(response);
            $scope.groups = response;
          })
        }else{
          $cordovaToast.showLongCenter('Não há grupos');
        }
      }
    $scope.openCreateGroupWizard = function(){
        $state.go("createGroupWizard");
    }

    $scope.doRefresh = function(){
      var user =  localStorage.getObject("user");
       var phone = user.data.phone.value;
      groupsService.getListGroups(phone).then(function(response){
      console.log(response);
      $scope.groups = response;
      $scope.$broadcast('scroll.refreshComplete');
      $cordovaToast.showShortBottom('Atualizado');
      })
    }



      $scope.groupDetail = function(group){
        GroupLocalService.setGroup(group);
        $state.go('tabs.transactions');
      }



$scope.expandText = function(){
      var element = document.getElementById("descriptionId");
      element.style.height =  element.scrollHeight + "px";
    }
  $scope.getConditionGroupStepOne = function(){
    console.log($scope.groupCreate);
    if (!$scope.groupCreate.description|| !$scope.groupCreate.title || !$scope.groupCreate.choice ){
      return false;
    }else if($scope.groupCreate.description.length && $scope.groupCreate.title.length && $scope.groupCreate.choice != null ){
      console.log($scope.groupCreate)
      return true;
    }

  }
})


.controller('GroupTransactionsCtrl', function($ionicPopup, $rootScope, $state, GroupLocalService , $ionicModal, groupsService, localStorage, $scope, $cordovaNetwork, $cordovaToast) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      $scope.group = GroupLocalService.getGroup();
      console.log($scope.group);
  });

    $rootScope.$ionicGoBack = function() {
           $state.go('groups');
        };

    $scope.onDrag = function(){
        $scope.modal.hide();
    }
    $scope.$on("$ionicView.enter", function(event, data){

    $scope.getListTransactionsGroup();
    })

    $scope.getListTransactionsGroup = function(){
       groupsService.getListTransactionsGroup($scope.group._id).then(function(response){
       $scope.transactions = response;
      })
    }

    $scope.doRefresh = function(){
      groupsService.getListTransactionsGroup($scope.group._id).then(function(response){
      $scope.transactions = response;
      $scope.$broadcast('scroll.refreshComplete');
      $cordovaToast.showShortBottom('Atualizado');
      })
    }

    $scope.registerTransaction = function(idGroup, transaction){
      var user =  localStorage.getObject("user");

      var newUser = {
        phone: user.data.phone,
        name: user.data.name
      }
      if(transaction.valuePaid && transaction.description){
        groupsService.registerGroupTransaction(newUser, idGroup, transaction).then(function(response){
          console.log(response);
          $scope.getListTransactionsGroup();
          $scope.modal.hide();
          $scope.transaction.valuePaid = null;
          $scope.transaction.description = null;
        })
      }else{
        $cordovaToast.showShortBottom('Digite um valor e uma descrição');
      }
    }

    $scope.openTransactionModal = function(){
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/groups/tabs/group.transaction.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })

    $scope.deleteGroup = function(){
          var group = GroupLocalService.getGroup();
          if(group.finalizedAt){
            $cordovaToast.showShortBottom('Grupo já finalizado, impossível realizar ação');
          }else{
            var confirmPopup = $ionicPopup.confirm({
              title: 'Encerramento do grupo',
              template: 'Você realmente quer solicitar o encerramento do grupo?',
              buttons:[{text: 'Cancelar', type:'deny-button'}, {text: 'Confirmar', type:'accept-button',
                onTap: function(e){
                  if(e){

                    var user =  localStorage.getObject("user");
                    var phone = user.data.phone.value;

                    groupsService.acceptDeleteGroup(group._id, phone).then(function (response) {
                      $cordovaToast.showShortBottom('Solicitação enviada para os demais participantes');
                      console.log(response);
                    })
                  }else{
                    console.log('You clicked on "Cancel" button');
                  }
                }
              }]
            });
          }

        /*var group = GroupLocalService.getGroup();
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        groupsService.deleteGroup(group._id, phone).then(function (response) {
          console.log(response);
        })   */
    }

    $scope.expandText = function(){
      var element = document.getElementById("descriptionId");
      element.style.height =  element.scrollHeight + "px";
    }

    $ionicModal.fromTemplateUrl('templates/groups/tabs/group.transactionPayment.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modalPayment = modal;
      })

    $scope.transactionPayment = function(transaction){
      var group = GroupLocalService.getGroup();
      if(group.finalizedAt){
        $cordovaToast.showShortBottom('Grupo já finalizado, impossível realizar ação');
      }else{
        var user =  localStorage.getObject("user");
        $scope.transPayment = transaction;
        $scope.phoneMaster = user.data.phone.value;
        $scope.modalPayment.show();
      }
    }

    $scope.transactionPaymentDelete = function(tra){
        var group = GroupLocalService.getGroup();
        console.log(group._id);
        console.log(tra._id);
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        groupsService.deleteTransactionGroup(group._id, tra._id, phone).then(function (response) {
          if(response){
            $scope.modalPayment.hide();
          }
          console.log(JSON.stringify(response));
        })
    }
})

.controller('GroupMembersCtrl', function($state, $rootScope, GroupLocalService , $ionicModal, groupsService, localStorage, $scope, $cordovaNetwork, $cordovaToast) {
    $scope.doRefresh = function(){
      $rootScope.$ionicGoBack = function() {
           $state.go('groups');
        };
      $scope.group =  GroupLocalService.getGroup();
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      groupsService.getListMembersByGroup($scope.group._id, phone).then(function(response){
        $scope.members = response;
        $scope.$broadcast('scroll.refreshComplete');
        $cordovaToast.showShortBottom('Atualizado');
      });
    }



    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      $scope.group =  GroupLocalService.getGroup();
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      groupsService.getListMembersByGroup($scope.group._id, phone).then(function(response){
        $scope.members = response;
        console.log(response);
      });
    });
})
