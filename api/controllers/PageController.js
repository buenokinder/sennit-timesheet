/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomePage: function (req, res) {
    
    // If not logged in, show the public view.
    if (!req.session.passport) {
      return res.view('homepage');
    }
    console.log(req.session);
   var user= req.session.passport.user.userProfile;
   console.log(user);
 return res.view('dashboard', {
        me: {
          id: user.uid,
          name: user.displayname,
          email: user.username,
          title: user.displaeyname,
          isAdmin: true,
          gravatarUrl: ''
        }
      });
      
    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
   
  },

};
