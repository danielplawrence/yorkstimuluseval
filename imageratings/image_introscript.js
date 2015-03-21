$(document).ready(function() {
	
$("#continue").click(function(){
  console.log("click!");
window.location.replace("imageratings.html");
return(false);
    });

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

});