// exports.check = function(req, res){
//   var checkbox = req.body.checkbox;
//   var array =[];
//   req.getConnection(function(err, connection){
//     if(checkbox.checked){
//       array.push(checkbox.value);
//       connection.query("DELETE FROM Products WHERE id = ?", [array],function(err, rows){
//         if (err) return next(err);
//         res.redirect('/products');
//       });
//     };
//   });
// };
