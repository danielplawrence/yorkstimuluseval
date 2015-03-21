$(document).ready(function() {
   
   console.log(sessvars.soundRatings);
   outarray=sessvars.soundRatings;
   totaln=outarray.length;

///////////////////////////////////////////////////////////////////////////////////////////


$(function() {
    $( "#datepicker" ).datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "-80:-18",
    });
  });

//Send data to server/////////////////////////////////////////////////////////////////////
$("#send").click(function(){
       partData=$("#form1").serializeArray();
       console.log(partData);
       console.log(sessvars.soundRatings);
       biolength=partData.length;
       for (i=0;i<biolength;i++){
        if(partData[i].value==""){partData[i].value="NA"};
        partData[i].value=partData[i].value.replace(/,/g, "-");
       }
       var biodata=partData[0].value+","+partData[1].value+","+partData[2].value+","+partData[3].value+","+partData[4].value;
       for (i=0;i<totaln;i++){
      outarray[i]= outarray[i]+","+biodata+"\r\n";}
      output=","+outarray.toString();
      sessvars.output=output;
      console.log(output);
      window.location.replace("debrief.html");
       


       //$.post("http://blake.ppls.ed.ac.uk/~s1122689/script.php",
//    {
 //       inputData: output
 //   },
 //   function(data, status){
  //      alert("Data: " + data + "\nStatus: " + status);
  //  });
//return(false);
////////////////////////////////////////////////////////////////////////////////////////////
});
});

