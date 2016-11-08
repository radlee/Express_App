exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query("select DATE_FORMAT(Purchases.Date,'%Y-%m-%d') as Date, Purchases.Purchases_ID, Purchases.Shop, Purchases.Quantity, Purchases.CostPerItem, Products.Product from Purchases inner join Products on Purchases.ProductID = Products.Product_ID ORDER BY Purchases.Date DESC", [], function(err, results) {
			if (err) return next(err);
			res.render( 'purchases', {
				no_products : results.length === 0,
				purchases : results,
				user: req.session.user,
				is_admin: req.session.user.is_admin
			});
		});
	});
};
const showAddScreen = function(req, res, purchasesData){
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM Products", [], function(err, products){
			res.render('add_purchases', {user: req.session.user,
				is_admin: req.session.user.is_admin,
				purchasesData : purchasesData,
				products : products
			});
		});
	});
}
exports.showAdd = function(req, res){
	showAddScreen(req, res, {});
}
exports.add = function (req, res, next) {
	var moment = require('moment');
	moment().format();
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body
		var error = false;
		const todayOrEarlier = moment(input.Date).isSameOrBefore(moment());
		if(!todayOrEarlier){
			req.flash("warning", 'Purchase date can not be after today.');
			error = true;
		}
		if(error){
			return showAddScreen(req, res, input);
		}
		var data = {
			Shop : input.Shop,
			Date : input.Date,
			Quantity : input.Quantity,
			CostPerItem: input.CostPerItem,
			ProductID : input.id
		};
		console.log(data);
	connection.query('insert into Purchases set ?', [data], function(err, results) {
			if (err) return next(err);
			req.flash("warning", 'Purchase Added.');
			res.redirect('/purchases');
		});
	});
};
exports.get = function(req, res, next){
	var id = req.params.Purchases_ID;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Products', [], function(err, products){
			if(err) return next(err);
			connection.query("SELECT Purchases.Purchases_ID, Purchases.Shop, Purchases.ProductID, Purchases.Quantity, Purchases.CostPerItem, DATE_FORMAT(Purchases.Date, '%Y-%m-%d') as Date from Purchases WHERE Purchases_ID = ?", [id], function(err, purchases){
				if(err) return next(err);
				var purchase = purchases[0];
				products = products.map(function(product){
					product.selected = product.Product_ID === purchase.ProductID ? "selected" : "";
					return product;
				});
				res.render('edit_purchases',{
					products : products,
					data : purchase,
					user: req.session.user,
				is_admin: req.session.user.is_admin});
			});
		})
	});
};
const showEditScreen = function(req, res, data){
	res.render('edit_purchases', {user: req.session.user,
		is_admin: req.session.user.is_admin,
		data : data
	});
}
exports.update = function(req, res, next){
	var moment = require('moment');
	moment().format();
  var data = req.body;
  var id = req.params.Purchases_ID;
	var error = false;
	const todayOrEarlier = moment(data.Date).isSameOrBefore(moment());
	if(!todayOrEarlier){
		req.flash("warning", 'Purchase date can not be after today.');
		error = true;
	}
	if(error){
		return showEditScreen(req, res, data, id);
	}
	req.getConnection(function(err, connection){
			connection.query('UPDATE Purchases SET ? WHERE Purchases_ID = ?', [data, id], function(err, data){
					if (err) return next(err);
					req.flash("warning", 'Purchase Updated.');
					res.redirect('/purchases');
				});
			});
		};
exports.delete = function(req, res, next){
	var id = req.params.Purchases_ID;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Purchases WHERE Purchases_ID = ?', [id], function(err,data){
			if(err) return next(err);
			res.redirect('/purchases');
		});
	});
};
