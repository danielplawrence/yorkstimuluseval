$(document).ready(function() {
//cycle through entire set of images, display, get ratings, add to array
ratings=[];
var currentImage = "";
var image1 = {number:0,name:"images/M_Y_MC_L.png",age:"Y",gender:"M",soc:"M",loc:"L"};
var image2 = {number:1,name:"images/M_O_MC_L.png",age:"O",gender:"M",soc:"M",loc:"L"};
var image3 = {number:2,name:"images/M_Y_WC_L.png",age:"Y",gender:"M",soc:"W",loc:"L"};
var image4 = {number:3,name:"images/M_O_WC_L.png",age:"O",gender:"M",soc:"W",loc:"L"};
var image5 = {number:4,name:"images/M_Y_MC_NL.png",age:"Y",gender:"M",soc:"M",loc:"N"};
var image6 = {number:5,name:"images/M_O_MC_NL.png",age:"O",gender:"M",soc:"M",loc:"N"};
var image7 = {number:6,name:"images/M_Y_WC_NL.png",age:"Y",gender:"M",soc:"W",loc:"N"};
var image8 = {number:7,name:"images/M_O_WC_NL.png",age:"O",gender:"M",soc:"W",loc:"N"};
var images =[image1,image2,image3,image4,image5,image6,image7,image8];

console.log(images);
images=shuffle(images);
console.log(images);
i=0;
nimages=images.length;
$("#next").click(function(){
  console.log("click!");

  if (i>0){
//here is where the cycling happens
response=logResponse();
ratings.push(response);
console.log(ratings);
if (i<nimages){
///add form contents to array of responses
changeImage("#topleftimg",images[i]);
i++;
} else {
sessvars.imageRatings=ratings;
window.location.replace("image_exit.html")
}
}

if (i==0){
changeImage("#topleftimg",images[i]);
i++}

    });

$("#next").trigger("click");

function logResponse(){
//get slider values
var image_age = $('input[name=age]').val();
var image_soc = $('input[name=soc]').val();
var image_loc = $('input[name=loc]').val();
var image_rating = $('input[name=age]').val();
var image_net = $('input[name=net]').val();
var file = $("#topleftimg").attr("src")
return([file,currentImage.age, currentImage.gender, currentImage.soc, currentImage.loc,image_age,image_soc,image_loc,image_rating,image_net]);
}


//change the image
function changeImage(target,source){
	$(target).attr("src",source.name);
    currentImage=source;
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
    if (filesLoaded >= filesToLoad){console.log("loaded")};
}


//randomization function
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
//slider listener


});