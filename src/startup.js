var app = Elm.Main.init({
    node: document.getElementById('elm'),
    flags: {innerWindowWidth : window.innerWidth,
    innerWindowHeight : window.innerHeight,
    outerWindowWidth : window.outerWidth,
    outerWindowHeight : window.outerHeight}
    });

document.addEventListener("mousemove", onMouseMove)

function onMouseMove(event) {
    window.mouseXPos = event.clientX;
    window.mouseYPos = event.clientY;
}

// a note object has a frequency field, and nothing else

// a synth array is an array of currently playing synths- play indefinately without intervention
function makeInitialState(stackIn) {
    return  {synths : []};
}

function getTime() {
    return (new Date()).getTime()/1000;
}

function update(state, notes) {
    for(var i = 0; i < notes.length; i++) {
	if (state.synths.length <= i) {
	    var newSynth = new Tone.Synth().toMaster();
	    newSynth.triggerAttack(notes[i].frequency);
	    state.synths.push(newSynth);
	} else {
	    state.synths[i].setNote(notes[i].frequency);
	}
    }
    if(state.synths.length > notes.length) {
	for(var i = notes.length; i < state.synths.length; i++) {
	    state.synths[i].dispose();
	}
	state.synths = state.synths.slice(0, notes.length);
    }
}



app.ports.evalJavascript.subscribe(function(javascriptCode) {
    return Function('update', 'getTime', 'makeInitialState', '"use strict";' + javascriptCode)(
        update, getTime, makeInitialState
    );
});


// example program
function exampleCompiledProgram() {
    var startTime = getTime();
    function step(state){
	var stack = [];
	var notes = [];
	var time = getTime();

	// sine 1
	var myEnd = startTime+2;
	stack.push(myEnd);
	if(time > startTime && time < myEnd) {
	    notes.push({frequency: 440});
	}


	update(state, notes);
	function recur() {
	    step(state);
	}
	window.requestAnimationFrame(recur);
    }

    step(makeInitialState());
}
