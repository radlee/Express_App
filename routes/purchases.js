
/***
 * A very basic CRUD example using MySQL
 */

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('select Purchases.id, Purchases.Shop, Purchases.Date, Purchases.Quantity, Purchases.CostPerItem, Products.Product from Purchases inner join Products on Purchases.ProductID = Products.id', [], function(err, results) {
        if (err) return next(err);
		res.render( 'purchases', {
				no_products : results.length === 0,
				purchases : results,
		});
      });
	});
};

exports.showAdd = function(req, res){
	res.render('add_purchases');
}
//
exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = req.body
		console.log(input);
		var data = {
			Shop : input.Shop,
			Date : input.Date,
			Quantity : input.Quantity,
			CostPerItem: input.CostPerItem,
			ProductID : input.ProductID
		};

	connection.query('insert into Purchases set ?', data, function(err, results) {
			if (err) return next(err);
		res.redirect('/purchases');
	});

	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Purchases WHERE id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('edit_purchases',{page_title:"Edit Customers - Node.js", data : rows[0]});
		});
	});
};

exports.update = function(req, res, next){

  var data = req.body;
  var id = req.params.id;
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
