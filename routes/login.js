exports.checkUser = function(req, res, next){
  if (req.session.user){
      // calling the next function - just proceeds to the route.
      return next();
  }
  // the user is not logged in redirect them to the login page
  res.redirect('/login');
};


app.get('/users', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('/users', userData)
});
