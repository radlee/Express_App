
/***
 * A very basic CRUD example using MySQL
 */

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from Sales', [], function(err, results) {
        if (err) return next(err);
		res.render( 'sales', {
				no_products : results.length === 0,
				sales : results,
		});
      });
	});
};

exports.showAdd = function(req, res){
	res.render('add_sales');
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
		res.redirect('/sales');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('edit_sales',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

  var data = req.body;
  var id = req.params.id;
  req.getConnection(function(err, connection){
			connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/sales');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};
