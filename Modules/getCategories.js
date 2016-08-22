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
      var fuit = {Category : "Fruit", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price};
      categories.push(fuit);
    }
    else if(item.Item == "Apples - loose"){
      var candy = {Category : "Fruit", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price};
      categories.push(candy);
    }
    else if(item.Item == "Mixed Sweets 5s"){
      var candy = {Category : "Candy", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(candy);
    }
    else if(item.Item == "Heart Chocolates"){
      var candy = {Category : "Candy", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(candy);
    }
    else if(item.Item == "Coke 500ml"){
      var drink = {Category : "CoolDrink", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(drink);
    }
    else if(item.Item == "Fanta 500ml"){
      var drink = {Category : "CoolDrink", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(drink);
    }
    else if(item.Item == "Cream Soda 500ml"){
      var drink = {Category : "CoolDrink", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(drink);
    }
    else if(item.Item == "Amasi"){
      var dairy = {Category : "Dairy", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(dairy);
    }
    else if(item.Item == "Milk 1l"){
      var dairy = {Category : "Dairy", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(dairy);
    }
    else if(item.Item == "Gold Dish Vegetable Curry Can"){
      var can = {Category : "Canned", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(can);
    }
    else if(item.Item == "Chakalaka Can"){
      var can = {Category : "Canned", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(can);
    }
    else if(item.Item == "Valentine Cards"){
      var gift = {Category : "Gifts", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(gift);
    }
    else if(item.Item == "Rose (plastic)"){
      var gift = {Category : "Gifts", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(gift);
    }
    else if(item.Item == "Iwisa Pap 5kg"){
      var food = {Category : "Food", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(food);
    }
    else if(item.Item == "Top Class Soy Mince"){
      var food = {Category : "Food", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(food);
    }
    else if(item.Item == "Bread"){
      var food = {Category : "Food", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(food);
    }
    else if(item.Item == "Soap Bar"){
      var beauty = {Category : "Beauty", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(beauty);
    }
    else if(item.Item == "Shampoo 1 litre"){
      var beauty = {Category : "Beauty", Item : item.Item, Date : item.Date, Quantity : item.Quantity, Price : item.Price}
      categories.push(beauty);
    }
  });


  var sortTheArray = function(list){
    list.sort(function(obj1, obj2){
      return obj1.Item - obj2.Item;
    })
  }
  sortTheArray(categories);
  return categories;
}
