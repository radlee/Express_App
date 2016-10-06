
/***
 * A very basic CRUD example using MySQL
 */

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query("select DATE_FORMAT(Sales.Date,'%d %b %y') as Date, Sales.id, Sales.Quantity, Sales.Price, Products.Product from Sales inner join Products on Sales.ProductID = Products.id ORDER BY Sales.Date DESC", [], function(err, results) {
        if (err) return next(err);
		res.render( 'sales', {
				no_sales : results.length === 0,
				sales : results,
				user: req.session.user,
			  is_admin: req.session.user.is_admin
		});
      });
	});
};

exports.showAdd = function(req, res){
	res.render('add_sales', {user: req.session.user,
	is_admin: req.session.user.is_admin});
}
//
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body;
		var data = {
			// id : input.id,
			Date : input.Date,
			Quantity : input.Quantity,
			Price : input.Price,
			ProductID : input.ProductID
		};

	connection.query('insert into Sales set ?', data, function(err, results) {
			if (err) return next(err);
			req.flash("warning", 'Sale Added');
		res.redirect('/sales');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('edit_sales',{page_title:"Edit Customers - Node.js", data : rows[0], user: req.session.user,
			is_admin: req.session.user.is_admin});
		});
	});
};

exports.update = function(req, res, next){

  var data = req.body;
  var id = req.params.id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE Sales SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/sales');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};
