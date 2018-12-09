
	var user = "";
	var ordered = "";
    var username = "";
    var password = "";
    var into = "Hi, i am <strong>Brush</strong>. <br> I am a chat bot here to help you. You can complain to me or ask me questions related to how to do some things on the website. <br>At any point you can type <strong>Commands</strong> for help options.";

    var intoVoice = "Hi, i am Brush. I am a chat bot here to help you. You can complain to me or ask me questions related to how to do some things on the website. At any point you can type Commands for help options. Lets start with your name. What should i call you?";

	$(document).ready(function() {
		intro();

        $('#message').keydown(function(e){
        	var message = $("#message").val().trim();
        	
	        if (e.ctrlKey && e.which == 13) {
	          	if (message) {
	      			humanSend(message);
	      			getMessage(message.toLowerCase());
	      			$("#message").val('');
	      			$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
      			}
	        }
      	});

      	$("#send").click(function() {
      		var message = $("#message").val().trim();

      		if (message) {
      			humanSend(message);
      			getMessage(message.toLowerCase());
      			$("#message").val('');
      			$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
      		}
      	})

        $("#modalButton").click(function() {
            setTimeout(function() {
                responsiveVoice.speak(intoVoice ,'UK English Male');
            }, 1000);
        })
    })


    function intro() {
        botSend(into);

        botSend("Start by typing your First Name please.");
        //responsiveVoice.speak("Type in your name so that i will know you." ,'UK English Male');
    }

    function commands() {
    	botSend("To train me use this format <strong>Train: Question | Answer</strong>. <br> To buy an item from here use this format <strong>Buy: Designer | Size | Color | Unit | Delivery Address</strong>. <br> To see the list of available designers type <strong>Show designers</strong>. <br> To clear this screen type <strong>cls</strong>.");
    }

    function botMessage(message) {
        return "<div class=\"by-bot pull-right\"><em>Brush</em>: <br>" + message + "</div>";
    }

    function humanMessage(message) {
    	if (user.length > 1) {
    		return "<div class=\"by-me pull-left\"><em class=\"text-capitalize\">" + user + "</em>: <br>" + message + "</div>";
    	}
    }

    function botSend(message) {
    	$(".chats").append(botMessage(message));
    }

    function humanSend(message) {
    	$(".chats").append(humanMessage(message));
    }


    function getMessage(message) {
    	if (user.length < 1) {
    		user = message;
    		$("#message").val('');
    		botSend("Hello <strong><em>" + user + "</em></strong>. How may i help you?");
    		responsiveVoice.speak("Hello " + user + ". How may i help you?" ,'UK English Male');
    	} else if (ordered.length > 1 && username.length < 1) {
            username = message;
            botSend("Enter your password to confirm identity.");
            $(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
        } else if (ordered.length > 1 && username.length > 1 && password.length < 1) {
            password = message;
            botSend("Reply 'y' or 'yes' to confirm order or 'n' or 'no' to cancel order.");
            $(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
        } else if (ordered.length > 1 && (message == "y" || message == "yes") && password.length > 1) {
            botSend("Thank you for placing an order. Your order will be delivered to your address.");
            password = "";
            ordered = "";
            username = "";
        } else if (ordered.length > 1 && (message == "n" || message == "no") && password.length > 1) {
            botSend("Order was cancelled, thank you.");
            password = "";
            ordered = "";
            username = "";
        } else if (message == "cls") {
    		$(".chats").html('');
    	} else if (message.indexOf("commands") >= 0) {
    		commands();
    	} else if (message.indexOf("show designers") >= 0 || message.indexOf("list designers") >= 0 || message.indexOf("all designers") >= 0) {
    		botSend("<ol>" +
    			"<li>Adidas</li>" +
    			"<li>Nike</li>" +
    			"<li>Reebok</li>" +
    			"<li>Umbro</li>" +
    			"<li>Kappa</li>" +
    			"<li>Vans</li>" +
    			"</ol>");
    	} else if (message.indexOf("train:") >= 0) {
    		$.ajax({
    			type: "POST",
    			url: "work.php",
    			data: {"train": message},
    			success: function(data) {
    				botSend(data);
    				$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
    			}
    		});
    	} else if (message.indexOf("buy:") >= 0) {
    		$.ajax({
    			type: "POST",
    			url: "work.php",
    			data: {"buy": message},
    			success: function(data) {
    				if (data == 1) {
    					ordered = "placed";
    					botSend("Enter your username to continue.");
    					$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
    				} else {
    					botSend(data);
    					$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
    				}
    			}
    		});
    	} else {
    		if (message.indexOf("i bought") >= 0 || message.indexOf("i purchased") >= 0 || message.indexOf("i placed order") >= 0 || message.indexOf("i placed an order") >= 0 ||message.indexOf("have not been delivered") >= 0 || message.indexOf("has not been delivered") >= 0 || message.indexOf("was not delivered") >= 0 || message.indexOf("failed to deliver") >= 0) {
    				botSend("Please contact the seller or open a dispute for the item(s) you bought and the issue will be resolved as soon as possible.");
    		} else if (message.indexOf("can\'t find it") >= 0 || message.indexOf("can\'t locate it") >= 0 || message.indexOf("can\'t find the designer") >= 0 || message.indexOf("can\'t find the shoe") >= 0 || message.indexOf("its not on the website") >= 0) {
    				botSend("It may be that the product you are looking for is out of stock. Use <strong>Show designers</strong>, <strong>list designers</strong> or <strong>all designers</strong> to see the list of available designers.");
    		} else if (message.indexOf("want to buy") >= 0 || message.indexOf("want to purchase") >= 0 || message.indexOf("want to place order") >= 0 || message.indexOf("need to buy") >= 0 || message.indexOf("need to purchase") >= 0 || message.indexOf("need to place order") >= 0 || message.indexOf("need to place an order") >= 0 || message.indexOf("want to place an order") >= 0 || message.indexOf("can i buy") >= 0 || message.indexOf("can i purchase") >= 0 || message.indexOf("can i place order") >= 0) {

    			if (message.indexOf("can\'t find it") >= 0 || message.indexOf("can\'t locate it") >= 0 || message.indexOf("can\'t find the designer") >= 0 || message.indexOf("can\'t find the shoe") >= 0 || message.indexOf("its not on the website") >= 0) {
    				botSend("It may be that the product you are looking for has finished. Use <strong>Show designers</strong>, <strong>list designers</strong> or <strong>all designers</strong> to see the list of available designers.");
    			} else{
    				botSend("To buy an item from here use this format <br> <strong>Buy: Designer | Size | Color | Unit | Delivery Address</strong>");
    			}
    		} else {
    			$.ajax({
	    			type: "POST",
	    			url: "work.php",
	    			data: {"question": message},
	    			success: function(data) {
	    				botSend(data);
	    				$(".modal-body").scrollTop($(".modal-body").prop("scrollHeight"));
	    			}
    			});
    		}
    	}
    }