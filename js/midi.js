/// SETUP MIDI ///
var NOTE_ON = 144;
var NOTE_OFF = 128;

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {

  var midi = midiAccess; // raw MIDI data, inputs, outputs

  var inputs = midi.inputs.values();

  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      // each time there is a midi message call the onMIDIMessage function
      input.value.onmidimessage = onMIDIMessage;

  }

  midi.onstatechange = onStateChange;
}

function onStateChange(message){
  console.log('message', message)
}

function onMIDIMessage(message) {
    var data = message.data; // this gives us our [command/channel, note, velocity] data.
    var type = data[0] & 0xf0; // channel agnostic message type. Thanks, Phil Burk.
    var note = data[1];
    var vel = data[2];

    if(type === NOTE_ON && vel > 0){
      playNote(convertMIDI(note), vel);

      midiStatus.set({value: 1});

    } else {
      stopNote();

      midiStatus.set({value: 0});

    }
}

function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}
