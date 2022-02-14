let img = '';
let status = false;
let object = [];
// let randomNum1 = Math.floor(Math.random() * 256);
// let randomNum2 = Math.floor(Math.random() * 256);
// let randomNum3 = Math.floor(Math.random() * 256);
let itemsHtml = document.getElementById('numberOfObjs');
var video;
// RGB Values
// let r = randomNum1;
// let g = randomNum2;
// let b = randomNum3;

function preload(){
    img = loadImage('./images/laptop.jpg');
}

function setup(){
    var canvas;
    canvas = createCanvas(380, 380)
    canvas.center();    

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380)

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    document.getElementById('status').textContent = "Status: Detecting Object";
}

function gotResults(error, results){
    if(results.length <= 0) {
        console.log(error)
    }    
    else {
        console.log(results);
        console.log(results.length);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResults);
        for (let i = 0; i < object.length; i++) {
            document.getElementById('status').textContent = "Status: Detected Objects"
            itemsHtml.textContent = `${object.length}`
            let percent = floor(object[i].confidence * 100);
            let objName = object[i].label;
            fill(r, g, b);
            text(`${objName} ${percent}%`, object[i].x + 10, object[i].y + 15);
            noFill()
            stroke(r, g, b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}