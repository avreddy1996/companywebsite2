(function () {
    function id(v){return document.getElementById(v); }
    function loadbar() {
        var ovrl = id("overlay"),
            prog = id("progress"),
            stat = id("progstat"),
            loadText = id("loadText"),
            img = document.images,
            c = 0;
        tot = img.length;
        setTimeout(function () {
            loadText.innerHTML = "Slow network detected, sit back and relax while we load our site :)...";
        }, 4000);
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
            setCarouselHeight();
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
function id(elem) {
    return document.getElementById(elem);
}
var textCarousel = id('textCarousel');
var imageCarousel = id('imageCarousel');
var testimonialCarousel = id('testimonialCarousel');
$(textCarousel).carousel({
    interval:false
});
$(imageCarousel).carousel({
    interval:false
});
/*$(testimonialCarousel).carousel({
    interval: false
});*/
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
if(el) {
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
        handleswipe = callback || function (swipedir) {
        };

    touchsurface.addEventListener('touchstart', function (e) {
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

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right';
                // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
    }, false)
}
}

//USAGE:

var el = id('panelCarousel');
/*$(el).carousel({
    interval:false
});*/
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
        if($(elem).length>0) {
            var elemTop = $(elem).offset().top;
            return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
        }
    }
    function getScrollHeight(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        if($(elem).length>0) {
            var elemTop = $(elem).offset().top;
            return elemTop - docViewTop;
        }
    }
    function getTransformVal(elem) {
        var off = $(window)[0].innerHeight - getElementHeight(elem);
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
        $(id('mdMenu')).addClass('toggled');
    }else{
        $(id('mdMenu')).removeClass('toggled');
    }
    if(elementScrolled('#panel1')){
        id('panel1Image').style.transform = 'translateY('+getTransformVal('#panel1')+'%)';
    }
    if(elementScrolled('#panel2')){
        id('panel2Image').style.transform = 'translateY('+getTransformVal('#panel2')+'%)';
    }
    if(elementScrolled('#panel3')){
        id('panel3Image').style.transform = 'translateY('+getTransformVal('#panel3')+'%)';
    }
    if(elementScrolled('#panel4')){
        id('panel4Image').style.transform = 'translateY('+getTransformVal('#panel4')+'%)';
    }
    if(elementScrolled('#panel5')){
        id('panel5Image').style.transform = 'translateY('+getTransformVal('#panel5')+'%)';
    }
    if(window.innerWidth >600 && elementScrolled('#panelTeam')){
        id('panelTeamText').style.transform = 'translateY('+getTransformVal('#panelTeam')+'%)';
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
    $(id(elem1)).addClass('active');
    $(id(elem2)).addClass('active');
}
$(id('timelineItem1')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem1','timelineContainer1');
});
$(id('timelineItem2')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem2','timelineContainer2');
});
$(id('timelineItem3')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem3','timelineContainer3');
});
$(id('timelineItem4')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem4','timelineContainer4');
});
$(id('timelineItem5')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem5','timelineContainer5');
});
$(id('timelineItem6')).hover(function () {
    removeActiveClass();
    addActiveClass('timelineItem6','timelineContainer6');
});
/*===== drawing panel1 background in canvas ====*/
function changeProperties() {
    var container = id('canvasContainer');
    var bgCanvas = id('backgroundCanvas');
    if(bgCanvas) {
        var warehouse = id('warehouseImage');
        var ship = id('shipImage');
        var plane = id('planeImage');
        var manufacturer = id('manufacturerImage');
        var retailer = id('retailerImage');
        var retailerPath = id('retailerPath');
        var warehousePath = id('warehousePath');
        var phone = id('phoneWifi');
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
            drawSingleImage(ctx,retailer, 201, 387, 250, 303);
            drawSingleImage(ctx,plane, 393, 286, 116, 78);
            drawSingleImage(ctx,phone, 567, 162, 158, 294);
            drawSingleImage(ctx,warehouse, 563, 412, 397, 258);
            drawSingleImage(ctx,ship, 1067, 362, 188, 196);
            drawSingleImage(ctx,manufacturer, 947, 36, 294, 326);
            drawSingleImage(ctx,retailerPath, 336, 595, 370, 125);
            drawSingleImage(ctx,warehousePath, 839, 256, 162, 207);
            ctx.closePath();
        }
        function drawSingleImage(ctx,img, x, y, wid, ht){
            ctx.drawImage(img, x*xoff, y*yoff, wid*width/1280, ht*height/720);
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
    var menuButton = id('hamMenu');
    var menuElem = id('xsMenu');
    var menuList = document.querySelectorAll('.xs-menu li');
    var panel1 = id('totalContent');
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
        window.location = this.getAttribute('href');
        toggleMenu();
    })
});
/*========= function to set carousel height ======*/
function setCarouselHeight() {
    setSingleCarouselHeight('testimonialCarousel');
    setSingleCarouselHeight('textCarousel');
    setSingleCarouselHeight('panelCarousel');
}
function setSingleCarouselHeight(id) {
    var carouselItems = document.querySelectorAll('#'+id+' .carousel-inner .carousel-item');
    var maxHeight = 0;
    carouselItems.forEach(function (item, i) {
        $(item).addClass('active');
        if(item.offsetHeight>maxHeight){
            maxHeight = item.offsetHeight;
        }
        if(i!==0){
            $(item).removeClass('active');
        }

    });
    carouselItems.forEach(function (item) {
        item.style.height = maxHeight+ "px";
    })
}
/*========= end of function to set carousel height =====*/
/*========= function to load google maps ===*/
function initialize_map() {
    var mapDiv = document.getElementById('map_container');
    /******* to set the map center and zoom view according to fit the all markers *************/
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 29.9733737, lng:-11.4647461},
        zoom: window.innerWidth<600 ? 0:1
    });
    /*********** marker points to display name with respective coordinates, content to display in info window and links to direction ********/
    var markerlocations = {
        "marker":[{
            "lat":12.969523,
            "lng":77.651406,
            "title":'nVipani Technology Solutions Private Limited',
            "address":"#526, Ground Floor, 7th Cross, HAL 3rd stage, Jeevan Bheema Nagar,<br> Bangalore  - 560075, Karnataka, India.",
            "icon":'../img/mapmarker.png',
            "location":'https://goo.gl/maps/D826cLWbRYN2'
        },{
            "lat":39.027445,
            "lng":-77.5396127,
            "title":'nVipani Technology Solutions Inc',
            "address":"#42353 Guildhall Dr, Ashburn, VA 20148, USA",
            "icon":'../img/mapmarker.png',
            "location":'https://goo.gl/maps/zUWcFjUVzdM2'
        }]
    };
    for(i  = 0;  i < markerlocations.marker.length; i++) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(markerlocations.marker[i].lat, markerlocations.marker[i].lng),
            map: map,
            icon:  markerlocations.marker[i].icon,
            title: markerlocations.marker[i].title,
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<div><h6 style="font-weight: bold;">'+ markerlocations.marker[i].title+'</h6>' +
            '<p>'+markerlocations.marker[i].address+'</p>' +
            '<a href="'+markerlocations.marker[i].location+'" target="_blank">Get directions</a></div>'
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent('<div><h6 style="font-weight: bold;">'+ markerlocations.marker[i].title+'</h6>' +
                    '<p>'+markerlocations.marker[i].address+'</p>' +
                    '<a href="'+markerlocations.marker[i].location+'" target="_blank">Get directions</a></div>');
                infowindow.open(map, this);
            }
        })(marker, i));
    }
}

$(document).ready(function() {
    $('#testimonialCarousel').carousel({
        interval: 3000
    });
    $('#panelCarousel').carousel({
        interval: 12000
    });

});
/*============== main page script ends here ==========*/
/*============ about us page script starts here ======*/
