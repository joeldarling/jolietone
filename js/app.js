
/// SETUP OSC ///
var monoSynth = new Tone.MonoSynth({

    "filterEnvelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    },
    filter: {
      type: 'lowpass'
    },
    oscillator:{
      type:"sine"
    }
}).toMaster();

var monoSynth = new Tone.MonoSynth().toMaster();

/// INIT FX ///
var pingPong = new Tone.PingPongDelay("16n", 0.5).toMaster();
var freeverb = new Tone.Freeverb({ "wet": 0 }).toMaster();
var distort = new Tone.Distortion(0.8).toMaster();

/// connect to synth ///
monoSynth.connect(pingPong);
monoSynth.connect(freeverb);
monoSynth.connect(distort);

//set initial volume
Tone.Master.volume.rampTo(-10, 0.05);

nx.onload = function() {
  nx.colorize("#212121"); // sets accent (default)

  initControls();

  //event listeners
  /// VCO ///
  tabs1.on("*", function(data){

    if(data.text==='saw')
      data.text = 'sawtooth';
    monoSynth.oscillator.set({type: data.text});

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

  /// FLTR ///
  dist.on("*", function(data){

    if (+data.value === 1) {
      console.log('enable', distort.get());
      distort.set({wet: 1});
      console.log('enable', distort.get());

    } else{
      console.log('disnable', distort.get());

      distort.set({wet: 0});
      console.log('disnable', distort.get());


    }
  });

  /// RVB ///
  rvbAmt.on("*", function(data){
    freeverb.set({wet: data.value});

  });

  /// DLY ///
  dlyAmt.on("*", function(data){
    pingPong.set({wet: data.value});

  });

  /// VCA ///
  volume.on("*", function(data){
    Tone.Master.volume.rampTo(+data.value, 0.05);
  });

  //KBD
  keyboard.on("*", function(data){
    if(data.on > 0)
      monoSynth.triggerAttack(convertMIDI(data.note));
    else
      monoSynth.triggerRelease();
  });


};

var initControls = function(){

  //VCO
  tabs1.options = ['sine','saw','square'];
  tabs1.choice = 0;
  tabs1.init();
  tabs1.draw();

  //fltr
  distort.set("wet", 0);

  //VCA
  volume.set({value:-10, label: false});

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
