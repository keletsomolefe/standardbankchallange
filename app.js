var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var nodemailer = require('nodemailer');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'viands'
});

//my sql
/*connection.connect();

//data inserted
var woolies = require('./shops/woolies.json');
var pnp = require('./shops/pnp.json');

console.log(pnp.length);
for (var i = 0; i < woolies.length; i++) {
  connection.query("INSERT INTO `list` (`id`, `store`, `description`, `price`) VALUES (NULL, 'WOOLWORTHS', "+connection.escape(woolies[i].name.toUpperCase())+", '"+woolies[i].price+"')", function(err, rows, fields) {
    if (err) throw err;
  });
}
for (var i = 0; i < pnp.length; i++) {
  connection.query("INSERT INTO `list` (`id`, `store`, `description`, `price`) VALUES (NULL, 'PICK AND PAY', "+connection.escape(pnp[i].name.toUpperCase())+", '"+pnp[i].price+"')", function(err, rows, fields) {
    if (err) throw err;
  });
}

connection.end();*/

/*connection.query('SELECT * from list', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].store);
});*/



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', function (req, res) {

  //console.log(req.body);
  if (req.body.request.intent.name=="Remove")
  {

    var itemName = req.body.request.intent.slots.ItemR.value.toUpperCase();
    var userID = req.body.session.user.userId;
    var result = removeItem(itemName,userID,function(error, rows, fields){
      var result = rows[0].description;
      var xyz = { 
        "response": {
          "outputSpeech": {
            "type": "PlainText",
            "text":  result
          },
          "shouldEndSession": true  
        }
      };
      res.json(xyz);
    });
  }
  else if (req.body.request.intent.name=="List")
  {
    var userID = req.body.session.user.userId;
    var result = listItems(userID, function(err,rows)
    {
      if(err) 
        throw err;

      var numRows = rows.length;
      //console.log(rows.length);
      if(numRows == 0){
         var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Your Viands List is empty, If you'd like me to add anything, just ask."
            },
            "shouldEndSession": true
            }
          };
        res.json(xyz);
      } else {

        var output = "The items you have on your list are, ";
        for(i = 0; i < rows.length; i++)
        {
          output += rows[i].Description;

          if(rows.length - i == 2)
            output += " AND ";
          else
           output += " , ";
  
          //console.log(rows[i]);
        }
        
       // output += "I have selected these because they the most cost effective to suite your needs.";
        console.log(output);

        var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": output 
            },
            "shouldEndSession": true
            }
          };
        res.json(xyz);
      }
    });
     
  }


  else if(req.body.request.intent.name == "Add")
  {
    var itemName = req.body.request.intent.slots.ItemA.value.toUpperCase();
    var userID = req.body.session.user.userId;
    var result;

    addItem(itemName,userID, function(error, rows, fields){
      var result = rows[0].description;
      var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text":  result
            },
            "shouldEndSession": true  
          }
        };
        res.json(xyz);
    });
  }
  else if(req.body.request.intent.name == "Process")
  { 
    if (req.body.session.new==true){
      getPrceTotal(req.body.session.user.userId, function(err,rows){
            console.log(rows[0]);

            var total = rows[0].total;
            var rands = Math.floor(total);
            var cents = Math.floor((total - rands) * 100);

            var xyz = { 
              "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "The total is " + rands + " rands and " + cents + " cents. \n Say the magic word!!"
                  },
                  "shouldEndSession": false
              }
            };
            res.json(xyz);
          });
    }else {
      if (req.body.request.intent.slots.YesNo.value != undefined && req.body.request.intent.slots.YesNo.value.toUpperCase()=="FORTNOX") {
            var xyz = { 
              "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Your order has been sent to the supermarkets respectively."
                  },
                  "shouldEndSession": true
              }
            };

            var nodemailer = require('nodemailer');

            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: '"Keletso Molefe 👥" <kmolefe@gmail.com', // sender address
                to: 'mahokod@yahoo.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world 🐴', // plaintext body
                html: '<b>Hello world 🐴</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            res.json(xyz);
      }
      else {
        var xyz = { 
              "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Magic word is wrong!"
                  },
                  "shouldEndSession": true
              }
            };
            res.json(xyz);
      }
    }
  } 

});

function addItem(Item, UserIden, callback)
{
  connection.query("SELECT * FROM `list` WHERE description LIKE '% "+Item+" %' or description LIKE '"+Item+" %' ORDER BY price ASC", function(error, rows, fields){
   // console.log(rows)
      if (rows.length == 0) {
        var v = {};
        v.description = "I could not locate "+Item+" in stock";
        callback(0, [v], []);
      } else {
        var id = rows[0].id;
        var name = rows[0].description;
        var store = rows[0].store;
        var price = rows[0].price;
        var q = "SELECT * FROM `mylist` WHERE Product_ID = "+id+" AND user_ID = '"+UserIden+"'";
        console.log(q)
      
        connection.query(q, function(error, rows, fields){
          if (rows.length == 0) {
            // Insert
            q = "INSERT INTO `mylist`(`user_ID`, `Product_ID`, `Description`, `Price`) VALUES ('"+UserIden+"',"+id+", '"+name+"', '"+price+"')"; 

            connection.query(q, function(error,result){});
            var v = {};

              var total = price;
              var rands = Math.floor(total);
              var cents = Math.floor((total - rands) * 100);

              v.description = name + " from " + store + " which costs" + rands + " rands "+ "and " + cents + "cents, has been added to your viands list, I have selected this one for you because it is the most cost effective";
              callback(0, [v], []);
          } else {
            console.log(rows);
              var v = {};
              v.description = name + " is already in your viands list";
              callback(0, [v], []);
          }
        });
      }
  });
}
function removeItem(Item, userIden, callback)
{
  connection.query("DELETE FROM `mylist` WHERE `Description` LIKE '%"+Item+"%'", function(error, rows, fields)
  {
    if(error)
      throw error;

    if (rows.affectedRows==0){
      var v={};
      v.description = Item+" is not on the viands list";
      callback(0,[v],[]);
    } else{
      var v={};
      v.description = "I have removed " +Item+ " from your Viands list";
      callback(0,[v],[]);
    }
  });
}


function listItems(userIden, callback)
{

  sqlstmt = "SELECT Description FROM mylist WHERE user_ID = '"+userIden+"'";
    connection.query(sqlstmt, callback);
}

function getPrceTotal(userIden, callback)
{
  sqlstmt = "SELECT sum(list.price) as total FROM list INNER JOIN mylist ON list.id  = mylist.Product_ID  AND mylist.user_ID = '"+userIden+"'";
  connection.query(sqlstmt, callback);
}
/*if(error)
        throw error;

      PriceTotal = result[0].total;
      console.log("total cost: "+PriceTotal);

      return "All of this will cost you a total of "+ PriceTotal + "Rands. Would you like to continue with the transaction?";*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

exports = module.exports = app;
