appstatus="";
objects=[];
Video="";
detector="";

function preload(){
    Video=createVideo("video.mp4");
    Video.hide();
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(650,300);
    Video.hide();  
}

function draw(){
    image(Video,0,0,400,400);

    if(appstatus==true){
        detector.detect(Video,gotresult);

        console.log(objects.length);
        r=random(255);
        g=random(255);
        b=random(255);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("noobjects").innerHTML = "No. of objects detected : "+objects.length;

            console.log(i);

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotresult(error,results){
      if(error){
          console.error(error);
      }else{
          console.log(results);
          objects=results;
      }
}

function modelLoaded(){
      console.log("Model loaded!");
      appstatus=true;
      Video.loop();
      Video.volume(0);
      Video.speed(1);
}

function surveillance(){
      detector=ml5.objectDetector('cocossd',modelLoaded);
      document.getElementById("status").innerHTML="Status : Detecting objects";
}