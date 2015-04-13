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
		    sent_utterance: "'I like reading books.'",
		    sent_question:  "your friend hates reading books?"
		},	
	   training2: {
            sent_QUD: "What kind of food do you not like?",
		    sent_utterance: "'I don't like eating vegetables.'",
		    sent_question:  "your friend doesn't like eating carrots?"
		},	
        
        someHate_andAlsAll: {
            sent_manipulation: null,
            sent_QUD: "How did people like my BB?",
            sent_utterance: "'Some people didn't like your BB.'", 
            sent_question: "no one liked your BB?"
        },
        
        someLove_andAlsAll: {
            sent_QUD: "How did people like my BB?",
            sent_utterance: "'Some people liked your BB.'", 
            sent_question: "everyone liked your BB?"
        }
    },
    domains: {
	training1: {
	    sent_context: "Imagine that you and your friend were talking about your favorite pastimes. Your friend says: ",
        SP: "your friend",
	    LS: speakers1[1],

	},
	training2: {
	    sent_context: "Imagine that you and your friend were talking about different kinds of food. Your friend says: ",
        SP: "your friend",
	    LS: speakers2[0],

	},
	poem: {
	    sent_context: "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and read it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you that ", 
	    SP: "your friend",
	    LS: speakers3[1],
	    AA: "cookies",
	    BB: "poem",
        AB: "cookies and tea"
        
	},
	recipe: {
	    sent_context: "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you that ",
	    SP: "your friend",
	    LS: speakers4[1],
	    AA: "puzzles",
	    BB: "recipe",
        AB: "games and puzzles"        
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
	    $("#sent_context").html(sent_materials[2] + sent_materials[0] + "<br>");
	    $("#sent_question").html("<center>From what " +
				     sent_materials[3] + " told you, do you think it is possible that " +
				     sent_materials[1] + "</center>");
	    
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

