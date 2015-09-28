

module.exports = {


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

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string',
      required: true
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
      required: true,
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
     
   },   
    refresh_token:{
     
   },
    username:{
     
   },
    displayName :{
     
   },
    capabilities :{
     
   }
  },
  validate: function (result, next) {
         console.log(result);
         if (!result) {
             return next('invalid user');
         } else if (!result.accessToken) {
             return next('invalid credentials');
         } else {
           console.log('vai');
            User.find()
  .where({ username:  result.userProfile.username   })
  .limit(1)
  .exec(function(err, user) {
    if(!user)
      {
        console.log('Criar');
          User.create({
              name: result.userProfile.displayname,
              username: result.userProfile.username,
              email: result.userProfile.username,
              lastLoggedIn: new Date(),
              gravatarUrl: ''
            }, function userCreated(err, newUser) {
           
              return next(null, newUser);
            });
      }
    else
      return next(null, user);
  });
  //          var user;
  //            user.displayname = result.userProfile.displayname;
  //            user.username = result.userProfile.username;
  //            
  //            user.accessToken = result.accessToken;
  //            user.refresh_token = result.refreshToken;
 // 
  //            result.tokenParams.refresh_token = result.refreshToken;
  //            user.setToken(result.tokenParams);
  //            console.log(user);
             return next(null, null);
         }
     }
};
