
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
          console.log('Logado');
          
            req.session.me = user.username;
            res.redirect('/#/dashboard');
            return res.ok();
            
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
