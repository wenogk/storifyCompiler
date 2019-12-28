
let pathId=1;
let prevPath=1;
let end=false;
let OBJ;
const STARTERS = ["#","question:","option:","ref[","video:"] // #, question, option, ref, video

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
function isText(textVal) {
  let bool = true;
  STARTERS.forEach((e) => {
    if(textVal.startsWith(e)) {
      bool = false;
    }
  });
  return bool;
}

function cleanLines(array) {
  return array.filter((val) => {
    if(val=="") {
      return false;
    } else {
      return true;
    }
  });
}

function compiler() {
  let lines = addslashes($('#writingPad').val()).split('\n');
  lines = cleanLines(lines)
  let sep = STARTERS[0];
  let currentID = 1;
  let optionID = 1;
  obj = {}
  for(let i = 0;i < lines.length;i++){
    if(lines[i].startsWith(sep)) {
      if( i+1 < lines.length) { i = i+1; }
      let newEntry = {}
      let text = "";
      let question = "";
      let options = []
      let videoID = "";
      while(!lines[i].startsWith(sep)) {
        if(isText(lines[i])) {
            text+=lines[i];
        } else if (lines[i].startsWith(STARTERS[1])) { //if question
            question = lines[i].substring(9).trim()
        } else if (lines[i].startsWith(STARTERS[2])) { //if option:
          optionID+=1
           options.push({
             value: lines[i].substring(7).trim(),
             id: optionID
           })
        } else if(lines[i].startsWith(STARTERS[4])) { // if video:
          videoID = lines[i].substring(7).trim()
        }
        if(( i+1 < lines.length)&&(!lines[i+1].startsWith(sep))) { i = i+1; } else { break; }
      }
      if(text!="") {
        newEntry["text"] = text.trim();
      }
      if(question!="") {
        newEntry["question"] = {
          value : question,
          options: options
        }
      }
      if(videoID!="") {
        newEntry["video"] = {
          youtubeID : videoID,
        }
      }
      obj[currentID] = newEntry;
      currentID+=1;
    }
  }
  console.log(JSON.stringify(obj))
  $("#jsonCode").text(JSON.stringify(obj, null, "\t"));
  $("#jsonCodeContainer").show()
  $("#storyContainer").hide()
  OBJ = obj;
  //loadPath(1)
}

// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF
// UI STUFF

function YouTubeGetID(url){ //from https://gist.github.com/takien/4077195
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

function loadPath(idVal) {
   let item = OBJ[idVal];

   if(item.video!=null) {
     let code = "<div class='text-center' style='width:100%'><iframe width='560' height='315' src='https://www.youtube.com/embed/" + YouTubeGetID(item.video.youtubeID) +"?controls=0&autoplay=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><br/>"
     if(item.text!=null) {
       code+= item.text
     }
     $("#bookText").html(code);
   } else {
     if(item.text!=null) {
       $("#bookText").html(item.text);
     }
   }
   if(item.question==null) {
       $("#bookQuestion").html("<em>You've reached the end of the path.</em><br/> <br/><button class='btn btn-info btn-lg btn-block' onclick='loadPath(1)'>Restart story</button><br/><br/><button class='btn btn-warning btn-lg btn-block' onclick='loadPath(" + (prevPath) +")'>Go Back One Path</button>");
   } else {
     $("#bookQuestion").html("<em>" + item.question.value +"</em><br /><br/>");
     for (let j = 0; j < item.question.options.length; j++){
         $("#bookQuestion").append("<button class='btn btn-primary btn-lg btn-block' onclick='loadPath(" + item.question.options[j].id +")''>" + item.question.options[j].value + "</button><br/><br/>");
     }
     prevPath=idVal;
   }

pathId=idVal;
}
function showStory() {
  $("#storyContainer").show();
  loadPath(1)
    $("#storyContainer").get(0).scrollIntoView();
}


$('#result').addClass('show');


function helper() {
    var sep = "#";
    var counter=1;
    var textareaVal=$('#writingPad').val();
    var lines = $('#writingPad').val().split('\n');
    var optionStack = [];
    var currentQ="";
    for(var i = 0;i < lines.length;i++){
        if(lines[i].startsWith("question:")) {
            currentQ=lines[i].substring(9);
        }
        if(lines[i].startsWith("option:")) {
            optionStack.push(lines[i].substring(7) + " - " + currentQ);
        }
    }
    var sepCounter=0;
    for(var i = 0;i < lines.length;i++){
        if(lines[i].startsWith(sep)) {
            if((i!=0)&&(optionStack[sepCounter]!=null)) { lines[i]=sep+counter+" (" + optionStack[sepCounter] + " )"; sepCounter+=1; }
            else { lines[i]=sep+counter; }
            counter+=1;
        }
    }
    var finalString="";
    for(var i = 0;i < lines.length;i++){
        if(lines[i]!="\n"){
        if(i<(lines.length-1)) {
        finalString+=lines[i]+"\n";
    } else {
        finalString+=lines[i];
    }
    }
}
    $("#writingPad").val(finalString);
}
$("#helperCheckbox").on("click", function(e){
    helper();
if($('#helperCheckbox').is(":checked")){
$("#writingPad").on("keydown", function(e){
    if(e.which == 13) {
helper();
}
    });
$("#writingPad").on("click", function(e){
helper();
    });}
else {
    $("#writingPad").off();

}


});
