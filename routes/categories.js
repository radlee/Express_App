exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from Categories', [], function(err, results) {
        if (err) return next(err);
		res.render( 'categories', {
				no_categories : results.length === 0,
				categories : results,
			  user: req.session.user,
			  is_admin: req.session.user.is_admin
		});
      });
	});
};

exports.showAdd = function(req, res){
	res.render('add_category', {user: req.session.user,
	is_admin: req.session.user.is_admin});
}
//
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body;
		console.log(input);
		var data = {
      		Category : input.Category,
					// id : input.id
  	};

	connection.query('insert into Categories set ?', data, function(err, results) {
			if (err) return next(err);
		res.redirect('/categories');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Categories WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('edit_category',{page_title:"Edit Customers - Node.js", data : rows[0], user: req.session.user,
			is_admin: req.session.user.is_admin});
		});
	});
};

exports.update = function(req, res, next){

  var data = req.body;
  var id = req.params.id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE Categories SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/categories');
    		});

    });
};

// exports.delete = function(req, res, next){
// 	var id = req.params.id;
// 	console.log(id);
// 	req.getConnection(function(err, connection){
// 		connection.query('DELETE FROM Categories WHERE id = ?', [id], function(err,rows){
// 			if(err) return next(err);
// 			res.redirect('/categories');
// 		});
// 	});
// };


exports.check = function(req, res){
  // var checkbox = req.body.checkbox;
  var checkbox = req.params.id;
	console.log(checkbox);
  var array =[];
  req.getConnection(function(err, connection){
    if(checkbox.checked){
      array.push(checkbox.value);
      connection.query("DELETE FROM Categories WHERE id = ?", [array],function(err, rows){
        if (err) return next(err);
        res.redirect('/categories');
      });
    };
  });
};
