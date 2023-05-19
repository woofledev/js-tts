stat = document.getElementById('status')
function jst_init(){
    //get voices
    for (var i = 0; i < window.speechSynthesis.getVoices().length; i++) {
        var option = document.createElement("option");
        option.text = window.speechSynthesis.getVoices()[i].name;
        option.value = window.speechSynthesis.getVoices()[i].lang;
        document.getElementById('voices').appendChild(option);
    }
    console.log("got voices");
}
function jst_speak(){
    if('speechSynthesis' in window){
        var jst_synth = new SpeechSynthesisUtterance();
        jst_synth.text=document.getElementById("textspeech").value
        jst_synth.volume=document.getElementById('vol').value
        jst_synth.pitch=document.getElementById('pitch').value
        jst_synth.rate=document.getElementById('speed').value
        if(document.getElementById('voices').options.length===0){jst_synth.voice=null;}else{jst_synth.voice = window.speechSynthesis.getVoices().filter(function(voice) { 
            return voice.name === document.getElementById('voices').options[document.getElementById('voices').selectedIndex].text;
        })[0]};
        console.log(`jst_synth config: volume ${jst_synth.volume}, pitch ${jst_synth.pitch}, rate ${jst_synth.rate}, voice ${jst_synth.voice}`);
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(jst_synth);
        console.log("requested speechSynthesis to speak");
        stat.innerHTML="speaking<br><button onclick='jst_stop()' title='..or press c'>stop</button>";
    } else {
        stat.innerHTML="sorry, but your browser doesn't support the speechsynthesis api.";
    } 
}
function jst_stop(){
    window.speechSynthesis.cancel();
    console.log("cancelled speechsynthesis for window");
    stat.innerHTML="stopped synth";
}
function revert_vals(){
    document.getElementById('vol').value=0.7
    document.getElementById('pitch').value=1.0
    document.getElementById('speed').value=1.0
}

// shortcuts
document.addEventListener("keydown", function(e) { if (e.target.nodeName !== "TEXTAREA") { switch (e.key) {case "s":jst_speak();break;case "c":jst_stop();break;default:break;}}});
// url parameter thing (?text=some+text)
if(new URLSearchParams(window.location.search).get('text')){document.getElementById("textspeech").value=new URLSearchParams(window.location.search).get('text')}
jst_init()