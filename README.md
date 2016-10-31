# Friends Money Client #

FriendsMoney is an app with the objective of manage transactions between friends. With this application is possible create groups and record all your spendings. This Readme describe some characteristics about the Friendsmoney's client.

###Version: 1.0.0###

### What is this repository for? ###


* [Installation](#Installation)
* [Configuration](#Configuration)
* [Deployment Instructions](#Deployment Instructions)
* [Dependencies](#Dependencies)
* [Contribution guidelines](#Contribution guidelines)
* [Who do I talk to?](#Who do I talk to?)

###Installation 

To install the project follow this instructions:
```
$ git clone https://username@bitbucket.org/friendsmoney/client.git
$ cd client
$ npm install
$ bower install
$ npm install -g ionic cordova gulp
```

After this steps, the app is installed. To test if all dependencies were installed use:

```
$ionic serve
``` 

If the registration view appear it's work.

### Configuration ###

To run on a smartphone you should set up the API Endpoint on client code, with your property Server's URL. To do this, change the www/js/app.js file with your url:

```
constant('ApiEndpoint', {
  url: 'http://localhost:3000/api'
})
```

### Configuration ### 
To run your app you should add a platform for IOS or Android:

```
$ ionic platform add android
```

After this build and run:

``` 
$ionic build android
$ionic run android
```

### Dependencies ###

* Gulp - Tasks runner
* angular-filter - used in list views
* angular-messages - used to validations message
* angular-input-masks - contain some masks like phone mask
* ionic wizard - used to create group in some steps

### Contribution guidelines ###

* Writing tests
* Code review and refactor
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact