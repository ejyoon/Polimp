//var filename = "EJY_polimp8"
//var condCounts = "1,50;2,50" //Example: "1,20;2,20;3,20"

// ---------------- HELPER ------------------
var NUM_SLIDERS = 10;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

function clearForm(oForm) {
  var sliderVar = "";
  for(var i=0; i<NUM_SLIDERS; i++)
  {
    sliderVar = "#slider" + i;
    $(sliderVar).slider("value", 20);
    $(sliderVar).css({"background":"#FFFFFF"});
    $(sliderVar + " .ui-slider-handle").css({
        "background":"#FAFAFA",
        "border-color": "#CCCCCC" });
    sliderVar = "slider" + i;
    document.getElementById(sliderVar).style.background = "";
  }
  
  var elements = oForm.elements; 
  
  oForm.reset();

  for(var i=0; i<elements.length; i++) {
    field_type = elements[i].type.toLowerCase();
    switch(field_type) {
    
      case "text": 
      case "password": 
      case "textarea":
            case "hidden":	
        
        elements[i].value = ""; 
        break;
          
      case "radio":
      case "checkbox":
          if (elements[i].checked) {
            elements[i].checked = false; 
        }
        break;
  
      case "select-one":
      case "select-multi":
                  elements[i].selectedIndex = -1;
        break;
  
      default: 
        break;
    }
  }
}

Array.prototype.random = function() {
  return this[random(this.length)];
}

function setQuestion(array) {
    var i = random(0, array.length - 1);
    var q = array[i];
    return q;
}

