
/// SETUP OSC ///
var monoSynth = new Tone.MonoSynth({

    "filterEnvelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    },
    oscillator:{
      type:"sine"
    }
}).toMaster();

/// INIT FX ///
var pingPong = new Tone.PingPongDelay("16n", 0.5).toMaster();
var freeverb = new Tone.Freeverb({ "wet": 0 }).toMaster();
var phaser = new Tone.Phaser({
	"frequency" : 150,
	"octaves" : 5,
	"baseFrequency" : 1000
}).toMaster();
var autoWah = new Tone.AutoWah(50, 6, -30).toMaster();

/// connect to synth ///
monoSynth.connect(pingPong);
monoSynth.connect(freeverb);
monoSynth.connect(autoWah);


Tone.Master.volume.rampTo(0, 0.05);
console.log(monoSynth.filter.get());
console.log(monoSynth.filter.get());

nx.onload = function() {
  nx.colorize("#00CCFF"); // sets accent (default)

  initControls();

  //event listeners
  /// FLT ///
  chrs.on("*", function(data){


  });

  /// RVB ///
  tabs1.on("*", function(data){

    monoSynth.oscillator.set({type: data.text});

  });


  /// RVB ///
  rvbAmt.on("*", function(data){
    freeverb.set({wet: data.value});

  });

  /// RVB ///
  dlyAmt.on("*", function(data){
    pingPong.set({wet: +data.value});

  });
  /// ADSR ///
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

var initControls = function(){

  //VCO
  tabs1.options = ['sine','sawtooth','square'];
  tabs1.choice = 2;
  tabs1.init();
  tabs1.draw();

  //fltr
  chrs.set({value:0});

  //ADSR
  attack.set({value:0.02});
  decay.set({value:0.10});
  sustain.set({value:0.20});
  release.set({value:0.9});

  pingPong.set("wet",0);

};
var convertMIDI = function(noteNum){

  var octave = Math.floor((noteNum / 12) - 1);
  var note = "C C#D D#E F F#G G#A A#B ".substr((noteNum % 12) * 2, 2);
  var result = note+octave;

  return result.replace(/\s/g, '');
};
