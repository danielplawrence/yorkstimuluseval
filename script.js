$(document).ready(function() {
//click function for starting instructions//
//when clicked, start experiment

var spinner = new Spinner().spin();
expinstructions.appendChild(spinner.el);
//declare global variables
var t= new Date();
var trialinfo= [];
var soundinfo=[];
var played=0;
//initialize output array
output= new String;
user="Daniel";
var stime=$.now();
filesLoaded = 0;
filesToLoad = 8;
//image stimuli
var image1 = {number:0,name:"images/M_Y_MC_L.png",age:"Y",gender:"M",soc:"M",loc:"L"};
var image2 = {number:1,name:"images/M_O_MC_L.png",age:"O",gender:"M",soc:"M",loc:"L"};
var image3 = {number:2,name:"images/M_Y_WC_L.png",age:"Y",gender:"M",soc:"W",loc:"L"};
var image4 = {number:3,name:"images/M_O_WC_L.png",age:"O",gender:"M",soc:"W",loc:"L"};
var image5 = {number:4,name:"images/M_Y_MC_NL.png",age:"Y",gender:"M",soc:"M",loc:"N"};
var image6 = {number:5,name:"images/M_O_MC_NL.png",age:"O",gender:"M",soc:"M",loc:"N"};
var image7 = {number:6,name:"images/M_Y_WC_NL.png",age:"Y",gender:"M",soc:"W",loc:"N"};
var image8 = {number:7,name:"images/M_O_WC_NL.png",age:"O",gender:"M",soc:"W",loc:"N"};

var imagefiles = [loadImage("images/M_Y_MC_L.png"),
loadImage("images/M_O_MC_L.png"),
loadImage("images/M_Y_WC_L.png"),
loadImage("images/M_O_WC_L.png"),
loadImage("images/M_Y_MC_NL.png"),
loadImage("images/M_O_MC_NL.png"),
loadImage("images/M_Y_WC_NL.png"),
loadImage("images/M_O_WC_NL.png")]

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
//array of visual stimuli
var images =[image1,image2,image3,image4,image5,image6,image7,image8];
var nimages=images.length;
//array of audio stimuli
var sounds =[sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8,sound9,sound10];
var nsounds=sounds.length;

//experimental design////////////////////////////////////////////////////////
//older, choose class and localness
var trial1 ={images:[image2,image4,image6,image8],constant:"age",value:"O",sound:""};
//younger, choose class and localness
var trial2= {images:[image1,image3,image5,image7],constant:"age",value:"Y",sound:""}
//wc,choose age and localness
var trial3={images:[image3,image4,image7,image8],constant:"soc",value:"W",sound:""};
//mc,choose class and localness
var trial4={images:[image1,image2,image5,image6],constant:"soc",value:"M",sound:""};
//local, choose age/class
var trial5={images:[image1,image2,image3,image4],constant:"loc",value:"L",sound:""};
//n local, choose age/class
var trial6={images:[image5,image6,image7,image8],constant:"loc",value:"N",sound:""};
var trials=[trial1,trial2,trial3,trial4,trial5,trial6];
var ntrials=trials.length;
///////////////////////////////////////////////////////////////////////////
//each trial set needs to appear with each stimulus item yielding 60 basic trials
//sound can be included as part of the trial object
//this loop creates ntrials*nsounds trials with each sound added to each combination
var items=[];
var itemnames=[];
for (j=0;j<nsounds;j++){
  var soundn=j+1;
    for (k=0;k<ntrials;k++){
          var trialn=k+1;
          var trial_name=["trial",soundn*trialn].join('');
           window[trial_name]=trials[k];
           window[trial_name].sound=sounds[j];
            items.push(window[trial_name]);
            itemnames.push(trial_name);
        }
}

var itemslength=items.length;
console.log(itemnames);

items=shuffle(items);
function experiment(){

$("#expinstructions").click(function(){
$("#topleft").zIndex(1);
$("#bottomleft").zIndex(1);
$("#bottomright").zIndex(1);
$("#topright").zIndex(1);
$("#textbox").zIndex(1);
$("#instext").remove();
$("#expinstructions").zIndex(-2);

present();
});

//loop through array and present items
//function to set an image
function changeImage(target,source){
  $(target).empty();
	$(target).append(source);
}
//function to set a trial
function setTrial(trial){
trial=shuffle(trial);
changeImage("#topleft",imagefiles[trial.images[0].number]);
changeImage("#topright",imagefiles[trial.images[1].number]);
changeImage("#bottomleft",imagefiles[trial.images[2].number]);
changeImage("#bottomright",imagefiles[trial.images[3].number]);                     
setText(trial.sound);
  playSound(soundfiles[trial.sound.number],500);
}
 //Keypress detection
 //temp var for logging trials
var i=0;
////set up first trial
function present(){
  //get the time
  t=new Date();
  trialinfo= [items[i].constant,items[i].value];
 soundinfo=[items[i].sound.name,items[i].sound.speaker,items[i].sound.vowel,items[i].sound.variant];
    setTrial(items[i]);

}



$(document).keydown(function(event) {
  if (played==1){
  var keycode = (event.keyCode ? event.keyCode : event.which);
if (keycode==69|keycode==68|keycode==73|keycode==74|keycode==13){

  //log trial ouput
  var info=[user,t,i];

  var keycode = (event.keyCode ? event.keyCode : event.which);
  console.log(keycode);
  console.log(i);
  var ans= getResponse(keycode);

  var thistrial_output=ans.concat(trialinfo);
  thistrial_output=thistrial_output.concat(soundinfo);
  thistrial_output=info.concat(thistrial_output);

  console.log("This trial data:" + thistrial_output);
  thistrial_output=thistrial_output.toString();
    console.log("This trial data as string:" + thistrial_output);
  thistrial_output+="\r\n";
  console.log("This trial data as string with newline:" + thistrial_output);
  output=output.concat(thistrial_output);

  i++
if (i>=itemslength){
	//this will eventually be where we terminate the experiment.
window.location.replace("imageratings.html");
  sessvars.myObj=output;
} else {
  present();
}
}
}
});

//work out which image was being displayed, log it to array of responses
function getResponse(key){
  
time=stime;
stime=$.now();
var rtime=stime-time;
//get the source of all images
var tl = $("#topleft").children().attr("src");
var tr = $("#topright").children().attr("src");
var bl = $("#bottomleft").children().attr("src");
var br = $("#bottomright").children().attr("src");

//work out which one was selected
if (key==69){var sel=tl;}
if (key==68){var sel=bl;}
if (key==73){var sel=tr;}
if (key==74){var sel=br;}
if (key==13){window.location.replace("imageratings.html");}
console.log("Selected "+sel);
var obj = images.filter(function ( obj ) {
    return obj.name === sel;
})[0];
if (undefined!=obj){
return([obj.name,obj.gender,obj.age,obj.soc,obj.loc,rtime,tl,bl,tr,br]);
} else {
	return([]);
}

}

}
//Fischer-yates shuffle
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
//Play a sound -- takes my sound objects as input
function playSound(sound,delay){
played=0;
setTimeout(function() {sound.play(); }, delay)
}

function playedSound(){
stime=$.now();
played=1;
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
    audio.addEventListener('ended', playedSound);
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
      sessvars.images=images;
      experiment();
    };
}
});
