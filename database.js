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

	function listItems(userIden)
	{
		sqlstmt = "SELECT 'description' FROM 'list' WHERE 'id' = 'mylist.Product_ID' AND 'mylist.user_ID' = userIden";

		conn.query(sqlstmt, function(err,rows)
		{
			if(err) 
				throw err;
			if(rows == undefined)
				return "Your Viands List is empty, If you'd like me to add anything, just ask.";

				var output = "The items you have on your list are, ";
				for(i = 0; i < rows.length; i++)
				{
					output += rows[i] + ", "
					console.log(rows[i]);
				}
				
				output += "I have selected these because they the most cost effective to suite your needs."
				return output;
		});
	}

	function processOrder(userIden)
	{
		sqlstmt = "SELECT sum('price') as 'Total' FROM 'list' WHERE 'id' = 'mylist.Product_ID' AND 'mylist.user_ID' = userIden";


		conn.query(sqlstmt, function(err,rows)
		{
			if(err) 
				throw err;
			if(rows == undefined)
				return "Your Viands List is empty, If you'd like me to add anything, just ask.";

				var outSpeech = "This purchase will cost you a total of " + Total+ ". Would you like to carry on?";
		});

	}

