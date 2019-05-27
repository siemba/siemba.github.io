var scroll = new SmoothScroll();

/* Smooth scroll. */
if (typeof SmoothScroll !== 'undefined') {
  var scroll = new SmoothScroll('a[href*="#"]', {
    updateURL: false,
    easing: 'easeInOutCubic',
    speed: 600,
	  speedAsDuration: true,
  });
}

/* Contact form input field active/inactive handling */
function handleInputFieldChange(e) {
  if (e.target.value.length > 0) {
    e.target.classList.add('input-is-active');
  } else {
    e.target.classList.remove('input-is-active');
  }
}

var clientsToggleItems = document.getElementsByClassName('index-clients__items-toggle');
var clientToggle = false;

var navbar = document.getElementById('navbar');
var main = document.getElementById('main');

var mmVisibility = true;

function checkMaxWidth(x) {
  if (x.matches) {
    mmVisibility = true;
  } else {
    mmVisibility = false;
  }
}

function returnMaxWidth(x) {
  if (x.matches) {
    return true;
  } else {
    return false;
  }
}

var x = window.matchMedia("(max-width: 767px)");
checkMaxWidth(x);
x.addListener(checkMaxWidth);

var navToggle = document.getElementsByClassName('nav-menu-toggle')[0];

window.onclick = function(e) {
  // Close navigation drawer when clicked outside anywhere.
  if (!navbar.contains(e.target) && navbar.className === 'nav-active') {
    if (e.target !== navToggle) {
      navToggle.className = "nav-menu-toggle";
      navbar.className = "";
    }
  }

  /* Mobile navigation trigger. */
  if (e.target.className === 'nav-menu-toggle') {
    navbar.className = "nav-active";
    e.target.className = "nav-menu-toggle nav-menu-toggle--active";
  } else if (e.target.className === 'nav-menu-toggle nav-menu-toggle--active') {
    navbar.className = "";
    e.target.className = "nav-menu-toggle";
  }

  if (document.body.id === "index") {
    onclickIndex(e);
  }

  if (document.body.id === "services" || document.body.id === "work") {
    onclickApproach(e);
  }
}

/* Checks if an element is visible on the screen or not. */
function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

var indexHero = document.getElementById('page-hero');
var navLogo = document.getElementsByClassName('nav-logo')[0];

/* Carousel */
if (document.body.id === "index" || document.body.id === "services" || document.body.id === "about") {
  if (returnMaxWidth(x)) {
    var flkty = new Flickity( '.main-carousel', {
      cellAlign: 'left',
      autoPlay: 3000,
      prevNextButtons: false,
      fade: false,
    });
  } else {
    var flkty = new Flickity( '.main-carousel', {
      cellAlign: 'left',
      autoPlay: 3000,
      prevNextButtons: false,
      fade: true,
    });
  }
}

if (document.body.id === "index") {
  if (returnMaxWidth(x)) {
    var fl = new Flickity( '.index-cs-items', {
      cellAlign: "left",
      contain: true,
      pageDots: false,
      arrowShape: "M93.5 50l-85.4.5m28.5 29.7L6.5 50l30.2-30.2"
    });
  } else {
    var fl = new Flickity( '.index-cs-items', {
      cellAlign: "left",
      contain: true,
      groupCells: 2,
      pageDots: false,
      arrowShape: "M93.5 50l-85.4.5m28.5 29.7L6.5 50l30.2-30.2"
    });
  }
}

if (document.body.id === "services" || document.body.id === "cs") {
  if (returnMaxWidth(x)) {
    var flkty = new Flickity( '.views-carousel', {
      draggable: true,
      cellAlign: 'left',
      pageDots: false,
      arrowShape: 'M98.2 50l-94.6.5M35.2 83.4L1.8 50l33.4-33.4',
    });
  } else {
    var flkty = new Flickity( '.views-carousel', {
      draggable: false,
      cellAlign: 'left',
      groupCells: 3,
      pageDots: false,
      arrowShape: 'M98.2 50l-94.6.5M35.2 83.4L1.8 50l33.4-33.4',
    });
  }
}

var navContactBtn = document.getElementsByClassName('nav-contact-btn')[0];

window.onscroll = function(e) {
  if (document.body.id !== 'contact') {
    if (window.scrollY < 50 || scrollDirection() === 'up') {
      navContactBtn.className = 'nav-contact-btn';
    } else {
      navContactBtn.className = 'nav-contact-btn nav-contact-btn--hide';
    }
  }

  if (document.body.id === "about") {
    var stagesContainer = document.getElementsByClassName('about-stages__items')[0];
    var stagesItems = stagesContainer.children;
    if (checkVisible(stagesContainer)) {
      displayAboutStages(stagesItems);
    }
  }
};

// Returns scroll direction.
var lastScrollTop = 0;
var scDir = null;
function scrollDirection() {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop){
    scDir = 'dn';
  } else {
    scDir = 'up';
  }
  lastScrollTop = st <= 0 ? 0 : st;
  return scDir;
}

function onclickApproach(e) {
  if (e.target.className === 'services-approach__item--head' || e.target.parentElement.className === 'services-approach__item--head') {
    if (e.target.parentElement.className === 'services-approach__item') {
      e.target.parentElement.className = "services-approach__item services-approach__item--active";
    } else if (e.target.parentElement.className === 'services-approach__item--head') {
      e.target.parentElement.parentElement.className = "services-approach__item services-approach__item--active";
    } else if (e.target.parentElement.className === 'services-approach__item services-approach__item--active') {
      e.target.parentElement.className = "services-approach__item";
    } else if (e.target.parentElement.parentElement.className === 'services-approach__item services-approach__item--active') {
      e.target.parentElement.parentElement.className = "services-approach__item";
    }
  }
}

// Handle the animation of stages section on about page.
var displayAboutStagesToggled = true;

function displayAboutStages(items) {
  if (displayAboutStagesToggled) {
    var process = document.getElementsByClassName('about-stages--process')[0];
    process.className = 'about-stages--process about-stages--process-show';
    for(var i = 0; i < items.length; i++) {
      items[i].className = 'about-stages__item about-stages__item-show';
    }
  }

  displayAboutStagesToggled = false;
}

// Fade in animation on page load.
window.onload = function() {
  main.className = "main-active";
}
