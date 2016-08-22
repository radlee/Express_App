module.exports = function(arrayOfSales, arrayOfTotalCost){
  var arrayOfItemsProfits = [];
  arrayOfSales.forEach(function(object1){
    arrayOfTotalCost.forEach(function(object2){
      if(object1.Item === object2.Item){
        var profit = parseFloat(object1.Sales) - parseFloat(object2.TotalCost);
        var result = {
          Description : "Most Profitable Category",
          Item : object1.Item,
          Profit : profit
        }
        arrayOfItemsProfits.push(result);
      }
    })
  })
  var sortTheArray = function(unsorttedArray){
    unsorttedArray.sort(function(obj1, obj2){
      return obj1.Profit - obj2.Profit;
    })
  }
  sortTheArray(arrayOfItemsProfits)
  return arrayOfItemsProfits;
}
