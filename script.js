
var canvas;
var canvasContext;
var frequency = 0.5;
var score = 0;
var missed = 0;
var xPos;
var yPos;
var Accuracy;
var radius = 40;
var gameStarted = false;
var isClicked = false;
window.onload =function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight-135;
    canvasContext.font='30px Arial';
    canvasContext.fillText("Click To Play!",canvas.width/2-80,canvas.height/2);
}

function startGame(){
    setInterval(function(){
        drawCanvas();
        frequency += 0.5; // Increase frequency gradually
        if (frequency >= 10) {
            clearInterval(interval); // Stop increasing frequency after reaching a certain value
        }
    },1000/frequency);
}

window.addEventListener('click',function(evt){
    if(gameStarted){
        if (!isClicked){
            var mousePos = findMousePos(evt);
            if(((mousePos.x-xPos)*(mousePos.x-xPos))+((mousePos.y-yPos)*(mousePos.y-yPos))<=(radius*radius)){
                canvasContext.fillStyle = 'blue';
                canvasContext.beginPath();
                canvasContext.arc(xPos,yPos,radius,0,2*Math.PI);
                canvasContext.fill();
                score++;
                isClicked = true;
            }
            else{
                missed++;
            }
        }
    }
    else{
        gameStarted = true;
        startGame();
    }
})



function drawCanvas(){
    isClicked = false;
    canvasContext.fillStyle='white';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    xPos = Math.floor(Math.random()*(canvas.width-(2*radius)))+radius;
    yPos = Math.floor(Math.random()*(canvas.height-(2*radius)))+radius;
    canvasContext.fillStyle='red';
    canvasContext.beginPath();
    canvasContext.arc(xPos,yPos,radius,0,2*Math.PI);
    canvasContext.fill();
    canvasContext.fillStyle='black';
    canvasContext.font='20px Arial';
    canvasContext.fillText("Score: "+score,canvas.width-250,canvas.height*0.1);
    canvasContext.fillText("Miss-Clicks: "+missed,canvas.width-250,canvas.height*0.2);
    Accuracy=100*score/(score+missed);
    canvasContext.fillText("Accuracy: "+Accuracy.toFixed(2)+"%",canvas.width-250,canvas.height*0.3);
}

function findMousePos(evt){
    var rectBorder = canvas.getBoundingClientRect();		//Accounts for scroll distance and margin outside canvas
    var mouseX = evt.clientX - rectBorder.left;
    var mouseY = evt.clientY - rectBorder.top;
    return{
        x:mouseX,
        y:mouseY};
}
