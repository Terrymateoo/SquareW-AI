var NosePX = 0;
var NosePY = 0;
var Wspace = 0;
var LFX = 0;
var RFX = 0;

function setup() {
    var vid = createCapture(VIDEO);
    vid.size(720, 405);
    vid.center();
    var canvas = createCanvas(720, 480);
    canvas.position(600, 680);
    poseNet = ml5.poseNet(vid, modelL);
    poseNet.on('pose', aiWork);
}

function modelL() {
    console.log("poseNet inició");
}

function aiWork(results) {
    if(results.length > 0) {
        console.log(results);
        NosePX = results[0].pose.nose.x;
        NosePY = results[0].pose.nose.y;
        console.log("X: " + NosePX + ". Y Y: " + NosePY);
        LFX = results[0].pose.leftWrist.x;
        RFX = results[0].pose.rightWrist.x;
        Wspace = floor(LFX - RFX);
        console.log("La muñeca izquierda esta en: " + LFX + ", la derecha esta en: " + RFX + ". Y el espacio entre las 2 es: " + Wspace);
    }
}

function draw() {
    background('#303030');
    document.getElementById("SS").innerHTML = "El tamaño del cuadrado es: " + Wspace; + "px";
    fill('#000000');
    stroke('#000000');
    square(NosePX, NosePY, Wspace);
}
