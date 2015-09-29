

module.exports = {


  attributes: {

    

    // The user's full name
    // e.g. Nikola Tesla
    name: {
      type: 'string',
 
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
 
      unique: true
    },

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string',
  
    },

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
     
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
            
        },
   tokens:{
     type: 'string'
   },   
    refresh_token:{
     type: 'string'
   },
    username:{
     type: 'string'
   },
    displayName :{
     type: 'string'
   },
    capabilities :{
     type: 'string'
   }
  }
};
