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


window.onload = function() {
  monoSynth.triggerAttackRelease("C2", "8n");
  Tone.Master.volume.rampTo(0, 0.05);

};
