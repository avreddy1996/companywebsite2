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
            changeProperties();
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
    function menuScrolled() {
        return $(window).scrollTop()>10
    }
    if($(window).scrollTop()>10){
        $(document.getElementById('mdMenu')).addClass('toggled');
    }else{
        $(document.getElementById('mdMenu')).removeClass('toggled');
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
$(window).resize(function () {
    changeProperties();
});
/*======*/
/*===== code for timeline ends here ========*/
$(document).ready(function (e) {
    var menuButton = document.getElementById('hamMenu');
    var menuElem = document.getElementById('xsMenu');
    var menuList = document.querySelectorAll('.xs-menu a');
    var panel1 = document.getElementById('totalContent');
    function toggleMenu(){
        if($(menuButton).hasClass('toggled') && $(menuElem).hasClass('toggled')){
            $(document.body).removeClass('hide');
            $(menuButton).removeClass('toggled');
            $(menuElem).removeClass('toggled');
            $(panel1).removeClass('toggled');
        }else{
            $(document.body).addClass('hide');
            $(panel1).addClass('toggled');
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

