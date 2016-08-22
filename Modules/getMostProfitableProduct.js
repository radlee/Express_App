module.exports = function(arrayOfSales, arrayOfTotalCost){
  var arrayOfItemsAndProfits = [];
  arrayOfSales.forEach(function(item1){
    arrayOfTotalCost.forEach(function(item2){
      if(item1.Item === item2.Item){
        var profit = parseFloat(item1.Sales) - parseFloat(item2.TotalCost);
        var result = {
          Description : "Most Profitable Product",
          Item : item1.Item,
          Profit : profit.toFixed(2).replace("","R")
        }
        arrayOfItemsAndProfits.push(result);
      }
    })
  })
  var sortTheArray = function(unsorttedArray){
    unsorttedArray.sort(function(obj1, obj2){
      return obj1.Profit - obj2.Profit;
    });
  }
  sortTheArray(arrayOfItemsAndProfits)
  return arrayOfItemsAndProfits[arrayOfItemsAndProfits.length-1]
}
