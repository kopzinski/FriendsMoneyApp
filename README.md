# Friends Money Client #

FriendsMoney is an app with the objective of manage transactions between friends. With this application is possible create groups and record all your spendings. This Readme describe some characteristics about the Friendsmoney's client.

### What is this repository for? ###

* Version
* [Installation][1]
* Configuration
* Dependencies
* Deployment Instructions
* Contribution guidelines
* Who do I talk to?

### Installation ###

To install the project follow this instructions:
```
$ git clone https://username@bitbucket.org/friendsmoney/client.git
$ cd client
$ npm install
$ bower install
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
### Contribution guidelines ###

* Writing tests
* Code review and refactor
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact