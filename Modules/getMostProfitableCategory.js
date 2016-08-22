module.exports = function(theList){
  var categories = [];
  var totalFruits = 0;
  var totalCandy =0;
  var totalCoolDrinks =0;
  var totalDairy =0;
  var totalCanned =0;
  var totalGifts =0;
  var totalFood =0;
  var totalBakery =0;
  var totalBeauty =0;
  //Categorizing-------------------------
  theList.forEach(function(item){
    if(item.Item == "Bananas - loose"){
      totalFruits += parseFloat(item.Profit)
    }
    if(item.Item == "Apples - loose"){
      totalFruits += item.Profit
    }
    if(item.Item == "Mixed Sweets 5s"){
      totalCandy += item.Profit
    }
    if(item.Item == "Heart Chocolates"){
      totalCandy += item.Profit
    }
    if(item.Item == "Coke 500ml"){
      totalCoolDrinks += item.Profit
    }
    if(item.Item == "Fanta 500ml"){
      totalCoolDrinks += item.Profit
    }
    if(item.Item == "Cream Soda 500ml"){
      totalCoolDrinks += item.Profit
    }
    if(item.Item == "Amasi"){
      totalDairy += parseFloat(item.Profit)
    }
    if(item.Item == "Milk 1l"){
      totalDairy += parseFloat(item.Profit)
    }
    if(item.Item == "Gold Dish Vegetable Curry Can"){
      totalCanned += item.Profit
    }
    if(item.Item == "Chakalaka Can"){
      totalCanned += item.Profit
    }
    if(item.Item == "Valentine Cards"){
      totalGifts += item.Profit
    }
    if(item.Item == "Rose (plastic)"){
      totalGifts += item.Profit
    }
    if(item.Item == "Iwisa Pap 5kg"){
      totalFood += item.Profit
    }
    if(item.Item == "Top Class Soy Mince"){
      totalFood += item.Profit
    }
    if(item.Item == "Bread"){
      totalBakery += item.Profit
    }
    if(item.Item == "Soap Bar"){
      totalBeauty += item.Profit
    }
    if(item.Item == "Shampoo 1 litre"){
      totalBeauty += item.Profit
    }
  });
  var fuit = {Description : "Most Profitable Category", Category : "Fruit", Profit : totalFruits.toFixed(2).replace("","R")};
  categories.push(fuit);
  var candy = {Description : "Most Profitable Category", Category : "Candy", Profit : totalCandy.toFixed(2).replace("","R")}
  categories.push(candy);
  var drink = {Description : "Most Profitable Category", Category : "Cool Drink", Profit : totalCoolDrinks.toFixed(2).replace("","R")}
  categories.push(drink);
  var dairy = {Description : "Most Profitable Category", Category : "Dairy", Profit : totalDairy.toFixed(2).replace("","R")}
  categories.push(dairy);
  var can = {Description : "Most Profitable Category", Category : "Canned", Profit : totalCanned.toFixed(2).replace("","R")}
  categories.push(can);
  var gift = {Description : "Most Profitable Category", Category : "Gifts", Profit : totalGifts.toFixed(2).replace("","R")}
  categories.push(gift);
  var food = {Description : "Most Profitable Category", Category : "Food", Profit : totalFood.toFixed(2).replace("","R")}
  categories.push(food);
  var bakery = {Description : "Most Profitable Category", Category : "Bakery", Profit : totalBakery.toFixed(2).replace("","R")}
  categories.push(bakery);
  var beauty = {Description : "Most Profitable Category", Category : "Beauty", Profit : totalBeauty.toFixed(2).replace("","R")}
  categories.push(beauty);
  var sortTheArray = function(list){
    list.sort(function(obj1, obj2){
      return obj1.Profit - obj2.Profit;
    })
  }
  sortTheArray(categories);
  return categories[categories.length-1];
}
