module.exports = function(listOfItems){
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
  //Categorizing--------------------
  listOfItems.forEach(function(item){
    if(item.Item == "Bananas - loose"){
      totalFruits += item.Quantity
    }
    if(item.Item == "Apples - loose"){
      totalFruits += item.Quantity
    }
    if(item.Item == "Mixed Sweets 5s"){
      totalCandy += item.Quantity
    }
    if(item.Item == "Heart Chocolates"){
      totalCandy += item.Quantity
    }
    if(item.Item == "Coke 500ml"){
      totalCoolDrinks += item.Quantity
    }
    if(item.Item == "Fanta 500ml"){
      totalCoolDrinks += item.Quantity
    }
    if(item.Item == "Cream Soda 500ml"){
      totalCoolDrinks += item.Quantity
    }
    if(item.Item == "Amasi"){
      totalDairy += item.Quantity
    }
    if(item.Item == "Milk 1l"){
      totalDairy += item.Quantity
    }
    if(item.Item == "Gold Dish Vegetable Curry Can"){
      totalCanned += item.Quantity
    }
    if(item.Item == "Chakalaka Can"){
      totalCanned += item.Quantity
    }
    if(item.Item == "Valentine Cards"){
      totalGifts += item.Quantity
    }
    if(item.Item == "Rose (plastic)"){
      totalGifts += item.Quantity
    }
    if(item.Item == "Iwisa Pap 5kg"){
      totalFood += item.Quantity
    }
    if(item.Item == "Top Class Soy Mince"){
      totalFood += item.Quantity
    }
    if(item.Item == "Bread"){
      totalBakery += item.Quantity
    }
    if(item.Item == "Soap Bar"){
      totalBeauty += item.Quantity
    }
    if(item.Item == "Shampoo 1 litre"){
      totalBeauty += item.Quantity
    }
  })

  var fuit = {Description : "Most Popular Category", Category : "Fruit", Quantity : totalFruits}
  categories.push(fuit);
  var candy = {Description : "Most Popular Category", Category : "Candy", Quantity : totalCandy}
  categories.push(candy);
  var drink = {Description : "Most Popular Category", Category : "Cool Drink", Quantity : totalCoolDrinks}
  categories.push(drink);
  var dairy = {Description : "Most Popular Category", Category : "Dairy", Quantity : totalDairy}
  categories.push(dairy);
  var can = {Description : "Most Popular Category", Category : "Canned", Quantity : totalCanned}
  categories.push(can);
  var gift = {Description : "Most Popular Category", Category : "Gifts", Quantity : totalGifts}
  categories.push(gift);
  var food = {Description : "Most Popular Category", Category : "Food", Quantity : totalFood}
  categories.push(food);
  var bakery = {Description : "Most Popular Category", Category : "Bakery", Quantity : totalBakery}
  categories.push(bakery);
  var beauty = {Description : "Most Popular Category", Category : "Beauty", Quantity : totalBeauty}
  categories.push(beauty);
  var sortTheArray = function(list){
    list.sort(function(obj1, obj2){
      return obj1.Quantity - obj2.Quantity;
    })
  }
  sortTheArray(categories)
  return categories[categories.length-1];
}
