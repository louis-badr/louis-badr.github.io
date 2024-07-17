const colorDark = "#04071B";
const colorLight = "#F4EFDC";
const colorLighter = "#F4EFDC15";
const colorAccent = "#2E45ED";
const colorAccentLighter = "#2E45ED75";

let marksSpacing;
const marksNumber = 5;
let startX, startY, isDrawing = false;

const currentPath = window.location.pathname;
const canvas = document.getElementById("bgCanvas");
const context = canvas.getContext("2d");
const container = document.getElementById("gradientContainer");

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
    arrowCanvas.width = window.innerWidth;
    arrowCanvas.height = window.innerHeight;
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

function drawArrow(ctx, x1, y1, x2, y2) {
    const headlen = 10; // length of head in pixels
    const angle = Math.atan2(y2 - y1, x2 - x1);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw first arrow head
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headlen * Math.cos(angle - Math.PI / 6), y1 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - headlen * Math.cos(angle + Math.PI / 6), y1 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

    // Draw second arrow head
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI + Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI + Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI - Math.PI / 6));
    ctx.stroke();
}

// Inital call
resizeCanvas();
// Resize canvas on window resize
window.addEventListener("resize", resizeCanvas);

switch (currentPath) {
    case "/":
    case "/index.html":
        container.style.background = `radial-gradient(circle 800px at 0% 0%, ${colorAccentLighter}, transparent)`;
        const arrowCanvas = document.getElementById("arrowCanvas");
        const arrowContext = arrowCanvas.getContext("2d");
        // Initial call
        resizeArrowCanvas();
        // Resize canvas on window resize
        window.addEventListener("resize", resizeArrowCanvas);
        arrowCanvas.addEventListener("mousedown", function (e) {
            arrowContext.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
            isDrawing = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        arrowCanvas.addEventListener("mousemove", function (e) {
            if (isDrawing) {
                arrowContext.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
                drawArrow(arrowContext, startX, startY, e.clientX, e.clientY);
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