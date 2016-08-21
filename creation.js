
			sqlstmt = "CREATE TABLE User(
				user_ID INT(6) AUTO_INCREMENT PRIMARY KEY,
				appID VARCHAR(50) NOT NULL,
				emailAddress VARCHAR(50),
				cellnumber VARCHAR(50) NOT NULL,
				current_OTP INT(3)
			)";
			
			conn.query(sqlstmt, function(err,rows);
				if(err) throw err;	

			sqlstmt = "CREATE TABLE List(
				item_ID INT(4) AUTO_INCREMENT PRIMARY KEY,
				item_Name VARCHAR(50) NOT NULL
				);"

			conn.query(sqlstmt, function(err,rows);
				if(err) throw err;			
	}	

	initializeDB();		
