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
//Pass a trial object in to be populated?
function doSentSubs (sents, scale, domain)
{
    inference = sents["scales"][scale]["sent_inference"];
    question = sents["scales"][scale]["sent_question"];
    context = sents["domains"][domain]["sent_context"];
 
    SP = sents["domains"][domain]["SP"]; //Speaker
    LS = sents["domains"][domain]["LS"]; //Listener
    AA = sents["domains"][domain]["AA"]; //Item 1
    BB = sents["domains"][domain]["BB"]; //Item 2
 
    inference = inference.replace("SP",SP).replace("LS",LS).replace("AA",AA).replace("BB",BB);

    question = question.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB);
    context = context.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB);
    
     return [inference, question, context, SP, LS];
}


// ############################## BP Changes Configuration settings ##############################
speakers = shuffle([["John","Bob",], ["Chris","Sean"], ["Colin", "Kyle"], ["Brian", "Peter"], ["Robert", "Philip"], ["Scott", "Michael"]]);
speakers1 = shuffle(speakers[0])
speakers2 = shuffle(speakers[1])
speakers3 = shuffle(speakers[2])
speakers4 = shuffle(speakers[3])
speakers5 = shuffle(speakers[4])
speakers6 = shuffle(speakers[5])


var sents = {
    scales: {
		training1: {
		    sent_manipulation: null,
		    sent_inference: "I like reading books.",
		    sent_question:  "SP also likes watching movies?"
		},	
	   training2: {
		    sent_manipulation: null,
		    sent_inference: "I don't like eating carrots.",
		    sent_question:  "SP hates eating vegetables?"
		},	
        // FIXME: from here on, politeness sentences
        sayHAinferLB: {
            sent_manipulation: null,
            sent_inference: "People hated your AA.", 
            sent_question: "people did not hate LS's BB?"
        },
        sayHAinferHB: {
            sent_manipulation: null,
            sent_inference: "People hated your AA.", 
            sent_question: "people did not like LS's BB?"
        },
        sayLAinferLB: {
            sent_manipulation: null,
            sent_inference: "People loved your AA.", 
            sent_question: "people also liked LS's BB?"
        },
        sayLAinferHB: {
            sent_manipulation: null,
            sent_inference: "People loved your AA.", 
            sent_question: "people did not like LS's BB?"
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
	    sent_context: "SP and LS were talking about cookies and tea that LS brought to a housewarming party yesterday.", // FIXME: for each context, need to (1) randomize who the speaker/listener is; 
	    SP: speakers3[0],
	    LS: speakers3[1],
	    AA: "cookies",
	    BB: "tea",
	},
	games: {
	    sent_context: "SP and LS were talking about games and puzzles that LS had suggested for a welcome event for their company.",
	    SP: speakers4[0],
	    LS: speakers4[1],
	    AA: "games",
	    BB: "puzzles",
	},
	poems: {
	    sent_context: "SP and LS were talking about poems and stories that LS wrote and presented for his English class.",
	    SP: speakers5[1],
	    LS: speakers5[0],
	    AA: "poems",
	    BB: "stories",
	},
	drawings: {
	    sent_context: "SP and LS were talking about books and movies that LS had recommended to people at a party.",
	    SP: speakers6[1],
	    LS: speakers6[0],
	    AA: "book recommendations",
	    BB: "movie recommendations",
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
	sent_inference: [],
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
	    $("#speaker").html("<center><i>" + sent_materials[3] + " said to " + sent_materials[4] + ":</i></center>")
	    $("#sent_inference").html("<center><b>\"" +
				      sent_materials[0] + "\"</b></center><br><br>");
	    $("#sent_question").html("<center>Would you conclude from this sentence that<br><b>" +
				     sent_materials[1] + "</b></center>");
	    
	    // push all relevant variables into data object	    
	    experiment.data.scale.push(scale);
	    experiment.data.domain.push(domain);
	    experiment.data.sent_context.push(sent_materials[2]);
	    experiment.data.sent_inference.push(sent_materials[0]);
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

