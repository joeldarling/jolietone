/// SETUP OSC ///
var monoSynth = new Tone.MonoSynth({
    "filter" : {
        "type" : "lowpass",
        "Q" : 7
    },
    "filterEnvelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    }
}).toMaster();

Tone.Master.volume.rampTo(0, 0.05);

nx.onload = function() {
  nx.colorize("#00CCFF"); // sets accent (default)


  attack.on("*", function(data){
    monoSynth.filterEnvelope.attack = data.value;
  });
  decay.on("*", function(data){
    monoSynth.filterEnvelope.decay = data.value;
  });
  sustain.on("*", function(data){
    monoSynth.filterEnvelope.sustain = data.value;
  });
  release.on("*", function(data){
    monoSynth.filterEnvelope.release = data.value;
  });
  keyboard.on("*", function(data){
    console.log(convertMIDI(data.note))
    if(data.on > 0)
      monoSynth.triggerAttackRelease(convertMIDI(data.note), "4n");

  });


};

var convertMIDI = function(noteNum){

  var octave = Math.floor((noteNum / 12) - 1);
  var note = "C C#D D#E F F#G G#A A#B ".substr((noteNum % 12) * 2, 2);
  var result = note+octave;

  return result.replace(/\s/g, '');
};
