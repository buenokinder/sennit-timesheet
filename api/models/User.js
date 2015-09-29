/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'drop',
  attributes: {

    

    // The user's full name
    // e.g. Nikola Tesla
    name: {
      type: 'string',
      required: true
    },

    // The user's title at their job (or something)
    // e.g. Genius
    title: {
      type: 'string'
    },

    // The user's email address
    // e.g. nikola@tesla.com
    email: {
      type: 'string',
      required: true,
      unique: true
    },

   

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },
      // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    gravatarUrl: {
      type: 'string'
    },
   typehelpdesks:{
          
          collection: 'typehelpdesk',
            via: 'users'
            
        }
  }
};
