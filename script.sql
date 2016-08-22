USE Nelisa;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Sales;
DROP TABLE IF EXISTS Purchases;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE Categories(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Category char(100) NOT NULL,
  CONSTRAINT uc_Category UNIQUE (Category)
);

CREATE TABLE Products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Product char(100) NOT NULL,
  CategoryID INT,
  FOREIGN KEY (CategoryID) REFERENCES Categories (id),
  CONSTRAINT uc_Products UNIQUE (Product)
);

CREATE TABLE Sales(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Date char(50) NOT NULL,
  Quantity INT,
  Price DECIMAL(4,2) NOT NULL,
  ProductID INT,
  FOREIGN KEY (ProductID) REFERENCES Products (id)
  -- CONSTRAINT uc_Sales UNIQUE (ProductID)
);
CREATE TABLE Purchases(
  id INT PRIMARY KEY AUTO_INCREMENT,
  Shop char(100) NOT NULL,
  Date char(50) NOT NULL,
  Quantity INT,
  CostPerItem DECIMAL(4,2) NOT NULL,
  ProductID INT,
  FOREIGN KEY (ProductID) REFERENCES Products (id)
);
