module.exports = function (req, res, ok) {
 console.log('ok autenticado');
  // User is allowed, proceed to controller
  var is_auth = req.isAuthenticated()
  if (is_auth) return next();
  // User is not allowed
  else return res.redirect("/login");
};