var express = require('express');
var app = express();

app.post('/', function (req, res) {
	var xyz = {"response": {
   "outputSpeech": {
     "type": "PlainText",
     "text": "Bosso ke wena"
   },
   "shouldEndSession": true
 }
}


  res.json(xyz);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});