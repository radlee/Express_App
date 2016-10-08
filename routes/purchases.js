
/***
 * A very basic CRUD example using MySQL
 */

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		// SELECT DATE_FORMAT(purchases.Date,'%d %b %y') as Date,purchases.id, products.product, purchases.stockItem, purchases.quantity, purchases.cost ,purchases.shop FROM purchases, products WHERE purchases.product_id = products.id ORDER BY `purchases`.`Date` ASC
		connection.query("select DATE_FORMAT(Purchases.Date,'%d %b %y') as Date, Purchases.id, Purchases.Shop, Purchases.Quantity, Purchases.CostPerItem, Products.Product from Purchases inner join Products on Purchases.ProductID = Products.id ORDER BY Purchases.Date DESC", [], function(err, results) {
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
	res.render('add_purchases', {user: req.session.user,
		is_admin: req.session.user.is_admin,
		purchasesData : purchasesData
	});
}

exports.showAdd = function(req, res){
	showAddScreen(req, res, {});
}
//
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
			ProductID : input.ProductID
		};

	connection.query('insert into Purchases set ?', data, function(err, results) {
			if (err) return next(err);
			req.flash("warning", 'Purchase Added.');
		res.redirect('/purchases');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Purchases WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			// Possible Problem ----------
			res.render('edit_purchases',
			{page_title:"Edit Customers - Node.js", data : rows[0], user: req.session.user,
			is_admin: req.session.user.is_admin});

		});
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
  var id = req.params.id;

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
			connection.query('UPDATE Purchases SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err) next(err);
          		res.redirect('/purchases');
    		});

    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Purchases WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.redirect('/purchases');
		});
	});
};
