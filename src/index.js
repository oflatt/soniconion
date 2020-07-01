import Tone from '../node_modules/tone/Tone/index.js';

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
    return  {synths : [], tickCounter : 0, lastFpsUpdate : 0};
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

function onTick(state) {
    state.tickCounter += 1;
    if (getTime() > 1 + state.lastFpsUpdate) {
	app.ports.fpsChange.send({'fps' : state.tickCounter});
	state.lastFpsUpdate = getTime();
	state.tickCounter = 0;
    }
}

function cleanup(state) {
    for(var i = 0; i < state.synths.length; i++) {
	state.synths[i].dispose();
    }
}

function sleep(duration) {
  window.asyncRun.pauseImmediate(() => {
    window.setTimeout(() => window.asyncRun.continueImmediate({ type: 'normal', value: undefined }), duration);
  });
}

function runNew(javascriptCode) {
    const state = makeInitialState();
    window.runningState = state;
    
    window.asyncRun = stopify.stopifyLocally(javascriptCode,
					     {}, {
						 estimator: "exact",
						 yieldInterval: 50});
    window.asyncRun.g = {console, window, Tone, onTick, update, getTime, state, mathMod, document, window, app
			 ,Object, Math, Date, songToNotes, sleep};
    window.asyncRun.run(() => {});
    window.runLock = false;
    app.ports.runningChange.send({'running' : true});
}

window.asyncRun = false;
window.runLock = false;
window.runningState = false;
app.ports.evalJavascript.subscribe(function(javascriptCode) {
    if(window.runLock) {
	return;
    }
    
    const oldState = window.runningState;
    if(window.asyncRun) {
	window.runLock = true;
	window.asyncRun.pause(() => {
	    cleanup(oldState);
	    runNew(javascriptCode);
	});
    } else {
	runNew(javascriptCode);
    }
});

app.ports.stopJavascript.subscribe(function() {
    if(window.runLock) {
	return;
    }

    const oldState = window.runningState;
    if(window.asyncRun) {
	window.runLock = true;
	window.asyncRun.pause(() => {
	    cleanup(oldState);
	    window.asyncRun = false;
	    app.ports.runningChange.send({'running' : false});
	    window.runLock = false;
	});
    }
});



window.onscroll = function() {
    app.ports.scrollChange.send({xpos: document.documentElement.scrollLeft,
				 ypos: document.documentElement.scrollTop});
};


