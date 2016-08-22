module.exports = function(arrayOfCats){
  var productNamesAndCategoryNames = [];
  arrayOfCats.forEach(function(item){
    if(item.Item == "Amasi"){
     productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category , Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Milk 1l"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Cream Soda 500ml"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Bananas - loose"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Soap Bar"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Shampoo 1 litre"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Mixed Sweets 5s"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Top Class Soy Mince"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Apples - loose"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Chakalaka Can"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Gold Dish Vegetable Curry Can"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Iwisa Pap 5kg"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Coke 500ml"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Fanta 500ml"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Heart Chocolates"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Valentine Cards"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Rose (plastic)"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
    if(item.Item == "Bread"){
      productNamesAndCategoryNames.push({Product : item.Item, Category : item.Category, Date : item.Date, Quantity : item.Quantity, Price : item.Price});
    }
  })
  return productNamesAndCategoryNames;
}
