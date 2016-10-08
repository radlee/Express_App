
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

const showAddScreen = function(req, res, salesData){
	res.render('add_sales', {user: req.session.user,
		is_admin: req.session.user.is_admin,
		salesData : salesData
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
			ProductID : input.ProductID
		};

	connection.query('insert into Sales set ?', data, function(err, results) {
			if (err) return next(err);
			req.flash("warning", 'Sale Added.');
		res.redirect('/sales');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Sales WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			// Possible Problem -------------
			res.render('edit_sales',
			{
				data : rows[0], user: req.session.user,
				is_admin : req.session.user.is_admin
			});
	});
});

};


const showEditScreen = function(req, res, data){
	res.render('edit_sales', {user: req.session.user,
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
		req.flash("warning", 'Sale date can not be after today.');
		error = true;
	}
	if(error){
		return showEditScreen(req, res, data, id);
	}

  req.getConnection(function(err, connection){
			connection.query('UPDATE Sales SET ? WHERE id = ?', [data, id], function(err, data){
    			if (err) next(err);
          		res.redirect('/sales');
    		});
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Sales WHERE id = ?', [id], function(err, data){
			if(err) return next(err);
			res.redirect('/sales');
		});
	});
};