function shuffledArray(arrLength)
{
  var j, tmp;
  var arr = new Array(arrLength);
  for (i = 0; i < arrLength; i++)
  {
    arr[i] = i;
  }
  for (i = 0; i < arrLength-1; i++)
  {
    j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function shuffledSampleArray(arrLength, sampleLength)
{
  var arr = shuffledArray(arrLength);
  var beginIndex = Math.floor(Math.random() * (arrLength-sampleLength+1));
  return arr.slice(beginIndex, beginIndex+sampleLength);
}

function getRadioCheckedValue(formNum, radio_name)
{
   var oRadio = document.forms[formNum].elements[radio_name];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function randomizeSharpOffset()
{
  
  var r = Math.floor((Math.random()*6)+1);
  if (r < 4) { return r; }
  else { return 3-r; }
  /*
  var r = Math.floor((Math.random()*3)+1);
  return r;
  */
}


// ---------------- PARAMETERS ------------------

// CONDITION ASSIGNMENT
var cond = random(3)+1;

//call the maker getter to get the cond variable 
//var xmlHttp = null;
//xmlHttp = new XMLHttpRequest();
//xmlHttp.open( "GET", "https://langcog.stanford.edu/cgi-bin/subject_equalizer/maker_getter.php?conds=" + condCounts +"&filename=" + filename, false );
//xmlHttp.send( null );
//var cond = xmlHttp.responseText;

var allPeopleNumber = ["no one", "one person", "two people", "three people", "four people", "five people", "six people"];
//var currentUtteredPriceSliderIndex;

if (cond === 1) {
    
    var allConditions = 
[
[
{"domain":"poem", "valence":"like", "utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people liked your poem?" 
},
{"domain":"recipe","valence":"didn't like","buyer":"Bob", "utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people didn't like your recipe?"
}
],
[
{"domain":"recipe","modifier":"like", "utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people liked your recipe?"
},
{"domain":"poem","modifier":"didn't like","utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people didn't like your poem?"}
],
[
{"domain":"poem","valence":"didn't like", "utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people didn't like your poem?"
},
{"domain":"recipe","valence":"like","utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people liked your recipe?"
}
],
[
{"domain":"recipe","modifier":"didn't like", "utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people didn't like your recipe?"
},
{"domain":"poem","modifier":"like","utterance":"noUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote. <br><br> Before reading the note, how likely do you think it is that the following number of people liked your poem?"
}
]
];

} else if (cond === 2) {

    
    var allConditions = 
[
[
{"domain":"poem", "valence":"like", "utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your poem.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people liked your poem?" 
},
{"domain":"recipe","valence":"didn't like","buyer":"Bob", "utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your recipe.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people didn't like your recipe?"
}
],
[
{"domain":"recipe","modifier":"like", "utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your recipe.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people liked your recipe?"
},
{"domain":"poem","modifier":"didn't like","utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your poem.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people didn't like your poem?"}
],
[
{"domain":"poem","valence":"didn't like", "utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your poem.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people didn't like your poem?"
},
{"domain":"recipe","valence":"like","utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your recipe.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people liked your recipe?"
}
],
[
{"domain":"recipe","modifier":"didn't like", "utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your recipe.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people didn't like your recipe?"
},
{"domain":"poem","modifier":"like","utterance":"partialUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: '... didn't like your recipe.' (you can't read the first word(s) because it was smudged by accident) <br><br> Based on what you can read from your friend's note, how likely do you think it is that the following number of people liked your poem?"
}
]
];

} else {
    
    var allConditions = 
[
[
{"domain":"poem", "valence":"like", "utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your poem. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people liked your poem?" 
},
{"domain":"recipe","valence":"didn't like","buyer":"Bob", "utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your recipe. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people didn't like your recipe?"
}
],
[
{"domain":"recipe","modifier":"like", "utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your recipe. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people liked your recipe?"
},
{"domain":"poem","modifier":"didn't like","utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your poem. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people didn't like your poem?"}
],
[
{"domain":"poem","valence":"didn't like", "utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your BB. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people didn't like your poem?"
},
{"domain":"recipe","valence":"like","utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your recipe. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people liked your recipe?"
}
],
[
{"domain":"recipe","modifier":"didn't like", "utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a cooking club, with four members in addition to you and your friend. Each week, one member of the club makes a recipe and brings in what they cooked based on the recipe, and the five other members discuss the recipe in the absence of its author. Then you get a score based on the group evaluation of the recipe. This week, it is your turn to bring in a recipe and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your recipe. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people didn't like your recipe?"
},
{"domain":"poem","modifier":"like","utterance":"wholeUtterance",
"context": "Imagine that you and your friend have joined a poetry club, with four members in addition to you and your friend. Each week, one member of the club writes a poem and reads it aloud, and the five other members discuss the poem in the absence of its author. Then you get a score based on the group evaluation of the poem. This week, it is your turn to write a poem and to let others discuss it. After the discussion, before you find out about your score, your friend confides to you something by passing you a note he wrote, which says: 'Some people didn't like your poem. <br><br> From what your friend wrote to you, how likely do you think it is that the following number of people liked your poem?"
}
]
];

}

/*
var debugConditions =
[
[
{"sentenceID":1,"domain":"electric kettle","modifier":"an","number":"round","utterance":20,"buyer":"Alex"},
{"sentenceID":2,"domain":"electric kettle","modifier":"an","number":"round","utterance":50,"buyer":"Bob"},
{"sentenceID":3,"domain":"electric kettle","modifier":"an","number":"round","utterance":100,"buyer":"Calvin"},
{"sentenceID":4,"domain":"electric kettle","modifier":"an","number":"round","utterance":200,"buyer":"Dave"},
{"sentenceID":5,"domain":"electric kettle","modifier":"an","number":"round","utterance":500,"buyer":"Ed"},
{"sentenceID":6,"domain":"electric kettle","modifier":"an","number":"round","utterance":1000,"buyer":"Frank"},
{"sentenceID":7,"domain":"electric kettle","modifier":"an","number":"round","utterance":2000,"buyer":"George"},
{"sentenceID":8,"domain":"electric kettle","modifier":"an","number":"round","utterance":10000,"buyer":"Harry"},
{"sentenceID":9,"domain":"electric kettle","modifier":"an","number":"sharp","utterance":20,"buyer":"Ivan"}
]
];
*/

var debug = false;
if(debug) { allConditions = debugConditions; }


var numConditions = allConditions.length;
var chooseCondition = random(0, numConditions-1);
var allTrialOrders = allConditions[chooseCondition];
var numTrials = allTrialOrders.length;
var shuffledOrder = shuffledSampleArray(allTrialOrders.length, numTrials);
var currentTrialNum = 0;
var trial;
var numComplete = 0;
var buyer;

showSlide("instructions");
$("#trial-num").html(numComplete);
$("#total-num").html(numTrials);


var experiment = {
	condition: chooseCondition + 1,
	
  inferredPrices0: new Array(numTrials),
  inferredPrices1: new Array(numTrials),
  inferredPrices2: new Array(numTrials),
  inferredPrices3: new Array(numTrials),
  inferredPrices4: new Array(numTrials),
  inferredPrices5: new Array(numTrials),
  inferredPrices6: new Array(numTrials),
  inferredPrices7: new Array(numTrials),
  inferredPrices8: new Array(numTrials),
  inferredPrices9: new Array(numTrials),
  
  
  orders: new Array(numTrials),
  domains: new Array(numTrials),
  utterance: new Array(numTrials),
  context: new Array(numTrials),
  
  gender: "",
  age:"",
  income:"",
  nativeLanguage:"",
  comments:"",
  description: function() {
    showSlide("description");
    $("#tot-num").html(numTrials);	
  },
  end: function() {
    var gen = getRadioCheckedValue(1, "genderButton");
    var ag = document.age.ageRange.value;
    var lan = document.language.nativeLanguage.value;
    var comm = document.comments.input.value;
    var incomeVal = document.income.incomeRange.value;
    experiment.gender = gen;
    experiment.age = ag;
    experiment.nativeLanguage = lan;
    experiment.comments = comm;
    experiment.income = incomeVal;
    clearForm(document.forms[1]);
    clearForm(document.forms[2]);
    clearForm(document.forms[3]);
    clearForm(document.forms[4]);
    clearForm(document.forms[5]);    
    showSlide("finished");
    setTimeout(function() {turk.submit(experiment) }, 1500);
  },
  next: function() {
    if (numComplete > 0) {
      //var price = 0;//parseFloat(document.price.score.value) + parseFloat(document.price.score1.value) / 100.00;
      
      var probPrice0 = parseInt(document.getElementById("hiddenSliderValue0").value) / 40.00;
      var probPrice1 = parseInt(document.getElementById("hiddenSliderValue1").value) / 40.00;
      var probPrice2 = parseInt(document.getElementById("hiddenSliderValue2").value) / 40.00;
      var probPrice3 = parseInt(document.getElementById("hiddenSliderValue3").value) / 40.00;
      var probPrice4 = parseInt(document.getElementById("hiddenSliderValue4").value) / 40.00;
      var probPrice5 = parseInt(document.getElementById("hiddenSliderValue5").value) / 40.00;
      var probPrice6 = parseInt(document.getElementById("hiddenSliderValue6").value) / 40.00;
//      var probPrice7 = parseInt(document.getElementById("hiddenSliderValue7").value) / 40.00;
//      var probPrice8 = parseInt(document.getElementById("hiddenSliderValue8").value) / 40.00;
//      var probPrice9 = parseInt(document.getElementById("hiddenSliderValue9").value) / 40.00;
      
      
      
      experiment.inferredPrices0[currentTrialNum] = probPrice0;
      experiment.inferredPrices1[currentTrialNum] = probPrice1;
      experiment.inferredPrices2[currentTrialNum] = probPrice2;
      experiment.inferredPrices3[currentTrialNum] = probPrice3;
      experiment.inferredPrices4[currentTrialNum] = probPrice4;
      experiment.inferredPrices5[currentTrialNum] = probPrice5;
      experiment.inferredPrices6[currentTrialNum] = probPrice6;
//      experiment.inferredPrices7[currentTrialNum] = probPrice7;
//      experiment.inferredPrices8[currentTrialNum] = probPrice8;
//      experiment.inferredPrices9[currentTrialNum] = probPrice9;
      
      
      
      experiment.orders[currentTrialNum] = numComplete;
      
      experiment.domains[currentTrialNum] = trial.domain;
      experiment.utterance[currentTrialNum] = trial.utterance;
      experiment.context[currentTrialNum] = trial.context;
      
      
      //experiment.numberTypes[currentTrialNum] = trial.number;
        	
      clearForm(document.forms[0]);
      clearForm(document.forms[1]);
    }
    if (numComplete >= numTrials) {
    	$('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
    	$("#trial-num").html(numComplete);
    	$("#total-num").html(numTrials);
    	showSlide("askInfo");
    } else {
    	$('.bar').css('width', (200.0 * numComplete/numTrials) + 'px');
    	$("#trial-num").html(numComplete);
    	$("#total-num").html(numTrials);
    	currentTrialNum = numComplete;
    	trial = allTrialOrders[shuffledOrder[numComplete]];
//     	currentTrialNum = shuffledOrder[numComplete];
//     	trial = allTrialOrders[currentTrialNum];
    	buyer = trial.buyer;
      showSlide("stage");
      $("#buyer1").html(buyer);
      $("#buyer2").html(buyer);
      $("#buyer3").html(buyer);
      $("#buyer4").html(buyer);
      $("#domain1").html(trial.domain);
      $("#domain2").html(trial.domain);
      $("#domain3").html(trial.domain);
      $("#domain4").html(trial.domain);
      $("#domain5").html(trial.domain);
      $("#domain6").html(trial.domain);
      $("#modifier").html(trial.modifier);
      $("#context").html(trial.context);    
      
      for (var i = 0; i <= 6; i++)
      {         
        $("#people" + i).html(allPeopleNumber[i]);
      }

      /*
      for (var i = 0; i <= 4; i++)
      {
        if ( allPricePoints[i] == trial.utterance )
        {
          currentUtteredPriceSliderIndex = 2*i;
        } 
      }
      
      var currentUtteredPrice;
      if ( trial.number == "round" )
      { currentUtteredPrice = trial.utterance; }
      else
      { 
        currentUtteredPrice = trial.utterance + randomizeSharpOffset();
        currentUtteredPriceSliderIndex = currentUtteredPriceSliderIndex + 1;
      }
      
      
      $("#cost").html(numberWithCommas(currentUtteredPrice));
      var utteredSliderIndexName = "#cost" + currentUtteredPriceSliderIndex;
      $(utteredSliderIndexName).html(numberWithCommas(currentUtteredPrice));
      */
      numComplete++;
      
    }
  }
}

// scripts for sliders
$("#slider0").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider0 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue0').attr('value', ui.value);
                   $("#slider0").css({"background":"#99D6EB"});
                   $("#slider0 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
$("#slider1").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider1 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue1').attr('value', ui.value);
                   $("#slider1").css({"background":"#99D6EB"});
                   $("#slider1 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
$("#slider2").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider2 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue2').attr('value', ui.value);
                   $("#slider2").css({"background":"#99D6EB"});
                   $("#slider2 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
$("#slider3").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider3 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue3').attr('value', ui.value);
                   $("#slider3").css({"background":"#99D6EB"});
                   $("#slider3 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
$("#slider4").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider4 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue4').attr('value', ui.value);
                   $("#slider4").css({"background":"#99D6EB"});
                   $("#slider4 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
$("#slider5").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider5 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue5').attr('value', ui.value);
                   $("#slider5").css({"background":"#99D6EB"});
                   $("#slider5 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});
               
$("#slider6").slider({
               animate: true,
               orientation: "vertical",
               max: 40 , min: 0, step: 1, value: 20,
               slide: function( event, ui ) {
                   $("#slider6 .ui-slider-handle").css({
                      "background":"#E0F5FF",
                      "border-color": "#001F29"
                   });
               },
               change: function( event, ui ) {
                   $('#hiddenSliderValue6').attr('value', ui.value);
                   $("#slider6").css({"background":"#99D6EB"});
                   $("#slider6 .ui-slider-handle").css({
                     "background":"#667D94",
                     "border-color": "#001F29" });
               }});

//$("#slider7").slider({
//               animate: true,
//               orientation: "vertical",
//               max: 40 , min: 0, step: 1, value: 20,
//               slide: function( event, ui ) {
//                   $("#slider7 .ui-slider-handle").css({
//                      "background":"#E0F5FF",
//                      "border-color": "#001F29"
//                   });
//               },
//               change: function( event, ui ) {
//                   $('#hiddenSliderValue7').attr('value', ui.value);
//                   $("#slider7").css({"background":"#99D6EB"});
//                   $("#slider7 .ui-slider-handle").css({
//                     "background":"#667D94",
//                     "border-color": "#001F29" });
//               }});
//
//$("#slider8").slider({
//               animate: true,
//               orientation: "vertical",
//               max: 40 , min: 0, step: 1, value: 20,
//               slide: function( event, ui ) {
//                   $("#slider8 .ui-slider-handle").css({
//                      "background":"#E0F5FF",
//                      "border-color": "#001F29"
//                   });
//               },
//               change: function( event, ui ) {
//                   $('#hiddenSliderValue8').attr('value', ui.value);
//                   $("#slider8").css({"background":"#99D6EB"});
//                   $("#slider8 .ui-slider-handle").css({
//                     "background":"#667D94",
//                     "border-color": "#001F29" });
//               }});
//
//$("#slider9").slider({
//               animate: true,
//               orientation: "vertical",
//               max: 40 , min: 0, step: 1, value: 20,
//               slide: function( event, ui ) {
//                   $("#slider9 .ui-slider-handle").css({
//                      "background":"#E0F5FF",
//                      "border-color": "#001F29"
//                   });
//               },
//               change: function( event, ui ) {
//                   $('#hiddenSliderValue9').attr('value', ui.value);
//                   $("#slider9").css({"background":"#99D6EB"});
//                   $("#slider9 .ui-slider-handle").css({
//                     "background":"#667D94",
//                     "border-color": "#001F29" });
//               }});
//               
//
//$("#slider10").slider({
//               animate: true,
//               
//               max: 40 , min: 0, step: 1, value: 20,
//               slide: function( event, ui ) {
//                   $("#slider10 .ui-slider-handle").css({
//                      "background":"#E0F5FF",
//                      "border-color": "#001F29"
//                   });
//               },
//               change: function( event, ui ) {
//                   $('#hiddenSliderValue10').attr('value', ui.value);
//                   $("#slider10").css({"background":"#99D6EB"});
//                   $("#slider10 .ui-slider-handle").css({
//                     "background":"#667D94",
//                     "border-color": "#001F29" });
//               }});
//
