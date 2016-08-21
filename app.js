var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
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
  console.log(req.body.request.type=="IntentRequest");
  if (req.body.request.intent.name=="Remove")
  {

    var itemName = req.body.request.intent.slots.ItemR.value;
    var success = removeItem(itemName);

    if(success)
    { 
      var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": itemName + " has been removed from the list"
            },
            "shouldEndSession": true
          }
        };
    } res.json(xyz);
  }
  else if (req.body.request.intent.name=="List")
  {
    var success = listItems();

    if(success)
    { 
      var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Here is your list"
            },
            "shouldEndSession": true
          }
        };
    }   res.json(xyz);
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
    var success = process();

    if(success)
    { 
      var xyz = { 
            "response": {
            "outputSpeech": {
              "type": "PlainText",
              "text":  itemName +" has been added"
            },
            "shouldEndSession": true  
          }
        };
        res.json(xyz);
    }   
  } 
});


function addItem(Item, UserIden, callback)
{
  connection.query("SELECT * FROM `list` WHERE description LIKE '% "+Item+" %'", function(error, rows, fields){
   // console.log(rows)
      if (rows.length == 0) {
        var v = {};
        v.description = "I could not be locate "+Item+" in stock";
        callback(0, [v], []);
      } else {
        var id = rows[0].id;
        var name = rows[0].description;
        var q = "SELECT * FROM `mylist` WHERE Product_ID = "+id+" AND user_ID = '"+UserIden+"'";
        console.log(q)
      
        connection.query(q, function(error, rows, fields){
          if (rows.length == 0) {
            // Insert
            q = "INSERT INTO `mylist`(`user_ID`, `Product_ID`) VALUES ('"+UserIden+"',"+id+")"; 

            connection.query(q, function(error,result){});
            var v = {};
              v.description = name + " inserted into list";
              callback(0, [v], []);
          } else {
            console.log(rows);
              var v = {};
              v.description = name + " already in list";
              callback(0, [v], []);
          }
        });
      }
  });
}
function removeItem(Item)
{
  return true;
}
function listItems()
{
  return true;
}
function process()
{
  return true;
}


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

exports = module.exports = app;
