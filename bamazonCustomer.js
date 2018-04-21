var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

var productID;
var selProductPrice;
var selProductStock;
forSaleItems();


connection.connect(function (err) {
    if (err) throw err;
    
});

function forSaleItems() {
    inquirer.prompt([{
        name: "welcome",
        type: "confirm",
        message: "Would you check out whats for sale?"
        // choices: ["Yeah sure!", "Nah, maybe another time.."]
    }]).then(function (answer) {

        var query = "Select item_id, product_name, price FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err;
            var table = new Table({
                head: ["Item Id", "Product", "Price"]
            });
            for (var i = 0; i < res.length; i++) {
                table.push([res[i].item_id, res[i].product_name, '$' + res[i].price]);
            }
            console.log(table.toString());
            
        })
        if (answer.welcome) {
            console.log("These items are for sale!");
            var query = "Select item_id, product_name, price FROM products";
            connection.query(query, function (err, res) {
                if (err) throw err;
                var table = new Table({
                    head: ["Item Id", "Product", "Price"]
                });
                for (var i = 0; i < res.length; i++) {
                    table.push([res[i].item_id, res[i].product_name, '$' + res[i].price]);
                }
                console.log(table.toString());
                selectItem();
            })
        } else {
            console.log("Thank you for shopping at Bamazon! GoodBye!");
            process.exit();
        }
    })
}

function selectItem() {
    inquirer.prompt([{
        name:"selItem",
        message: "Please tell us the item id of the item you would like to buy",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (answer) {
        productID = answer.selItem;
        var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, {item_id: answer.selItem}, function(err, res) {
            if (err) throw err;
            selProductPrice = res[0].price;
            selProductStock = res[0].stock_quantity;

            console.log(`This the item information:
            ------------------------------
            Item ID: ${res[0].item_id}
            Item Name: ${(res[0].product_name)}
            Price: $${res[0].price}
            Stock: ${res[0].stock_quantity}
            ------------------------------
            `);
            productQuantity(selProductStock);
        })
    })
}

function productQuantity(stock) {
    inquirer.prompt({
        name: "quantity",
        message: "How many units would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }).then(function(answer) {
        
        if (answer.quantity < stock) {
        console.log(`
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        Thank you! Your order has been placed.`);
        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, [{stock_quantity: stock - answer.quantity}, {item_id: productID}], function(err, res) {
            if (err) throw err;
            var total = selProductPrice * answer.quantity;
            console.log(`

           Your total order is: $${total}
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`); 
            continueOrder();
        })
        } else {
            console.log("Sorry we don't have enough to fulfill that request... Please try again");
            forSaleItems();
        }
    })
}


function continueOrder() {
    inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to order another item?"
    }).then(function(answer) {
        if (answer.continue) {
            forSaleItems();
        } else {
            console.log("Thank you for shopping! Have a nice day.");
            process.exit();
        }
    })
};