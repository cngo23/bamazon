CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (item_id),
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(10) NOT NULL
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jordan 1 Bred (size 9)", "Shoes", 450, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sega Genesis", "Electronics", 150, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Nintendo", "Electronics", 100, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Air Max 1 Chlorophyll (size 9)", "Shoes", 1400, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("(Male) Wilson Evolution Basketball", "Sports", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banh Mi Sandwich", "Food", 4, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fried Chicken Thighs", "Food", 2, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hakeem Olajuwon Jersey (medium)", "Clothes", 150, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("James Harden Jersey (large)", "Clothes", 120, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wilson GST Leather Football", "Sports", 80, 10);

SELECT * FROM products;
