let titleContent = window.location.href.split('/').pop();
if (titleContent == '' || titleContent == '/' || titleContent == null) {
    titleContent = 'Main Page';
} else {
    titleContent = titleContent.charAt(0).toUpperCase() + titleContent.slice(1);
    titleContent = titleContent.replace(/^(.*)\.(\w+)*/, "$1");
}

let charset = document.createElement('meta');
charset.setAttribute('charset', 'utf-8');
document.head.append(charset);

let title = document.createElement('title');
title.append(titleContent);
document.head.append(title);

let viewport = document.createElement('meta');
viewport.setAttribute('name', 'viewport');
viewport.setAttribute('content', 'width=device-width, initial-scale=3.0');
document.head.append(viewport);

let favicon = document.createElement('link');
favicon.setAttribute('rel', 'icon');
favicon.setAttribute('type', 'image/x-icon');
favicon.setAttribute('href', '/favicon/ico.ico');
document.head.append(favicon);

/*             LINKS            */
// google APIS
let googleApis = document.createElement('link');
googleApis.setAttribute('rel', 'preconnect');
googleApis.setAttribute('href', 'https://fonts.googleapis.com');
document.head.append(googleApis);

// google APIS crossorigin anonymous
let googleApisCrossOrigin = document.createElement('link');
googleApisCrossOrigin.setAttribute('rel', 'preconnect');
googleApisCrossOrigin.setAttribute('href', 'https://fonts.googleapis.com');
googleApisCrossOrigin.crossOrigin = '';
document.head.append(googleApisCrossOrigin);

// black han sans
let blackHanSans = document.createElement('link');
blackHanSans.setAttribute('rel', 'stylesheet');
blackHanSans.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
document.head.append(blackHanSans);

// poppins
let poppins = document.createElement('link');
poppins.setAttribute('rel', 'stylesheet');
poppins.setAttribute('href', "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
document.head.append(poppins);

// audiowide sofia trirong
let audiowideSofiaTrirong = document.createElement('link');
audiowideSofiaTrirong.setAttribute('rel', 'stylesheet');
audiowideSofiaTrirong.setAttribute('href', 'https://fonts.googleapis.com/css?family=Audiowide|Sofia|Trirong');
document.head.append(audiowideSofiaTrirong);

// roboto
let roboto = document.createElement('link');
roboto.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
roboto.setAttribute('rel', 'stylesheet');

// font-awesome
let fontAwesome = document.createElement('link');
fontAwesome.setAttribute('rel', 'stylesheet');
fontAwesome.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
document.head.append(fontAwesome);

let indexCss = document.createElement('link');
indexCss.setAttribute('rel', 'stylesheet');
indexCss.setAttribute('href', '/style/index.css');
document.head.append(indexCss);

document.addEventListener('DOMContentLoaded', function() {
    document.body.setAttribute('class', titleContent);
    // main
    let main = document.createElement('main');

    let sectionMenu = document.createElement('section');
    sectionMenu.setAttribute('id', 'menu');
    let h2Fs = document.createElement('h2');
    h2Fs.setAttribute('id', 'fs');
    h2Fs.append('FS');
    let divMenu = document.createElement('div');
    divMenu.setAttribute('id', 'menu');
    divMenu.setAttribute('class', 'show');
    let buttonShow = document.createElement('button');
    buttonShow.setAttribute('id', 'menu');
    buttonShow.setAttribute('class', 'show');
    buttonShow.append('Show');
    let navFs = document.querySelector('nav#fs');
    divMenu.append(h2Fs);
    divMenu.append(navFs);
    sectionMenu.append(buttonShow);
    sectionMenu.append(divMenu);
    main.append(sectionMenu);
    
    // FORM
    console.log(document.body.firstElementChild);
    if(window.location.href.split('/').pop().match(/^.*(.html)$/)) {
	document.body.setAttribute('class', 'HTML');
	main.append(document.body.firstElementChild);
    };
    // header
    let headerGenerate = document.createElement('header');
    headerGenerate.setAttribute('id', 'generate');
    if (window.location.href == "/") {
	let headerMkt = document.createElement('header');
	headerMkt.setAttribute('id', 'mkt');
	let sectionNavigator = document.querySelector('section#navigator');
	let figureImages = document.createElement('figure');
	figureImages.setAttribute('id', 'header-images');
	sectionNavigator.append(figureImages);
	headerMkt.append(sectionNavigator);
	document.body.insertBefore(headerMkt, document.body.firstElementChild);
    };
    document.body.insertBefore(headerGenerate, document.body.firstElementChild);
    document.body.append(main);

    buttonShow.addEventListener('click', function() {
	if (getComputedStyle(divMenu).display == 'none') {
	    divMenu.style.display = 'block';
	} else {
	    divMenu.style.display = 'none';
	}
    });

    let liBase = document.querySelectorAll('li.base');
    liBase.forEach(function(element, index) {
	element.addEventListener('click', function(e) {
	    if (e.target.firstElementChild) {
		let navSub = e.target.firstElementChild;
		if (getComputedStyle(navSub).display == "none") {
		    navSub.style.display = "block";
		} else {
		    navSub.style.display = "none";
		}
	    }
	});
    });
});
