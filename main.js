let img = '';
let status = false;
let object = [];
function preload(){
    img = loadImage('./images/background.jpg');
}

function setup(){
    var canvas;
    canvas = createCanvas(600, 500)
    canvas.center();

    const objectDetector = ml5.objectDetector('cocossd', ()=>{
        console.log("Model Loaded");
        status = true;
        document.getElementById('status').textContent = "Status: Detecting Object";
        objectDetector.detect(img, gotResults)
    });
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
    image(img, 0, 0, 600, 500);
    if(status != "") {
        for (let i = 0; i < object.length; i++) {
            document.getElementById('status').textContent = "Status: Detected Objects"

            let percent = floor(object[i].confidence * 100);
            let objName = object[i].label;
            fill('64, 175, 227');
            text(`${objName} ${percent}%`, object[i].x + 10, object[i].y + 15);
            noFill()
            stroke('red')
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

        }
    }
}