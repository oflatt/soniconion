//import defaultExport from "Tone.js"

var synth = null;

function process_notes() {
	synth = new Tone.Synth().toMaster();

	function triggerSynth(time) {
		synth.triggerAttackRelease('C2', '8n', time);
	}

	Tone.Transport.schedule(triggerSynth, 0);
	Tone.Transport.schedule(triggerSynth, '0:2');
	Tone.Transport.schedule(triggerSynth, '0:2:2.5');

	Tone.Transport.loopEnd = '1m';
	Tone.Transport.loop = true;

	Tone.Transport.start();

	//if(notes.type == "note") {
		//
	//}
};

var app = Elm.Main.init({
    node: document.getElementById('elm'),
    flags: {innerWindowWidth : window.innerWidth,
    innerWindowHeight : window.innerHeight,
    outerWindowWidth : window.outerWidth,
    outerWindowHeight : window.outerHeight}
    });


app.ports.testprint.subscribe(function(data) {
	console.log("got msg");

	//var synth = new Tone.Synth().toMaster();

	process_notes();
	//function triggerSynth(time) {
	//	synth.triggerAttackRelease('C2', '8n', time);
	//}

	//Tone.Transport.schedule(triggerSynth, 0);
	//Tone.Transport.schedule(triggerSynth, '0:2');
	//Tone.Transport.schedule(triggerSynth, '0:2:2.5');

	//Tone.Transport.loopEnd = '1m';
	//Tone.Transport.loop = true;

	//Tone.Transport.start();
});

function tone_init() {
	//synth = new Tone.Synth().toMaster();
	console.log('init');
}
tone_init();


//app.ports.notes.subscribe(function(data) {
//});

