exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT Products.Product_ID, Products.Product, Categories.Category from Products inner join Categories on Products.CategoryID = Categories.id', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'products', {
					no_products : results.length === 0,
					products : results,
					user: req.session.user,
				  is_admin: req.session.user.is_admin
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
					categories : categories, user: req.session.user,
					is_admin: req.session.user.is_admin
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
  		};
		connection.query('insert into Products set ?', data, function(err, results) {
  			if (err) return next(err);
				res.redirect('/products');
		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.Product_ID;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Categories', [], function(err, categories){
			if(err) return next(err);
			connection.query('SELECT * FROM Products WHERE Product_ID = ?', [id], function(err,products){
				if(err) return next(err);
				var product = products[0];
				categories = categories.map(function(category){
					category.selected = category.id === product.CategoryID ? "selected" : "";
					return category;
				});
				res.render('edit', {
					categories : categories,
					data : product, user: req.session.user,
					is_admin: req.session.user.is_admin
				});
			});
		});
	});
};

exports.update = function(req, res, next){
	var data = {
		CategoryID : Number(req.body.CategoryID),
		Product : req.body.Product,
	};
	var id = req.params.Product_ID;
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE Products SET ? WHERE Product_ID = ?', [data, id], function(err, rows){
			if (err) return next(err);
			res.redirect('/products');
		});
	});
};
exports.search = function(req, res, next) {
	req.getConnection(function(err, connection) {
		if (err) return next(err);
		var value = '%' + req.body.value + '%';
		console.log(value);
		// select products.id, products.description as product_name, categories.description as category_name from products inner join categories on products.category_id = categories.id where products.description  like ? or categories.description like ?'
		connection.query('SELECT Products.Product_ID, Products.Product, Categories.Category from Products inner join Categories on Products.CategoryID = Categories.id where Products.Product ? or Categories.Category like ?',value, function(err, results) {
			console.log(results);
			if (err) return next(err);
			res.render('productUpdate', {
				products: results,
				layout: false
			});
		});
	});
};
exports.delete = function(req, res, next){
	var ids = [];
	var id = req.params.id;
	ids.push(id);
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Products WHERE id = ?', [ids], function(err,rows){
			if(err) return next(err);
			res.redirect('/products');
		});
	});
};
