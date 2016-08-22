module.exports = function(file){
    var fs = require('fs');
    var data = fs.readFileSync(file, 'utf8');
    var listOfSplittedLines = data.split("\n").splice(1).filter(Boolean);
    var list =[];
    var listOfObjs = [];
    listOfSplittedLines.forEach(function(line){
      var splittedLine = line.split(";");
      list.push(splittedLine);
      var quantity = splittedLine[3];
      var costPerItem  = splittedLine[4].replace(/R/g, "");
      var totalCost = splittedLine[5].replace(/R/g, "");
      var costPerItem  = costPerItem.replace(",", ".");
      var totalCost = totalCost.replace(",", ".");
      var result = {
        Shop : splittedLine[0],
        Date : splittedLine[1],
        Item : splittedLine[2],
        Quantity : quantity,
        CostPerItem : costPerItem,
        TotalCost : totalCost
      }
      listOfObjs.push(result);
    })

    var weekl1Purchases = [];
    var weekl2Purchases = [];
    var weekl3Purchases = [];
    var weekl4Purchases = [];
    var week0 =new Date('31-Jan');
    var week1 =new Date('7-Feb');
    var week2 =new Date('14-Feb');
    var week3 =new Date('21-Feb');
    var week4 =new Date('1-Mar');
    listOfObjs.forEach(function(item){
        if(new Date(item.Date) < week1 && new Date(item.Date) >week0){
          var result ={
            Item : item.Item,
            TotalCost : parseFloat(item.TotalCost)
          }
          weekl1Purchases.push(result)
        }
        if(new Date(item.Date) < week2 && new Date(item.Date) >= week1){
          var result ={
            Item : item.Item,
            TotalCost : parseFloat(item.TotalCost)
          }
          weekl2Purchases.push(result)
        }
        if(new Date(item.Date) < week3 && new Date(item.Date) >= week2){
          var result ={
            Item : item.Item,
            TotalCost : parseFloat(item.TotalCost)
          }
          weekl3Purchases.push(result)
        }
        if(new Date(item.Date) >= week3){
          var result ={
            Item : item.Item,
            TotalCost : parseFloat(item.TotalCost)
          }
          weekl4Purchases.push(result)
        }
    })
    //Merge same Item names, Add totals and Sort the Array ---
    var totalCost = [];
    var totalCostObjs = {};
    weekl1Purchases.forEach(function(item){
      var Item = item.Item;
      var Price = item.TotalCost;
      if(totalCostObjs[Item] == undefined){
        totalCostObjs[Item] = 0;
      }
      totalCostObjs[Item] = totalCostObjs[Item] + Price;
    })
    for(var key in totalCostObjs){
      var result = {
        Item : key,
        TotalCost : totalCostObjs[key]
      }
      totalCost.push(result);
    }
    var sortTheArray = function(list){
      list.sort(function(obj1, obj2){
        return obj1.TotalCost - obj2.TotalCost;
      })
    }
    sortTheArray(totalCost)
    return totalCost;
}
