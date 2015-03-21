$(document).ready(function() {
    $('#next').append("Start");
    //spinner
var spinner = new Spinner().spin();
debrief.appendChild(spinner.el);
//cycle through entire set of images, display, get ratings, add to array
ratings=[];
filesLoaded=0;
filesToLoad=10;
var sound1 = {number:0,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound2 = {number:1,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound3 = {number:2,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound4 = {number:3,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound5 = {number:4,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",owel:"AH",variant:"UH"};
var sound6 = {number:5,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound7 = {number:6,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound8 = {number:7,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound9 = {number:8,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};
var sound10 = {number:9,name:'Bill_northern_bus_auto_spliced.wav',speaker:"Bill",word:"BUS",vowel:"AH",variant:"UH"};

var soundfiles = [loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav'),
  loadAudio('audio/Bill_northern_bus_auto_spliced.wav')]
//array of audio stimuli
var sounds =[sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8,sound9,sound10];
var nsounds=sounds.length;

i=0;
$("#next").click(function(){
  console.log("click!");

  if (i>0){
//here is where the cycling happens
response=logResponse();
ratings.push(response);
console.log(ratings);
if (i<nsounds){
///add form contents to array of responses
playSound(soundfiles[sounds[i].number],10)
i++;
} else {
sessvars.soundRatings=ratings;
window.location.replace("exit.html")
}
}

if (i==0){
            $('#next').empty();
      $('#next').append("Next");
playSound(soundfiles[sounds[i].number],10);
i++
}

    });



function logResponse(){
//get slider values
var word = $('input[name=word]').val();
var quality = $('input[name=quality]').val();
var comments =$('input[name=comments]').val();
if(word==""|word==undefined){
    word="NA";
}
if(comments==""|comments==undefined){
    comments="NA";
}
var file = sounds[i-1].name;
return([file,word,quality,comments]);
}


function playSound(sound,delay){
setTimeout(function() {sound.play(); }, delay)
}


//display text
function setText(sound){
  var text=sound.word;
$("#textbox").empty();
$("#textbox").append("<h1>"+text+"</h1>");
}
//Functions for preloading of images and audio
function loadImage(uri)
{
    var img = new Image();
    img.onload = isAppLoaded;
    img.src = uri;
    return img;
}

function loadAudio(uri)
{
    var audio = new Audio();
    audio.addEventListener('canplaythrough', isAppLoaded, false); 
    audio.src = uri;
    return audio;
}

function isAppLoaded()
{
    filesLoaded++;
    console.log(filesLoaded);
    if (filesLoaded >= filesToLoad){
      console.log("loaded")
      spinner.stop();
    };
}
});
