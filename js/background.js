const colorDark = "#04071B";
const colorLight = "#F4EFDC";
const colorLighter = "#F4EFDC15";
const colorAccent = "#2E45ED";
const colorAccentLighter = "#2E45ED75";

let marksSpacing;
const marksNumber = 5;
var mousePos = { x: 0, y: 0 };
let startX, startY;
let isDrawing = false;

const currentPath = window.location.pathname;
const canvas = document.getElementById("bgCanvas");
const context = canvas.getContext("2d");
const container = document.getElementById("gradientContainer");
const arrowCanvasContainer = document.getElementById("arrowCanvasContainer");
const arrowCanvas = document.getElementById("arrowCanvas");
const arrowContext = arrowCanvas.getContext("2d");

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

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

function resizeArrowCanvas() {
    arrowCanvas.width = arrowCanvasContainer.clientWidth;
    arrowCanvas.height = arrowCanvasContainer.clientHeight;
    arrowContext.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
}

function drawBg() {
    switch (currentPath) {
        case "/":
        case "/index.html":
            drawBottomRightBg();  
            break;
        case "/aboutme/":
        case "/aboutme/index.html":
            drawRightBg();
            break;
        case "/projects/":
        case "/projects/index.html":
            drawBottomBg();
            break;
        case "/gallery/":
        case "/gallery/index.html":
            drawBottom2Bg();
            break;
        default:
            break;
    }
}

function drawBottomRightBg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(0, canvas.height - 20);
    context.lineTo(canvas.width - 20, canvas.height - 20);
    // Vertical line
    context.moveTo(canvas.width - 20, 0);
    context.lineTo(canvas.width - 20, canvas.height - 20);
    // Horizontal line marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20 - marksSpacing * i, canvas.height - 20);
        context.lineTo(canvas.width - 20 - marksSpacing * i, canvas.height - 10);
    }
    // Vertical line marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20, canvas.height - 20 - marksSpacing * i);
        context.lineTo(canvas.width - 10, canvas.height - 20 - marksSpacing * i);
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();
    
    context.beginPath();
    // Vertical lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20 - marksSpacing * i, 0);
        context.lineTo(canvas.width - 20 - marksSpacing * i, canvas.height);
    }
    // Horizontal lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(0, canvas.height - 20 - marksSpacing * i);
        context.lineTo(canvas.width, canvas.height - 20 - marksSpacing * i);
    }
    // Draw everything
    context.strokeStyle = colorLighter;
    context.lineWidth = 2;
    context.stroke();
}

function drawRightBg() {
    context.beginPath();
    // Vertical line
    context.moveTo(canvas.width - 20, 0);
    context.lineTo(canvas.width - 20, canvas.height);
    // Vertical marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20, marksSpacing * i);
        context.lineTo(canvas.width - 10, marksSpacing * i);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Vertical lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - 20 - marksSpacing * i, 0);
        context.lineTo(canvas.width - 20 - marksSpacing * i, canvas.height);
    }
    // Horizontal lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(0, marksSpacing * i);
        context.lineTo(canvas.width, marksSpacing * i);
    }
    // Draw everything
    context.strokeStyle = colorLighter;
    context.lineWidth = 2;
    context.stroke();
}

function drawBottomBg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(0, canvas.height - 20);
    context.lineTo(canvas.width, canvas.height - 20);
    // Horizontal line marks
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
    // Vertical lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(0, canvas.height - 20 - marksSpacing * i);
        context.lineTo(canvas.width, canvas.height - 20 - marksSpacing * i);
    }
    // Horizontal lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(marksSpacing * i, 0);
        context.lineTo(marksSpacing * i, canvas.height);
    }
    // Draw everything
    context.strokeStyle = colorLighter;
    context.lineWidth = 2;
    context.stroke();
}

function drawBottom2Bg() {
    context.beginPath();
    // Horizontal line
    context.moveTo(0, canvas.height - 20);
    context.lineTo(canvas.width, canvas.height - 20);
    // Horizontal line marks
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - marksSpacing * i, canvas.height - 20);
        context.lineTo(canvas.width - marksSpacing * i, canvas.height - 10);
        context.strokeStyle = colorLight;
    }
    // Draw everything
    context.strokeStyle = colorLight;
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    // Vertical lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(0, canvas.height - 20 - marksSpacing * i);
        context.lineTo(canvas.width, canvas.height - 20 - marksSpacing * i);
    }
    // Horizontal lines
    for (let i = 1; i <= marksNumber; i++) {
        context.moveTo(canvas.width - marksSpacing * i, 0);
        context.lineTo(canvas.width - marksSpacing * i, canvas.height);
    }
    // Draw everything
    context.strokeStyle = colorLighter;
    context.lineWidth = 2;
    context.stroke();
}

