$(document).ready(function() {

//php call to get the image names
var myVariable=""
get_files();
exp=function(myVariable){
    console.log(myVariable)
    myVariable=myVariable.split(',')
    images=getjpg(myVariable)
    console.log(images);
    var l=images.length;
    console.log(l);
                        var imagefiles=[];
                        for (i=0;i<l;i++){
                          var path="images/Candidates/"
                          var name=images[i]
                          var toLoad=path.concat(name)
                          var im={number:i,name:toLoad}
                          console.log(im);
                          imagefiles.push(im)}
    console.log(imagefiles)
    //cycle through entire set of images, display, get ratings, add to array
ratings=[];
var currentImage = "";
images=shuffle(imagefiles);
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
var image_gen = $('input[name=gender]').val();
var image_age = $('input[name=age]').val();
var image_edu = $('input[name=edu]').val();
var image_job = $('input[name=job]').val();
var image_york = $('input[name=york]').val();
var image_attr = $('input[name=attr]').val();
var file = $("#topleftimg").attr("src")
return([file,image_gen,image_age,image_edu,image_job,image_york,image_attr]);
}
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
    console.log("Loaded")
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
function getjpg(array){
   var l=array.length;
   var out =[];
   for (var w =0;w<l;w++){
    if(array[w].indexOf("jpg")>0){
        var item=array[w].replace('"',"")
        item=item.replace('"',"")
        item=item.replace('[',"")
        item=item.replace(']',"")
        out.push(item)
    }
   }
   return(out)
}

function get_files(){
    $.ajax({
               type: "GET",
               url: "http://blake.ling.ed.ac.uk/~s1122689/get_filelist.php",
               cache: false,
               success: function(result){
                     var myVariable=result;
                    console.log(myVariable)
                    exp(myVariable);
                }
          });
}

});

