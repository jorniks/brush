
<?
    
	define ('DB_USER', "root");
	define ('DB_PASSWORD', "");
	define ('DB_DATABASE', "bot");
	define ('DB_HOST', "localhost");


    if (isset($_POST["train"])) {
    	function multiExplode($delimeter, $string) {
    		$ready = str_replace($delimeter, $delimeter[0], $string);
    		$launch = explode($delimeter[0], $ready);
    		return  $launch;
    	}

    	$train = $_POST["train"];

		$exploded = multiExplode(array(":","|"), $train);

		$question = trim($exploded[1]);

		$answer = trim($exploded[2]);

		try {
			$con = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_DATABASE, DB_USER, DB_PASSWORD);
		} catch(PDOException $pe) {
			die("Could not connect to the database " . DB_DATABASE . ": " . $pe->getMessage());
		}

		try {
		    
		    $sql = "INSERT INTO `chatbot`(`question`, `answer`) VALUES ('$question', '$answer')";
		    // use exec() because no results are returned
		    $con->exec($sql);
		    
		    echo "Thank you for teaching me something new, this will enable me serve you better in the future.";
			
		} catch(PDOException $e) {
		    echo $sql . "<br>" . $e->getMessage();
		}
			
		$con = null;

    } elseif (isset($_POST["buy"])) {
    	function multiExplode($delimeter, $string) {
    		$ready = str_replace($delimeter, $delimeter[0], $string);
    		$launch = explode($delimeter[0], $ready);
    		return  $launch;
    	}

    	$buy = $_POST["buy"];
		
		$exploded = multiExplode(array(":","|"), $buy);

		$designer = trim($exploded[1]);
		$size = trim($exploded[2]);
		$color = trim($exploded[3]);
		$unit = trim($exploded[4]);
		$address = trim($exploded[5]);

		$design = array('nike', 'adidas', 'reebok', 'umbro', 'kappa', 'vans');

		if (is_string($designer) && is_numeric($size) && is_string($color) && is_numeric($unit) && is_string($address)) {
			if (in_array($designer, $design)) {
				echo 1;
			} else {
				echo "There is no product in stock from the designer you chose, please type <strong>show designers</strong> to see the list of available designers.";
			}
		} else {
			echo "The format you used is incorrect, please use the correct format.";
		}

    } elseif (isset($_POST['question'])) {
    	
    	$question = $_POST['question'];

		try {
			$con = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_DATABASE, DB_USER, DB_PASSWORD);
		} catch(PDOException $pe) {
			die("Could not connect to the database " . DB_DATABASE . ": " . $pe->getMessage());
		}

		try {
		    $stmt = $con->prepare("SELECT `answer` FROM `chatbot` WHERE `question`= '$question' ORDER BY rand() LIMIT 1");
			$stmt->execute();
			if($stmt->rowCount() > 0) {
			  while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					echo $row["answer"];
			  }
			} else {
			    echo "I don't understand this command. You can learn how to train me by typing <strong>Commands</strong>.";
			}
			
		} catch(PDOException $e) {
		    echo $sql . "<br>" . $e->getMessage();
		}

    }
?>