function drawArrow(ctx, x1, y1, x2, y2, arrowWidth = 2, color = colorLight) {
    // Calculate the length of the arrow
    var length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
    if (length > 100) {
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(y2-y1,x2-x1);
        ctx.strokeStyle = color;
        ctx.fillStyle = color; // Set the fill color to match the stroke color
        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = arrowWidth;
        ctx.stroke();
        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2-headlen*Math.cos(angle-Math.PI/7), y2-headlen*Math.sin(angle-Math.PI/7));
        //path from the side point of the arrow, to the other side point
        ctx.lineTo(x2-headlen*Math.cos(angle+Math.PI/7), y2-headlen*Math.sin(angle+Math.PI/7));
        //path from the side point back to the tip of the arrow, and then
        //again to the opposite side point
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2-headlen*Math.cos(angle-Math.PI/7), y2-headlen*Math.sin(angle-Math.PI/7));
        //draws the paths created above
        ctx.fill(); // Fill the arrow head with color
        ctx.stroke();

        // Draw the second arrow head at the other end of the arrow
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1+headlen*Math.cos(angle-Math.PI/7), y1+headlen*Math.sin(angle-Math.PI/7));
        ctx.lineTo(x1+headlen*Math.cos(angle+Math.PI/7), y1+headlen*Math.sin(angle+Math.PI/7));
        ctx.lineTo(x1, y1);
        ctx.lineTo(x1+headlen*Math.cos(angle-Math.PI/7), y1+headlen*Math.sin(angle-Math.PI/7));
        ctx.fill(); // Fill the second arrow head with color
        ctx.stroke();

        // Hide the part of the arrow below the text
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        const circleRadius = 20;
        const circleX = (x1 + x2) / 2;
        const circleY = (y1 + y2) / 2;
        ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        // Draw the length text in the middle of the arrow
        ctx.font = "16px Arial";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; // Align the text vertically in the middle
        ctx.fillText(length.toFixed(0), (x1 + x2) / 2, (y1 + y2) / 2);
    }
}

// Inital call
resizeCanvas();
// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

switch (currentPath) {
    case "/":
    case "/index.html":
        container.style.background = `radial-gradient(circle 800px at 0% 0%, ${colorAccentLighter}, transparent)`;
        // Initial call
        resizeArrowCanvas();
        // Resize canvas on window resize
        window.addEventListener("resize", resizeArrowCanvas);
        arrowCanvas.addEventListener("mousedown", function (e) {
            resizeArrowCanvas(arrowCanvasContainer);
            arrowContext.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
            isDrawing = true;
            mousePos = getMousePos(arrowCanvas, e);
            startX = mousePos.x;
            startY = mousePos.y;
        });
        arrowCanvas.addEventListener("mousemove", function (e) {
            if (isDrawing) {
                arrowContext.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
                mousePos = getMousePos(arrowCanvas, e);
                drawArrow(arrowContext, startX, startY, mousePos.x, mousePos.y);
            }
        });
        arrowCanvas.addEventListener("mouseup", function (e) {
            isDrawing = false;
        });
        break;
    case "/aboutme/":
    case "/aboutme/index.html":
        container.style.background = `radial-gradient(circle 800px at 0% 100%, ${colorAccentLighter}, transparent)`;
        break;
    case "/projects/":
    case "/projects/index.html":
        container.style.background = `radial-gradient(ellipse 100% 50% at 50% 0%, ${colorAccentLighter}, transparent)`;
        break;
    case "/gallery/":
    case "/gallery/index.html":
        container.style.background = `radial-gradient(circle 800px at 100% 0%, ${colorAccentLighter}, transparent)`;
        break;
    default:
        break;
}

document.addEventListener("mousemove", function (e) {
    let x = - (e.clientX / window.innerWidth) * 15;
    let y = - (e.clientY / window.innerHeight) * 15;
    // Get the pathname of the current URL
    switch (currentPath) {
        case "/":
        case "/index.html":
            container.style.background = `radial-gradient(circle 800px at ${x}% ${y}%, ${colorAccentLighter}, transparent)`;
            break;
        case "/aboutme/":
        case "/aboutme/index.html":
            container.style.background = `radial-gradient(circle 800px at ${x}% ${y + 100}%, ${colorAccentLighter}, transparent)`;
            break;
        case "/projects/":
        case "/projects/index.html":
            container.style.background = `radial-gradient(ellipse 100% 50% at ${x+50}% ${y}%, ${colorAccentLighter}, transparent)`;
            break;
        case "/gallery/":
        case "/gallery/index.html":
            container.style.background = `radial-gradient(circle 800px at ${x + 100}% ${y}%, ${colorAccentLighter}, transparent)`;
            break;
        default:
            break;
    }
});
