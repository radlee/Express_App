module.exports = function (listOfObjs){
  var totalProducts = [];
  var totalObjs = {};
  listOfObjs.forEach(function(item){
    var Item = item.Item;
    var number = item.Quantity;
    if(totalObjs[Item] == undefined){
      totalObjs[Item] = 0;
    }
    totalObjs[Item] = totalObjs[Item] + number;
  })
  for(var key in totalObjs){
    var result = {
      Description : "Least Popular Product",
      Item : key,
      Quantity : totalObjs[key]
    }
    totalProducts.push(result);
  }
  var sortTheArray = function(unsorttedArray){
    unsorttedArray.sort(function(obj1, obj2){
      return obj1.Quantity - obj2.Quantity;
    })
  }
  sortTheArray(totalProducts)
  return totalProducts[0];
}
