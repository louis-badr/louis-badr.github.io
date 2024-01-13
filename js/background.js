// define colors
const colorDark = "#04071B";
const colorLight = "#F4EFDC";
const colorAccent = "#2E45ED";
const colorAccentLighter = "#2E45ED50";

const canvas = document.getElementById("bgCanvas");
const context = canvas.getContext("2d");

const marksNumber = 5;
const crossSize = 7;

let marksSpacing;
let currentPath;

function resizeCanvas() {
    canvas.width = window.innerWidth;   
    canvas.height = window.innerHeight;
    if (canvas.width > canvas.height) {
        marksSpacing = (canvas.width - 20) / (marksNumber+1);
    }
    else {
        marksSpacing = (canvas.height - 20) / (marksNumber+1);
    }
    drawBg();
}

function drawBg() {
    // Get the pathname of the current URL
    currentPath = window.location.pathname;
    console.log(currentPath);
    switch (currentPath) {
        case "/":
            drawBottomRightBg();
            break;
        case "/aboutme/":
            drawRightBg();
            break;
        case "/projects/":
            drawBottomBg();
            break;
        case "/gallery/":
            drawBottomLeftBg();
            break;
        default:
            break;
    }
}

function drawBottomRightBg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(0, canvas.height -20);
    context.lineTo(canvas.width - 20, canvas.height -20);
    // Vertical line
    context.moveTo(canvas.width - 20, 0);
    context.lineTo(canvas.width - 20, canvas.height -20);
    // Horizontal marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20 - marksSpacing * i, canvas.height - 20);
        context.lineTo(canvas.width - 20 - marksSpacing * i, canvas.height - 10);
        context.strokeStyle = colorLight;
    }
    // Vertical marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20, canvas.height - 20 - marksSpacing * i);
        context.lineTo(canvas.width - 10, canvas.height - 20 - marksSpacing * i);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Grid crosses
    for (let i = 1; i <= marksNumber; i++) {
        for (let j = 1; j <= marksNumber; j++) {
            // draw little crosses
            context.moveTo(canvas.width - 20 - marksSpacing * i - crossSize, canvas.height - 20 - marksSpacing * j);
            context.lineTo(canvas.width - 20 - marksSpacing * i + crossSize, canvas.height - 20 - marksSpacing * j);
            context.moveTo(canvas.width - 20 - marksSpacing * i, canvas.height - 20 - marksSpacing * j - crossSize);
            context.lineTo(canvas.width - 20 - marksSpacing * i, canvas.height - 20 - marksSpacing * j + crossSize);              
        }
    }
    // Draw everything
    context.strokeStyle = colorAccentLighter;
    context.stroke();  
}

function drawBottomLeftBg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(20, canvas.height -20);
    context.lineTo(canvas.width, canvas.height -20);
    // Vertical line
    context.moveTo(20, 0);
    context.lineTo(20, canvas.height -20);
    // Horizontal marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(20 + marksSpacing * i, canvas.height - 20);
        context.lineTo(20 + marksSpacing * i, canvas.height - 10);
        context.strokeStyle = colorLight;
    }
    // Vertical marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(20, canvas.height - 20 - marksSpacing * i);
        context.lineTo(10, canvas.height - 20 - marksSpacing * i);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Grid crosses
    for (let i = 1; i <= marksNumber; i++) {
        for (let j = 1; j <= marksNumber; j++) {
            // draw little crosses
            context.moveTo(20 + marksSpacing * i - crossSize, canvas.height - 20 - marksSpacing * j);
            context.lineTo(20 + marksSpacing * i + crossSize, canvas.height - 20 - marksSpacing * j);
            context.moveTo(20 + marksSpacing * i, canvas.height - 20 - marksSpacing * j - crossSize);
            context.lineTo(20 + marksSpacing * i, canvas.height - 20 - marksSpacing * j + crossSize);              
        }
    }
    // Draw everything
    context.strokeStyle = colorAccentLighter;
    context.stroke();  
}

function drawRightBg() {
    context.beginPath();
    // Vertical line
    context.moveTo(canvas.width - 20, 0);
    context.lineTo(canvas.width - 20, canvas.height);
    // Vertical marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20, canvas.height - marksSpacing * i);
        context.lineTo(canvas.width - 10, canvas.height - marksSpacing * i);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Grid crosses
    for (let i = 1; i <= marksNumber; i++) {
        for (let j = 1; j <= marksNumber; j++) {
            // draw little crosses
            context.moveTo(marksSpacing * i - crossSize, canvas.height - marksSpacing * j);
            context.lineTo(marksSpacing * i + crossSize, canvas.height - marksSpacing * j);
            context.moveTo(marksSpacing * i, canvas.height - marksSpacing * j - crossSize);
            context.lineTo(marksSpacing * i, canvas.height - marksSpacing * j + crossSize);              
        }
    }
    // Draw everything
    context.strokeStyle = colorAccentLighter;
    context.stroke(); 
}

function drawBottomBg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(0, canvas.height -20);
    context.lineTo(canvas.width, canvas.height -20);
    // Horizontal marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(marksSpacing * i, canvas.height - 20);
        context.lineTo(marksSpacing * i, canvas.height - 10);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Grid crosses
    for (let i = 1; i <= marksNumber; i++) {
        for (let j = 1; j <= marksNumber; j++) {
            // draw little crosses
            context.moveTo(marksSpacing * i - crossSize, canvas.height - 20 - marksSpacing * j);
            context.lineTo(marksSpacing * i + crossSize, canvas.height - 20 - marksSpacing * j);
            context.moveTo(marksSpacing * i, canvas.height - 20 - marksSpacing * j - crossSize);
            context.lineTo(marksSpacing * i, canvas.height - 20 - marksSpacing * j + crossSize);              
        }
    }
    // Draw everything
    context.strokeStyle = colorAccentLighter;
    context.stroke(); 
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);