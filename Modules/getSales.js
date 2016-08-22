module.exports = function(file){
    var fs = require('fs');
    var data = fs.readFileSync(file, 'utf8');
    var arrayOfSplittedLines = data.split("\n").splice(1).filter(Boolean);
    var array =[];
    var arrayOfObjs = [];
    arrayOfSplittedLines.forEach(function(line){
      var splittedLine = line.split(",");
      array.push(splittedLine);
      var result = {
        Item : splittedLine[2],
        Quantity : Number(splittedLine[3]),
        Price : parseInt(splittedLine[4].replace(/R/g, ""))
      }
      arrayOfObjs.push(result);
    });
  //Merge the same products, multiply and add -------
    var salesMadePerWeek = [];
    var totalObjs = {};
    arrayOfObjs.forEach(function(item){
      var Item = item.Item;
      var Price = item.Price;
      var totalSales = Price * item.Quantity;
      if(totalObjs[Item] == undefined){
        totalObjs[Item] = 0;
      }
      totalObjs[Item] = totalObjs[Item] + totalSales;
    });
    for(var key in totalObjs){
      var result = {
        Item : key,
        Sales: totalObjs[key]
      }
      salesMadePerWeek.push(result);
    }
    var sortTheArray = function(array){
      array.sort(function(obj1, obj2){
        return obj1.Sales - obj2.Sales;
      });
    }
    sortTheArray(salesMadePerWeek)
    console.log(salesMadePerWeek);
    return salesMadePerWeek;
}
