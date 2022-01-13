status1 = "";
objects = [];
video = "";

function setup(){
canvas = createCanvas(300, 300);
canvas.center();
video = createCapture(VIDEO);
video.hide();
video.size(300, 300);
}

function preload(){

}

function draw(){
image(video, 0, 0, 300, 300);
if(status1 != ""){
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";

        fill("#FF0000");
        precent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + precent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == thing){
            video.stop();
            document.getElementById("number_of_objects").innerHTML= thing + " found";
            synth = window.speechSynthesis;
             utterThis = new SpeechSynthesisUtterance(thing + "Found");
              synth.speak(utterThis);
        }
        else {
            document.getElementById("number_of_objects").innerHTML= thing + " not found";
        }
    }
}


}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start(){
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
thing = document.getElementById("text_input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
}