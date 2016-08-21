var mysql = require('mysql')

var conn = mysql.createConnection({

	user : "spam",
	server : "localhost",	
	password : "spamPTA",
	database : "Viands"
});
	
	
	conn.connect(function(err)
	{
		if(err)
		{	
			console.log('Error connecting to the database')
			return;
		}
		console.log('Connection established');	
	});

	var sqlstmt;
		


	function addItem(Item)
	{
		sqlstmt = "SELECT `item_ID` FROM `List` WHERE 'item_Name' = 'Item'";
		conn.query(sqlstmt, function(err,rows)
		{
			numRows = rows.length;
		});
	
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

	function removeItem(Item)
	{
		sqlstmt = "SELECT `item_ID` FROM `List` WHERE 'item_Name' = 'Item'";
		conn.query(sqlstmt, function(err,rows)
		{
			numRows = rows.length;
		});
	
		if(numRows > 0)
		{	
			sqlstmt = "DELETE FROM 'List' WHERE 'item_Name' = 'Item'";

			conn.query(sqlstmt, function(err,rows)
			{
				if(err) throw err;		
			});

			return Item + " has been removed to your Viands List";
		}
		else
		{
			return Item + " is not in your Viands List";
		}
	}

	function listItems()
	{
		sqlstmt = "SELECT 'item_Name' FROM 'List'";

		conn.query(sqlstmt, function(err,rows)
		{
			numRows = rows.length;
		});
	
		if(numRows > 0)
		{	
			return "Here is your Viands list.";
		}
		else
		{
			return "Your Viands List is empty";
		}


	}

	function processOrder()
	{
		
	}

