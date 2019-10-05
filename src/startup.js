var app = Elm.Main.init({
    node: document.getElementById('elm'),
    flags: {innerWindowWidth : window.innerWidth,
    innerWindowHeight : window.innerHeight,
    outerWindowWidth : window.outerWidth,
    outerWindowHeight : window.outerHeight}
    });


app.ports.testprint.subscribe(function(data) {
	console.log("got msg");
});

function process_notes(data, time) {
	var end_time = time;
	if(data.type == "note") {
		var synth = new Tone.Synth().toMaster();
		Tone.Transport.schedule(
				function(s_time) {
					console.log(data.frequency, data.duration, s_time);
					synth.triggerAttackRelease(data.frequency, data.duration, s_time);},
				time);
		end_time += parseInt(data.duration);
	}
	else if(data.type == "inorder") {
		for(note in data.notes) {
			end_time = process_notes(data.notes[note], end_time);
		}
	}
	else if(data.type == "together") {
		for(note in data.notes) {
			var elapsed = process_notes(data.notes[note], time);
			if(end_time < elapsed) {
				end_time = elapsed;
			}
		}
	}

	return end_time;
};

app.ports.runSound.subscribe(function(msg) {
	//console.log(msg);

	Tone.Transport.stop();
	Tone.Transport.cancel();
	process_notes(msg, 0);
	Tone.Transport.start("+0", "0");
});

