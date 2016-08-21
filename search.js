var woolies = require('./shops/woolies.json');
var pnp = require('./shops/pnp.json');

module.exports = {
	search_price: function(item) {
	for (i = 0; i < woolies.length; i++) {
		if (woolies[i].name.search(item) != -1) {
			return woolies[i].price;
		}
	}
	return -1;
	}
}