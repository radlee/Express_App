exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query("select DATE_FORMAT(Sales.Date,'%Y-%m-%d') as Date, Sales.Sales_ID, Sales.Quantity, Sales.Price, Products.Product from Sales inner join Products on Sales.Product_ID = Products.Product_ID ORDER BY Sales.Date DESC", [], function(err, results) {
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

const showAddScreen = function(req, res, salesData){
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM Products", [], function(err, products){
			res.render('add_sales', {
				user: req.session.user,
				is_admin: req.session.user.is_admin,
				salesData : salesData,
				products : products
			});
		});
	});
}
exports.showAdd = function(req, res){
			showAddScreen(req, res, {})
}

exports.add = function (req, res, next) {
	var moment = require('moment');
	moment().format();
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body;
		var error = false;
		const todayOrEarlier = moment(input.Date).isSameOrBefore(moment());
		if(!todayOrEarlier){
			req.flash("warning", 'Sale date can not be after today.');
			error = true;
		}
		if(error){
			return showAddScreen(req, res, input);
		}
		var data = {
			Date : input.Date,
			Quantity : input.Quantity,
			Price : input.Price,
			Product_ID : input.id
		};
	connection.query('insert into Sales set ?', [data], function(err, results) {
			if (err) return next(err);
			req.flash("warning", 'Sale Added.');
			res.redirect('/sales');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.Sales_ID;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products', [], function(err,products){
			if(err) return next(err);
			connection.query("SELECT Sales.Sales_ID, Sales.Product_ID,Sales.Quantity, Sales.Price, DATE_FORMAT(Sales.Date, '%Y-%m-%d') as Date from Sales WHERE Sales_ID = ?", [id], function(err, sales){
				if(err) return next(err);
				console.log(products);
				var sale = sales[0];
				products = products.map(function(product){
					product.selected = product.Product_ID === sale.Product_ID ? "selected" : "";
					return product;
				});
				res.render('edit_sales',{
					products : products,
					data : sale,
					user: req.session.user,
					is_admin : req.session.user.is_admin
				});
			})
		});
	});
};

const showEditScreen = function(req, res, data){
	var id = req.params.Sales_ID;
	req.getConnection(function(err, connection){
			connection.query("SELECT Sales.Sales_ID, Sales.Product_ID,Sales.Quantity, Sales.Price, DATE_FORMAT(Sales.Date, '%Y-%m-%d') as Date from Sales WHERE Sales_ID = ?", [id], function(err, sales){
				if(err) return next(err);
				var sale = sales[0];
				showEdit(req, res, sale);
			});
	});
};

const showEdit = function(req, res, sale){
	var id = req.params.Sales_ID;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products', [], function(err,products){
			if(err) return next(err);
				products = products.map(function(product){
					product.selected = product.Product_ID === Number(sale.Product_ID) ? "selected" : "";
					return product;
				});
				res.render('edit_sales', {
					user: req.session.user,
					is_admin: req.session.user.is_admin,
					products : products,
					data : sale
				});
		});
	});
}

const showError = function(req, res, data){
	var data = req.body;
	var id = req.params.Sales_ID;
	showEdit(req, res, data);
}

//Get the date from the user and update the edit page
exports.update = function(req, res, next){
	var moment = require('moment');
	moment().format();
  var data = req.body;
  var id = req.params.Sales_ID;
	var error = false;
	const todayOrEarlier = moment(data.Date).isSameOrBefore(moment());
	if(!todayOrEarlier){
		req.flash("warning", 'Sale date can not be after today.');
		error = true;
	}
	if(error){
		return showError(req, res, data);
	}
  req.getConnection(function(err, connection){
			connection.query('UPDATE Sales SET ? WHERE Sales_ID = ?', [data, id], function(err, data){
    			if (err) return next(err);
					req.flash("warning", 'Sale Updated.');
					res.redirect('/sales');
    		});
    });
};
exports.delete = function(req, res, next){
	var id = req.params.Sales_ID;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Sales WHERE Sales_ID = ?', [id], function(err, data){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};
