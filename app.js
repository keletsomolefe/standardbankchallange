var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
		}	res.json(xyz);
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
		}		res.json(xyz);
	}
	else if(req.body.request.intent.name == "Add")
	{
		var itemName = req.body.request.intent.slots.ItemA.value;
		var success = addItem(itemName);

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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function addItem(Item)
{
	return true;
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
