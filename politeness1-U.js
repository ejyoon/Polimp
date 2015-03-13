// ############################## Helper functions ##############################

// Shows slides
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get random integers.
function random(a,b) {
	if (typeof b == "undefined") {
		a = a || 2;
		return Math.floor(Math.random()*a);
	} else {
		return Math.floor(Math.random()*(b-a+1)) + a;
	}
}

// Add a random selection function to all arrays (e.g., <code>[4,8,7].random()</code> could return 4, 8, or 7). This is useful for condition randomization.
Array.prototype.random = function() {
  return this[random(this.length)];
}

// shuffle function
function shuffle (a) 
{ 
    var o = [];    
    for (var i=0; i < a.length; i++) {
	o[i] = a[i];
    }    
    for (var j, x, i = o.length;
	 i;
	 j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);	
    return o;
}

// substitution function - do we want to save all these factors to a data object? FIXME
function doSentSubs (sents, scale, domain)
{
    QUD = sents["scales"][scale]["sent_QUD"];
    utterance = sents["scales"][scale]["sent_utterance"];
    question = sents["scales"][scale]["sent_question"];
    context = sents["domains"][domain]["sent_context"];
 
    SP = sents["domains"][domain]["SP"]; //Speaker
    LS = sents["domains"][domain]["LS"]; //Listener
    AA = sents["domains"][domain]["AA"]; //Item 1
    BB = sents["domains"][domain]["BB"]; //Item 2
    AB = sents["domains"][domain]["AB"]; //Item 1&2
 
    QUD = QUD.replace("SP",SP).replace("LS",LS).replace("AA",AA).replace("BB",BB).replace("AB",AB);
    utterance = utterance.replace("SP",SP).replace("LS",LS).replace("AA",AA).replace("BB",BB).replace("AB",AB);
    question = question.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB).replace("AB",AB);
    context = context.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB).replace("AB",AB);
    
     return [utterance, question, context, SP, LS, QUD];
}


// ############################## BP Changes Configuration settings ##############################
speakers = shuffle([["John","Bob",], ["Chris","Sean"], ["Colin", "Kyle"], ["Eric", "Tyler"], ["Aaron", "Bob"], ["Carol", "Jane"], ["Katie", "Rose"], ["Mary", "Helen"], ["Gina", "Ellen"], ["Hailey", "Mika"]]);
speakers1 = shuffle(speakers[0]);
speakers2 = shuffle(speakers[1]);
speakers3 = shuffle(speakers[2]);
speakers4 = shuffle(speakers[3]);
speakers5 = shuffle(speakers[4]);
speakers6 = shuffle(speakers[5]);
speakers7 = shuffle(speakers[6]);
speakers8 = shuffle(speakers[7]);
speakers9 = shuffle(speakers[8]);
speakers10 = shuffle(speakers[9]);


var sents = {
    scales: {
		training1: {
            sent_QUD: "What do you enjoy doing in your free time?",
		    sent_utterance: "I like reading books.",
		    sent_question:  "SP also likes watching movies?"
		},	
	   training2: {
            sent_QUD: "What kind of food do you not like?",
		    sent_utterance: "I don't like eating vegetables.",
		    sent_question:  "SP doesn't like eating carrots?"
		},	
        sayHAinferLB: {
            sent_QUD: "Did people like my AB?",
            sent_utterance: "People hated your AA.", 
            sent_question: "people did not hate LS's BB?"
        },
        sayHAinferHB: {
            sent_QUD: "Did people like my AB?",
            sent_utterance: "People hated your BB.", 
            sent_question: "people also did not like LS's AA?"
        },
        sayLAinferLB: {
            sent_QUD: "Did people like my AB?",
            sent_utterance: "People loved your AA.", 
            sent_question: "people also liked LS's BB?"
        },
        sayLAinferHB: {
            sent_QUD: "Did people like my AB?",
            sent_utterance: "People loved your BB.", 
            sent_question: "people did not like LS's AA?"
        },
        saySomeHinferAllH: {
            sent_QUD: "Did people like my AA?",
            sent_utterance: "Some people hated your AA.", 
            sent_question: "no one liked LS's AA?"
        },
        saySomeHinferAllL: {
            sent_manipulation: null,
            sent_QUD: "Did people like my BB?",
            sent_utterance: "Some people hated your BB.", 
            sent_question: "someone liked LS's BB?"
        },
        saySomeLinferAllL: {
            sent_QUD: "Did people like my AA?",
            sent_utterance: "Some people loved your AA.", 
            sent_question: "everyone liked LS's AA?"
        },
        saySomeLinferAllH: {
            sent_QUD: "Did people like my BB?",
            sent_utterance: "Some people loved your BB.", 
            sent_question: "someone did not like LS's BB?"
        }
    },
    domains: {
	training1: {
	    sent_context: "SP and LS were talking about their favorite pastimes.",
        SP: speakers1[0],
	    LS: speakers1[1],

	},
	training2: {
	    sent_context: "SP and LS were talking about different kinds of food.",
        SP: speakers2[1],
	    LS: speakers2[0],

	},
	tea: {
	    sent_context: "SP and LS were talking about cookies and tea that LS brought to a housewarming party yesterday.", 
	    SP: speakers3[0],
	    LS: speakers3[1],
	    AA: "cookies",
	    BB: "tea",
        AB: "cookies and tea"
	},
	games: {
	    sent_context: "SP and LS were talking about games and puzzles that LS had suggested for a welcome event for their company.",
	    SP: speakers4[0],
	    LS: speakers4[1],
	    AA: "games",
	    BB: "puzzles",
        AB: "games and puzzles"        
	},
	poems: {
	    sent_context: "SP and LS were talking about poems and stories that LS wrote and presented for his English class.",
	    SP: speakers5[1],
	    LS: speakers5[0],
	    AA: "poems",
	    BB: "stories",
        AB: "poems and stories"
	},
	books: {
	    sent_context: "SP and LS were talking about books and movies that LS had recommended to people at a party.",
	    SP: speakers6[1],
	    LS: speakers6[0],
	    AA: "book recommendations",
	    BB: "movie recommendations",
        AB: "book and movie recommendations"
	},
    handouts: {
	    sent_context: "SP and LS were talking about handouts and activities that LS had made for teaching students in history class.",
	    SP: speakers7[1],
	    LS: speakers7[0],
	    AA: "handouts",
	    BB: "activities",
        AB: "handouts and activities"
	},
    soup: {
	    sent_context: "SP and LS were talking about soup and salad that LS had prepared for a dinner party.",
	    SP: speakers8[1],
	    LS: speakers8[0],
	    AA: "soup",
	    BB: "salad",
        AB: "soup and salad"
	},
    cards: {
	    sent_context: "SP and LS were talking about cards and flowers that LS had prepared for a graduating class of students.",
	    SP: speakers9[1],
	    LS: speakers9[0],
	    AA: "cards",
	    BB: "flowers",
        AB: "cards and flowers"
	},
    drawings: {
	    sent_context: "SP and LS were talking about cakes and pies that LS had baked for their friend's birthday party.",
	    SP: speakers10[1],
	    LS: speakers10[0],
	    AA: "cakes",
	    BB: "pies",
        AB: "cakes and pies"
	}
    }
};  


