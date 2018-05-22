var container = document.getElementById('canvasContainer');
var canvas = document.getElementById('backgroundCanvas');
container.style.height = container.clientWidth*9/16 + 'px';
canvas.width = container.clientWidth;
canvas.height = canvas.width*9/16;
width = canvas.width;
height = canvas.height;
var ctx = canvas.getContext('2d');
var xoff = width/600;
var yoff = height/338;
var bounce = -1;
var dotsNum = Math.floor(70*width/1280);
var connectingDotsNum = Math.floor(100*width/1280);
var dotSpeed = 1;
var lineLength = Math.floor(20*width/640);
var sourceImage = document.getElementById('sourceImage');
function setParams() {
    container.style.height = container.clientWidth*9/16 + 'px';
    canvas.width = container.clientWidth;
    canvas.height = canvas.width*9/16;
    width = canvas.width;
    height = canvas.height;
    xoff = width/600;
    yoff = height/338;
    dotsNum = Math.floor(100*width/1280);
    connectingDotsNum = Math.floor(70*width/1280);
    lineLength = Math.floor(20*width/640);
}
var dots = [];
var connectingDots = [];
var mousePosition = {};
ctx.lineWidth = .2;
ctx.lineCap = "round";
ctx.lineJoin = "round";
/*==== initialize dots ===========*/
for(var i=0;i<dotsNum;i++){
    dots.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: Math.random() < 0.5 ? Math.random()*dotSpeed : Math.random()*dotSpeed*bounce,
        vy: Math.random() < 0.5 ? Math.random()*dotSpeed : Math.random()*dotSpeed*bounce,
        color: '#fff',
        radius: Math.random() + 0.5
    })
}
for(var j=0;j<connectingDotsNum;j++){
    connectingDots.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: Math.random() < 0.5 ? Math.random()*dotSpeed : Math.random()*dotSpeed*bounce,
        vy: Math.random() < 0.5 ? Math.random()*dotSpeed : Math.random()*dotSpeed*bounce,
        color: '#fff',
        radius: Math.random()
    })
}
/*==== Background Gradient ========*/
var grad = ctx.createLinearGradient(0,0,width,0);
grad.addColorStop(0,'#091965');
grad.addColorStop(1, '#0483fc');
function drawBackground(ctx, xoff, yoff,) {
    ctx.beginPath();
    ctx.clearRect(0,0,width,height);
    ctx.moveTo(0*xoff, 68*yoff);
    ctx.bezierCurveTo(104*xoff, 0*yoff, 159*xoff, 98*yoff, 238*xoff, 0*yoff);
    ctx.lineTo(600*xoff, 0*yoff);
    ctx.lineTo(600*xoff, 168*yoff);
    ctx.bezierCurveTo(555*xoff, 223*yoff, 545*xoff, 237*yoff, 518*xoff, 253*yoff);
    ctx.bezierCurveTo(489*xoff, 275*yoff, 377*xoff, 297*yoff, 285*xoff, 228*yoff);
    ctx.bezierCurveTo(173*xoff, 128*yoff, 80*xoff, 182*yoff, 0*xoff, 231*yoff);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(600*xoff, 150*yoff);
    ctx.bezierCurveTo(553*xoff, 181*yoff, 523*xoff, 259*yoff, 419*xoff, 274*yoff);
    ctx.bezierCurveTo(553*xoff, 277*yoff, 565*xoff, 195*yoff, 600*xoff, 173*yoff);
    ctx.lineTo(600*xoff, 150*yoff);
    ctx.fillStyle = '#0483fc';
    ctx.fill();
    ctx.closePath();
}
function drawImage(img, mouse) {
    ctx.beginPath();
    if(mouse.x>0 && mouse.y>0){
        ctx.drawImage(img, 14*width/100 + mouse.x/50, 34*height/100 - (height - mouse.y)/50, 300, 300);
        ctx.drawImage(img, 92*width/100 + (width - mouse.x)/60, 35*height/100 - (height - mouse.y)/60, 150, 150);
    }else {
        ctx.drawImage(img, 14 * width / 100, 34 * height / 100, 300, 300);
        ctx.drawImage(img, 92 * width / 100, 35 * height / 100, 150, 150);
    }
    ctx.closePath();
}
function drawDots(ctx, dots) {
    var dot;
    for(var i =0;i<dots.length;i++){
        dot = dots[i];
        ctx.beginPath();
        ctx.moveTo(dot.x,dot.y);
        ctx.arc(dot.x, dot.y, dot.radius, 0, 2*Math.PI);
        ctx.fillStyle = dot.color;
        ctx.fill();
    }
}
function updateDots(dots){
    var dot;
    for(var i=0;i<dots.length;i++){
        dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;
        if(dot.x>width || dot.x<0){
            dot.vx *= bounce;
        }
        if(dot.y>height || dot.x<0){
            dot.vy *= bounce;
        }
    }
}
function drawLines(dots1, dots2){
    var dot1,dot2;
    for(var i=0;i<dots1.length;i++){
        dot1 = dots1[i];
        drawLine(dot1.x, dot1.y, dots2);
    }
    drawLine(mousePosition.x, mousePosition.y, dots2);
}
function drawLine(x,y,dots){
    var dot;
    if(x>0 && y>0) {
        for (var j = 0; j < dots.length; j++) {
            dot = dots[j];
            if (Math.abs(x - dot.x) < lineLength && Math.abs(y - dot.y) < lineLength) {
                ctx.beginPath();
                ctx.moveTo(Math.floor(x) + 0.5, Math.floor(y) + 0.5);
                ctx.lineTo(Math.floor(dot.x) + 0.5, Math.floor(dot.y)+ 0.5);
                ctx.strokeStyle = dot.color;
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
function updateMouse(e){
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
}
container.onmousemove = function(){
    updateMouse(event);
};
container.onmouseleave = function(){
    mousePosition.x = 0;
    mousePosition.y = 0;
};
$(window).resize(function(){
    setParams();
});
function animate(){
    updateDots(dots);
    updateDots(connectingDots);
    drawBackground(ctx,xoff, yoff);
    drawDots(ctx, dots);
    drawDots(ctx, connectingDots);
    drawLines(connectingDots, dots);
    drawImage(sourceImage, mousePosition);
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
