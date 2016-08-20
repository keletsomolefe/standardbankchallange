var express = require('express');
var app = express();

app.post('/', function (req, res) {
	var xyz = {"response": {
   "outputSpeech": {
     "type": "PlainText",
     "text": "Choki, I am very sorry, I know I hurt you and I know I'm not the best of people, but I care about you and I hope you can forgive me"
   },
   "shouldEndSession": true
 }
}


  res.json(xyz);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});