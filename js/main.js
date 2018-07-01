(function () {
    function id(v){return document.getElementById(v); }
    function loadbar() {
        var ovrl = id("overlay"),
            prog = id("progress"),
            stat = id("progstat"),
            img = document.images,
            c = 0;
        tot = img.length;

        function imgLoaded(){
            c += 1;
            var perc = ((100/tot*c) << 0) +"%";
            prog.style.width = perc;
            stat.innerHTML = "Loading "+ perc;
            if(c===tot) return doneLoading();
        }
        function doneLoading(){
            ovrl.style.opacity = 0;
            setTimeout(function(){
                ovrl.style.display = "none";
            }, 1200);
        }
        for(var i=0; i<tot; i++) {
            var tImg     = new Image();
            tImg.onload  = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src     = img[i].src;
        }
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
}());
var textCarousel = document.getElementById('textCarousel');
var imageCarousel = document.getElementById('imageCarousel');
$(textCarousel).carousel({
    interval:false
});
$(imageCarousel).carousel({
    interval:false
});
function carouselLeft() {
    $(textCarousel).carousel('prev');
    $(imageCarousel).carousel('prev');
}
function carouselRight() {
    $(textCarousel).carousel('next');
    $(imageCarousel).carousel('next');
}
$(document).bind('keyup', function (e) {
    if(e.keyCode === 37){
        carouselLeft();
    }else if(e.keyCode === 39){
        carouselRight();
    }
});
/*================= Javascript to detect swipe ============*/
// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 50, //required min distance traveled to be considered swipe
        restraint = 75, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 500, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function(swipedir){};

    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        //e.preventDefault();
    }, false);

    /*touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false);*/

    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right';
                // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
    }, false)
}

//USAGE:

var el = document.getElementById('panelCarousel');
$(el).carousel({
    interval:false
});
swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
    if(swipedir==='left'){
        $(el).carousel('next');
    }else if(swipedir === 'right'){
        $(el).carousel('prev');
    }
});

