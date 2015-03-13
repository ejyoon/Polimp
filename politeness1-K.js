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
    real = sents["scales"][scale]["sent_real"];
    context = sents["domains"][domain]["sent_context"];
    judge1 = sent_judge1;
    judge2 = sent_judge2;
    judge3 = sent_judge3;
 
    SP = sents["domains"][domain]["SP"]; //Speaker
    LS = sents["domains"][domain]["LS"]; //Listener
    AA = sents["domains"][domain]["AA"]; //Item 1
    BB = sents["domains"][domain]["BB"]; //Item 2
 
    inference = inference.replace("SP",SP).replace("LS",LS).replace("AA",AA).replace("BB",BB);

    real = real.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB);
    context = context.replace("SP",SP).replace("LS",LS).replace("LS",LS).replace("AA",AA).replace("BB",BB);
    judge1 = judge1.replace("LS",LS);
    judge2 = judge2.replace("LS",LS);
    judge3 = judge3.replace("LS",LS);
    
     return [inference, real, context, SP, LS, judge1, judge2, judge3];
}


// ############################## BP Changes Configuration settings ##############################
speakers = shuffle(["John","Bob"]);
sent_judge = shuffle(["kind", "truthful", "more powerful than LS"]);

var sents = {
    scales: {
		training1: {
		    sent_manipulation: null,
		    sent_inference: "Your shirt looks great.",
		    sent_real:  "LS's shirt actually looks terrible."
		},	
	   training2: {
		    sent_manipulation: null,
		    sent_inference: "You are not good at playing guitar.",
		    sent_real:  "LS is actually not good at playing guitar."
		},	
        // FIXME: from here on, politeness sentences
        sayHArealLB: {
            sent_manipulation: null,
            sent_inference: "People hated your AA.", 
            sent_real: "people hated LS's AA but did not hate LS's BB."
        },
        sayHArealHB: {
            sent_manipulation: null,
            sent_inference: "People hated your AA.", 
            sent_real: "people hated LS's AA and hated LS's BB."
        },
        sayLArealLB: {
            sent_manipulation: null,
            sent_inference: "People loved your AA.", 
            sent_real: "people loved LS's AA and loved LS's BB."
        },
        sayLArealHB: {
            sent_manipulation: null,
            sent_inference: "People loved your AA.", 
            sent_real: "people loved LS's AA and did not love LS's BB."
        }
    },
    domains: {
	training1: {
	    sent_context: "SP and LS were talking about each other's shirts.",
        SP: speakers[0],
	    LS: speakers[1],

	},
	training2: {
	    sent_context: "SP and LS were talking about music.",
        SP: speakers[1],
	    LS: speakers[0],

	},
	tea: {
	    sent_context: "SP and LS were talking about cookies and tea that LS brought to a housewarming party yesterday.", // FIXME: for each context, need to (1) randomize who the speaker/listener is; 
	    SP: speakers[0],
	    LS: speakers[1],
	    AA: "cookies",
	    BB: "tea",
	},
	games: {
	    sent_context: "SP and LS were talking about games and puzzles that LS had suggested for a welcome event for their company.",
	    SP: speakers[0],
	    LS: speakers[1],
	    AA: "games",
	    BB: "puzzles",
	},
	poems: {
	    sent_context: "SP and LS were talking about poems and stories that LS wrote and presented for his English class.",
	    SP: speakers[1],
	    LS: speakers[0],
	    AA: "poems",
	    BB: "stories",
	},
	drawings: {
	    sent_context: "SP and LS were talking about books and movies that LS had recommended to people at a party.",
	    SP: speakers[1],
	    LS: speakers[0],
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
	judgment1: [],
    judgment2: [],
	judgment3: [],
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
	var radio1 = document.getElementsByName("judgment1");
	var radio2 = document.getElementsByName("judgment2");
	var radio3 = document.getElementsByName("judgment3");
	
	// Loop through radio buttons
	for (i = 0; i < radio1.length; i++) {
	    if (radio1[i].checked) {
            for (i = 0; i < radio2.length; i++) {
            if (radio2[i].checked) {
                for (i = 0; i < radio3.length; i++) {
                if (radio3[i].checked) {
		experiment.data.judgment1.push(radio1[i].value);
		experiment.data.judgment2.push(radio2[i].value);
		experiment.data.judgment3.push(radio3[i].value);
		response_logged = true;		    
	    }}}}}
	}
	
	
	if (response_logged) {
	    nextButton.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio1.length; i++) {
		radio1[i].checked = false;
        radio2[i].checked = false;
        radio3[i].checked = false; 
	    }
	    experiment.next();
	} else {
	    $("#testMessage").html('<font color="red">' + 
				   'Please make a response to every question!' + 
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

        sent_judge1 = sent_judge[0];
        sent_judge2 = sent_judge[1];
        sent_judge3 = sent_judge[2];
        sent_materials = doSentSubs(sents, scale, domain);
	    
	    // Display the sentence stimuli
	    $("#sent_context").html("<center>" + sent_materials[2] + "<center><br>");
	    $("#speaker").html("<center><i>" + sent_materials[3] + " said to " + sent_materials[4] + ":</i></center>")
	    $("#sent_inference").html("<center><b>\"" +
				      sent_materials[0] + "\"</b></center><br>");
	    $("#sent_real").html("<center>" + sent_materials[3] + " knows that " + sent_materials[1] + "</center><br><br>");
        $("#sent_judge1").html("<center>Would you conclude  that " + sent_materials[3] + " is " + sent_materials[5] + "? <br><b>" +
				     "</b></center>");
        $("#sent_judge2").html("<center>Would you conclude  that " + sent_materials[3] + " is " + sent_materials[6] + "? <br><b>" +
				     "</b></center>");
        $("#sent_judge3").html("<center>Would you conclude  that " + sent_materials[3] + " is " + sent_materials[7] + "? <br><b>" +
				     "</b></center>");
	    
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