// Parameters for this participant

var scales = Object.keys(sents.scales);
var domains = Object.keys(sents.domains);

// remove the first two elements - the training trials
scales.shift();
scales.shift();
domains.shift();
domains.shift();

// now put the training trials up front and shuffle the rest of the trials.
scales = ["training1","training2"].concat(shuffle(scales));
domains = ["training1","training2"].concat(shuffle(domains));

var totalTrials = scales.length;

// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");

// ############################## The main event ##############################
var experiment = {
    
    // The object to be submitted.
    data: {
	scale: [],
	domain: [],
	sent_context: [],
	sent_utterance: [],
	sent_question: [],
	speaker: [],
	judgment: [],
	language: [],
	expt_aim: [],
	character_thoughts: [],
	expt_gen: [],
    },
    
    // end the experiment
    end: function() {
	showSlide("finished");
	setTimeout(function() {
	    turk.submit(experiment.data)
	}, 1500);
    },

    // LOG RESPONSE
    log_response: function() {
	var response_logged = false;
	
	//Array of radio buttons
	var radio = document.getElementsByName("judgment");
	
	// Loop through radio buttons
	for (i = 0; i < radio.length; i++) {
	    if (radio[i].checked) {
		experiment.data.judgment.push(radio[i].value);
		response_logged = true;		    
	    }
	}
	
	
	if (response_logged) {
	    nextButton.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
		radio[i].checked = false
	    }
	    experiment.next();
	} else {
	    $("#testMessage").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },
    
    // The work horse of the sequence - what to do on every trial.
    next: function() {
	// Allow experiment to start if it's a turk worker OR if it's a test run
	if (window.self == window.top | turk.workerId.length > 0) {

	    // clear the test message and adjust progress bar
	    $("#testMessage").html('');  
	    $("#prog").attr("style","width:" +
			    String(100 * (1 - scales.length/totalTrials)) + "%")
	    
	    // Get the current trial - <code>shift()</code> removes the first element
	    // randomly select from our scales array,
	    // stop exp after we've exhausted all the domains
	    var scale = scales.shift();
	    var domain = domains.shift();

	    // if the current trial is undefined, call the end function.
	    if (typeof scale == "undefined") {
		return experiment.debriefing();
	    }
	    
	    // Generate the sentence stimuli 

	    //set sent_context
//	   sent_context = sents["domains"][domain]["sent_context"];

	   sent_materials = doSentSubs(sents, scale, domain);	
	    
	    // Display the sentence stimuli
	    $("#sent_context").html("<center>" + sent_materials[2] + "<center><br><br>");
        $("#sent_QUD").html("<center><i>" + sent_materials[4] + " asked: </i> \"" + sent_materials[5] + "\"<center><br>");
	    $("#speaker").html("<center><i>" + sent_materials[3] + " said to " + sent_materials[4] + ":</i></center>")
	    $("#sent_utterance").html("<center><b>\"" +
				      sent_materials[0] + "\"</b></center><br><br>");
	    $("#sent_question").html("<center>Based on what " + sent_materials[3] + " said, would you conclude that<br><b>" +
				     sent_materials[1] + "</b></center>");
	    
	    // push all relevant variables into data object	    
	    experiment.data.scale.push(scale);
	    experiment.data.domain.push(domain);
	    experiment.data.sent_context.push(sent_materials[2]);
	    experiment.data.sent_utterance.push(sent_materials[0]);
	    experiment.data.sent_question.push(sent_materials[1]);
	    experiment.data.speaker.push(sent_materials[3]); 
	    
	    showSlide("stage");
	}
    },

    //	go to debriefing slide
    debriefing: function() {
	showSlide("debriefing");
    },

    // submitcomments function
    submit_comments: function() {
	experiment.data.language.push(document.getElementById("homelang").value);
	experiment.data.expt_aim.push(document.getElementById("expthoughts").value);
	experiment.data.character_thoughts.push(document.getElementById("character_thoughts").value);
	experiment.data.expt_gen.push(document.getElementById("expcomments").value);
	experiment.end();
    }
}

