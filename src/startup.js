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

function mathMod(a, b) {
    var res = a%b;
    if (res < 0) {
	return res + abs(b);
    } else {
	return res;
    }
}

function songToNotes(song, currentTime) {
    var stack = [[song, 0, 0]];
    var notes = [];
    while(stack.length > 0) {
	var ctuple = stack.pop();
	
	var current = ctuple[0];
	var time = ctuple[1];
	var duration = ctuple[2];
	if(currentTime < 1) {
	    console.log(current);
	}
	
	if (current.type == "song") {
	    for (var index = 0; index < current.children.length; index += 1) {
		stack.push([current.children[index](), time+current.time, current.duration]);
	    }
	} else { // note type
	    if (time <= currentTime && time+duration > currentTime) {
		notes.push(current);
	    }
	}
    }
    return notes;
}

function update(state, song, time) {
    var notes = songToNotes(song, time);
    
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
    return Function('update', 'getTime', 'makeInitialState', 'mathMod', '"use strict";' + javascriptCode)(
        update, getTime, makeInitialState, mathMod
    );
});

window.onscroll = function() {
    app.ports.scrollChange.send({xpos: document.documentElement.scrollLeft,
				 ypos: document.documentElement.scrollTop});
};


