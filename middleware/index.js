function loggedOut(req, res, next){
  if(req.session && req.session.user){
    return res.redirect('/home');
  }
  return next();
}
function requiresLogin(req, res, next){
  if(req.session && req.session.user){
    return next();
  }
  else {
    req.flash("warning", "You must be logged in to view this page.");
    return res.redirect("/login");
  }
}
//If visitor is not Admin warn them
function requiresLoginAsAdmin(req, res, next){
  if(req.session.user.is_admin){
    return next();
  }
  else {
    req.flash("warning", "You must be logged in as admin to view this page.");
    return res.redirect("/");
  }
}
//If there current user is loggedin or registered
function registered(req, res, next){
  if(req.session){
    return next();
  }
  else {
    req.flash("warning", "You must be Registered.");
    return res.redirect("/");
  }
}
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.requiresLoginAsAdmin = requiresLoginAsAdmin;
module.exports.registered = registered;
