angular.module('starter.phonecontacts', [])
.factory("PhoneContactsFactory", ['$q', function($q)
{
    return {
        find: function()
        {
            //Promessa
            var deferred = $q.defer();
            //opciones de contactos
            var options = new ContactFindOptions();
            //añadimos los filtros de búsqueda
            options.filter = "";
            options.multiple = true;
            options.hasPhoneNumber = true;
            var fields = ["displayName", "name", "phoneNumbers"];
            //acepta tres parámetros, los campos, la respuesta, el error y las opciones
           navigator.contacts.find(fields, 
				function(contacts){ deferred.resolve(contacts); }, //onsuccess
				function(error){ deferred.reject(error); }, // onerror
				options);
            return deferred.promise;
        }
    };
}])