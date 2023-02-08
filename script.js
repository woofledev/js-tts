//this is for the website, nothing else.
function jst_initsite(){
    for (var i = 0; i < window.speechSynthesis.getVoices().length; i++) {
        var option = document.createElement("option");
        option.text = window.speechSynthesis.getVoices()[i].name;
        option.value = window.speechSynthesis.getVoices()[i].lang;
        document.getElementById('voices').appendChild(option);
    }
}
stat = document.getElementById('status')
function jst_speak(){
    if(speechSynthesis in window){
        stat.innerHTML="sorry, your browser doesn't support speechsynthesis."
    } else {
        var jst_synth = new SpeechSynthesisUtterance();
        jst_synth.text=document.getElementById("textspeech").value
        jst_synth.volume=document.getElementById('vol').value
        jst_synth.pitch=document.getElementById('pitch').value
        jst_synth.rate=document.getElementById('speed').value
        if(document.getElementById('voices').options.length===0){jst_synth.voice=null;}else{jst_synth.voice = window.speechSynthesis.getVoices().filter(function(voice) { 
            return voice.name === document.getElementById('voices').options[document.getElementById('voices').selectedIndex].text;
          })[0]};
          
        window.speechSynthesis.resume()
        window.speechSynthesis.speak(jst_synth);
        stat.innerHTML="synthesizing<br><button onclick='jst_stop()'>stop</button>"
    } 
}
function jst_stop(){
    window.speechSynthesis.cancel();
    stat.innerHTML="stopped synth"
}
function revert_vals(){
    document.getElementById('vol').value=0.7
    document.getElementById('pitch').value=1.0
    document.getElementById('speed').value=1.0
}
jst_initsite()