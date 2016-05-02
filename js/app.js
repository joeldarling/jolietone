/// SETUP OSC ///
var monoSynth = new Tone.MonoSynth({

    "filterEnvelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    },
    oscillator:{
    type:"sawtooth"
    }
}).toMaster();

var pingPong = new Tone.PingPongDelay("16n", 0.8).toMaster();
var freeverb = new Tone.Freeverb().toMaster();

console.log(monoSynth);

//monoSynth.connect(freeverb);

Tone.Master.volume.rampTo(0, 0.05);

nx.onload = function() {
  nx.colorize("#00CCFF"); // sets accent (default)


  filter.on('*', function(data){
    monoSynth.filter.frequency = data.value;

  });
  attack.on("*", function(data){
    monoSynth.envelope.attack = data.value;
  });
  decay.on("*", function(data){
    monoSynth.envelope.decay = data.value;
  });
  sustain.on("*", function(data){
    monoSynth.envelope.sustain = data.value;
  });
  release.on("*", function(data){
    monoSynth.envelope.release = data.value;
  });
  keyboard.on("*", function(data){
    if(data.on > 0)
      monoSynth.triggerAttack(convertMIDI(data.note));
    else
      monoSynth.triggerRelease();
  });


};

var convertMIDI = function(noteNum){

  var octave = Math.floor((noteNum / 12) - 1);
  var note = "C C#D D#E F F#G G#A A#B ".substr((noteNum % 12) * 2, 2);
  var result = note+octave;

  return result.replace(/\s/g, '');
};
