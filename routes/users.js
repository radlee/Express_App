exports.show = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query('SELECT * from Users', [], function(err, results) {
      if (err) return next(err);
      res.render('users', {
        showNavBar : req.session.user.showNavBar,
        is_admin: req.session.user.is_admin,
        no_users: results.length === 0,
        users: results
      });
    });
  });
};

exports.showAdd = function(req, res) {
  res.render('add_user', {
    showNavBar : req.session.user.showNavBar,
    is_admin: req.session.user.is_admin
  })
}

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);

      var data = {
        username: req.body.Username,
        password: req.body.Password ,
        email: req.body.Email,
        is_admin: req.body.is_admin
      };
      connection.query('insert into Users set ?', data, function(err, results) {
        if (err) return next(err);
        res.redirect('/users');
      });
  });
};

exports.get = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM Users WHERE user_id = ?', [id], function(err, result) {
      if (err) return next(err);
      res.render('edit_user', {
        showNavBar : req.session.user.showNavBar,
        is_admin: req.session.user.is_admin,
        data: result[0]
      });
    });
  });
};

exports.update = function(req, res, next) {

  var data = {
    username: req.body.Username,
    password: req.body.Password,
    email: req.body.Email,
    is_admin: req.body.is_admin
  };
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('UPDATE Users SET ? WHERE user_id = ?', [data, id], function(err, rows) {
      if (err) next(err);
      res.redirect('/users');
    });
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.user_id;
  req.getConnection(function(err, connection) {
    connection.query('DELETE FROM Users WHERE user_id = ?', [id], function(err, rows) {
      if (err) return next(err);
      res.redirect('/users');
    });
  });
};