/*================= Javascript to detect swipe ends =======*/
/*=========== jquery to add parallax on scroll =======*/
$(window).scroll(function () {
    function elementScrolled(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }
    function getScrollHeight(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return elemTop - docViewTop;
    }
    function getTransformVal(elem) {
        var off = $(window)[0].innerHeight - getElementHeight(elem)/3;
        var val = 15 - (off - getScrollHeight(elem))*30/off;
        return val;
    }
    function getElementHeight(elem) {
        return $(elem)[0].offsetHeight;
    }
    if(elementScrolled('#panel1')){
        document.getElementById('panel1Image').style.transform = 'translateY('+getTransformVal('#panel1')+'%)';
    }
    if(elementScrolled('#panel2')){
        document.getElementById('panel2Image').style.transform = 'translateY('+getTransformVal('#panel2')+'%)';
    }
    if(elementScrolled('#panel3')){
        document.getElementById('panel3Image').style.transform = 'translateY('+getTransformVal('#panel3')+'%)';
    }
    if(elementScrolled('#panel4')){
        document.getElementById('panel4Image').style.transform = 'translateY('+getTransformVal('#panel4')+'%)';
    }
    if(elementScrolled('#panel5')){
        document.getElementById('panel5Image').style.transform = 'translateY('+getTransformVal('#panel5')+'%)';
    }
});
/*===== function for panel-2 timeline transition =====*/
function removeActiveClass(){
    document.querySelectorAll('.timeline-header .item').forEach(function (elem) {
        $(elem).removeClass('active');
    });
    document.querySelectorAll('.timeline-container .item').forEach(function (elem) {
        $(elem).removeClass('active');
    })
}
function addActiveClass(elem1,elem2){
    $(document.getElementById(elem1)).addClass('active');
    $(document.getElementById(elem2)).addClass('active');
}
$(document.getElementById('timelineItem1')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem1','timelineContainer1');
});
$(document.getElementById('timelineItem2')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem2','timelineContainer2');
});
$(document.getElementById('timelineItem3')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem3','timelineContainer3');
});
$(document.getElementById('timelineItem4')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem4','timelineContainer4');
});
$(document.getElementById('timelineItem5')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem5','timelineContainer5');
});
$(document.getElementById('timelineItem6')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem6','timelineContainer6');
});
/*===== drawing panel1 background in canvas ====*/
function changeProperties() {
    var container = document.getElementById('canvasContainer');
    var bgCanvas = document.getElementById('backgroundCanvas');
    if(bgCanvas) {
        var warehouse = document.getElementById('warehouseImage');
        var ship = document.getElementById('shipImage');
        var plane = document.getElementById('planeImage');
        var manufacturer = document.getElementById('manufacturerImage');
        width = container.offsetWidth;
        height = container.offsetHeight;
        bgCanvas.width = width;
        bgCanvas.height = height;
        var bgctx = bgCanvas.getContext('2d');
        var xoff = width / 1280;
        var yoff = height / 720;
        var grad = bgctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(1, '#0C4CB4');
        grad.addColorStop(0, '#3E95E5');

        function drawBackground(ctx) {
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(width, 0);
            ctx.lineTo(width, 416 * yoff);
            ctx.lineTo(730 * xoff, height);
            ctx.lineTo(0, height);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.closePath();
        }

        function drawImages(ctx) {
            ctx.beginPath();
            ctx.drawImage(manufacturer, 585 * xoff, 116 * yoff, 384 * width / 1280, 386 * height / 720);
            ctx.drawImage(warehouse, 950 * xoff, 50 * yoff, 330 * width / 1280, 298 * height / 720);
            ctx.drawImage(plane, 382 * xoff, 490 * yoff, 281 * width / 1280, 197 * height / 720);
            ctx.drawImage(ship, 860 * xoff, 330 * yoff, 300 * width / 1280, 312 * height / 720);
            ctx.closePath();
        }

        drawBackground(bgctx);
        drawImages(bgctx);
    }
}
changeProperties();
$(window).resize(function () {
    changeProperties();
});
/*======*/
/*===== code for timeline ends here ========*/
$(document).ready(function (e) {
    var menuButton = document.getElementById('hamMenu');
    var menuElem = document.getElementById('xsMenu');
    var menuList = document.querySelectorAll('.xs-menu a');
    function toggleMenu(){
        if($(menuButton).hasClass('toggled') && $(menuElem).hasClass('toggled')){
            $(document.body).removeClass('hide');
            $(menuButton).removeClass('toggled');
            $(menuElem).removeClass('toggled');
        }else{
            $(document.body).addClass('hide');
            $(menuButton).addClass('toggled');
            $(menuElem).addClass('toggled');
        }
    }
    $(menuButton).on('touchstart', function () {
        toggleMenu();
    });
    $(menuList).on('touchstart', function () {
        window.location.hash = this.hash;
        toggleMenu();
    })
});
/*
var container = document.getElementById('canvasContainer');

var canvas = document.getElementById('backgroundCanvas');
container.style.height = window.innerHeight
canvas.width = container.clientWidth;
canvas.height = window.innerHeight;
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
/!*===== Image positions ==========*!/
var image1 = {x: 14*width/100, y: 33*height/100, wid: 300*width/1280, hig: 300*height/720};
var image2 = {x: 92*width/100, y: 37*height/100, wid: 150*width/1280, hig: 150*height/720};
/!*==== initialize dots ===========*!/
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
/!*==== Background Gradient ========*!/
var grad = ctx.createLinearGradient(0,0,width,0);
grad.addColorStop(0,'#091965');
grad.addColorStop(1, '#0483fc');
function drawBackground(ctx, xoff, yoff,) {
    ctx.beginPath();
    ctx.rect(0,0,width,height);
    ctx.fillStyle = grad;
    ctx.fill();
    //code to get curved background - commented due to new design
    /!*ctx.clearRect(0,0,width,height);
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
    ctx.fill();*!/
    ctx.closePath();
}
function drawImage(img, mouse) {
    ctx.beginPath();
    /!*if(mouse.x>0 && mouse.y>0){
        ctx.drawImage(img, image1.x + mouse.x/50, image1.y - (height - mouse.y)/50, image1.wid, image1.hig);
        ctx.drawImage(img, image2.x + (width - mouse.x)/60, image2.y - (height - mouse.y)/60, image2.wid, image2.hig);
    }else {*!/
        ctx.drawImage(img, image1.x, image1.y, image1.wid, image1.hig);
        ctx.drawImage(img, image2.x, image2.y, image2.wid, image2.hig);
    /!*}*!//!*drawImage(sourceImage, mousePosition);*!/
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
        ctx.closePath();
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
    drawLine(mousePosition.x, mousePosition.y, dots1);
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
container.addEventListener("mousemove", function (event) {
    updateMouse(event);
});
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
    /!*drawImage(sourceImage, mousePosition);*!/
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
*/
