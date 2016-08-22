
/***
 * A very basic CRUD example using MySQL
 */

 // SELECT Products.Product, Categories.Category from Products inner join Categories on Products.CategoryID = Categories.id


exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT Products.id, Products.Product, Categories.Category from Products inner join Categories on Products.CategoryID = Categories.id', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'products', {
					no_products : results.length === 0,
					products : results,
    		});
      	});
	});
};

exports.showAdd = function(req, res){
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from Categories' , [], function(err, categories) {
        	if (err) return next(err);
    		res.render( 'add', {
					categories : categories,
    		});
      	});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var data = {
			CategoryID : Number(req.body.CategoryID),
      		Product : req.body.Product
			// Price : Number(req.body.Price)
  		};

		connection.query('insert into Products set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/products');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Categories', [id], function(err, categories){
			if(err) return next(err);
			connection.query('SELECT * FROM Products WHERE id = ?', [id], function(err,products){
				if(err) return next(err);
				var product = products[0];
				categories = categories.map(function(category){
					category.selected = category.id === product.CategoryID ? "selected" : "";
					return category;
				});
				res.render('edit', {
					categories : categories,
					data : product
				});
			});
		});
	});
};

exports.update = function(req, res, next){

	var data = {
		// CategoryID : Number(req.body.CategoryID),
		Product : req.body.Product,
		// Price : Number(req.body.Price)
	};
  	var id = req.params.id;
  	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE Products SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err) return next(err);
      		res.redirect('/products');
		});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};
