
// *********************************************************
//
// O365-Node-Express-Ejs-Sample-App, https://github.com/OfficeDev/O365-Node-Express-Ejs-Sample-App
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// *********************************************************




var url = require('url');
var appSettings = require('../models/appSettings.js');

var passport = require('passport');  


module.exports = {

 login: passport.authenticate('azureoauth', { failureRedirect: '/' }),

 azurecallback: function(req, res){
 passport.authenticate('azureoauth', function(err, user, info) {
     
      if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
          console.log('Logado 123');
          
            req.session.me = user.userProfile.username;
            console.log(user.userProfile.username);
             User.findOne({
      email: user.userProfile.username
    }).exec(function userCreated(err, newuser) {
        console.log(newuser);
                if(!newuser){
                    User.create({
               name: user.userProfile.displayname,
               title: user.userProfile.displayname,
               email: user.userProfile.username,
               lastLoggedIn: new Date()
             }, function userCreated(err, newUser) {
               if (err) {
 
                 console.log("err: ", err);
                 console.log("err.invalidAttributes: ", err.invalidAttributes)

                 if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                   && err.invalidAttributes.email[0].rule === 'unique') {
                   return res.emailAddressInUse();
                 }
 
                 // Otherwise, send back something reasonable as our error response.
                 return res.negotiate(err);
               }
 
                    res.redirect('/#/dashboard');
            return res.ok();
               // Log user in
               req.session.me.id = newUser.id;
             })
                    
                }else{
                    req.session.me.id = newuser.id;
                    res.redirect('/#/dashboard');
            return res.ok();
                }
              if (err) 
               return res.json({
                err: "Erro ao Gravar!"
              });
    });


//         // If the password from the form params doesn't checkout w/ the encrypted
//         // password from the database...
//         incorrect: function (){
//           
//         },
// 
//         success: function (){
//             console.log();
//           // Store user id in the user session
//           req.session.me = user.id;
// 
//           // All done- let the client know that everything worked.
//           return res.ok();
//         }
//       });
            
            
            //res.redirect('/#/dashboard');
            //return res.ok();
            
      });
    })(req, res);
//     
//   passport.authenticate('azureoauth', { failureRedirect: '/' }),
//         function (req, res) {
//             
//             console.log('Foi 123!!!')
//             console.dir(passport.user.tokens);
//             
//               // Store user id in the user session
//           
//          
//     }
 
 },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};
