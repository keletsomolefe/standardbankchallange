var mysql = require('mysql')

var conn = mysql.createConnection({

	user : "spam",
	server : "localhost",	
	password : "spamPTA",
	database : "Viands"
});
	
	
	conn.connect();

	var request = new sql.Request();
	var sqlstmt;

	
	function initializeDB()
	{
		
		sqlstmt = "SELECT `fullname` FROM `Users` LIMIT 1";
		
		
			
			


	function addItem(Item)
	{
		sqlstmt = "SELECT `item_ID` FROM `List` WHERE 'item_Name' = 'Item'";
		conn.query(sqlstmt, function(err,rows)
		{
			numRows = rows.length;
		})
	
		if(numRows = 0)
		{	
			sqlstmt = "INSERT INTO 'List' ('item_Name') VALUES (Item)";

			conn.query(sqlstmt, function(err,rows)
			{
				if(err) throw err;		
			});

			return Item + " has been added to your Viands List";
		}
		else
		{
			return Item + " already exists in your Viands List";
		}	

	}