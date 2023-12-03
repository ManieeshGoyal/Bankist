'use strict';

///////////////////////////////////////

//* =========================================================
//*Selecting Elements
//*==========================================================

const scrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const allSections = document.querySelectorAll('.section');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const operationsTab = document.querySelectorAll('.operations__tab');
const operationsContentAll = document.querySelectorAll('.operations__content');
const navBar = document.querySelector('.nav');
const header = document.querySelector('.header');

//* =========================================================
//*Modal Window
//*==========================================================

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(element => element.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//*==========================================================
//*Implementing Smooth Scrolling
//*==========================================================

const scrollToCoordinates = element => {
  const coordinates = element.getBoundingClientRect();
  window.scrollTo({
    top: coordinates.top + window.scrollY,
    left: coordinates.left + window.scrollx,
    behavior: 'smooth',
  });
};

// Scoll to button
scrollto.addEventListener('click', e => {
  scrollToCoordinates(section1);
});

// Nav-links
document.querySelector('.nav__links').addEventListener('click', event => {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) {
    const id = event.target.getAttribute('href');
    console.log(id);
    scrollToCoordinates(document.querySelector(id));
  }
});

//*==========================================================
//*Tabbed Component
//*==========================================================

document.querySelector('.operations').addEventListener('click', event => {
  //* Operation Tab

  const clicked = event.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;

  const dataTab = clicked.getAttribute('data-tab');
  operationsTab.forEach(tab => {
    tab.classList.remove('operations__tab--active');
    clicked.classList.add('operations__tab--active');
  });

  //*Operation Section

  const operationContent = document.querySelector(
    `.operations__content--${dataTab}`
  );

  operationsContentAll.forEach(content => {
    content.classList.remove('operations__content--active');
    operationContent.classList.add('operations__content--active');
  });
});

//* =========================================================
//* Nav-Bar fade animation
//*==========================================================

/**
 * The function `handleHover` adjusts the opacity of the logo and navigation links when a navigation
 * link is hovered over or when the mouse leaves the navigation bar.
 */

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const navLinks = navBar.querySelectorAll('.nav__link');
    document.querySelector('#logo').style.opacity = this;

    navLinks.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
  }
}

navBar.addEventListener('mouseover', handleHover.bind(0.5));

navBar.addEventListener('mouseout', handleHover.bind(1));

//* =========================================================
//* Sticky Nav-Bar
//*==========================================================

const navHeight = navBar.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        navBar.classList.add('sticky');
      } else {
        navBar.classList.remove('sticky');
      }
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);

headerObserver.observe(header);

//* =========================================================
//* Reveal Sections
//*==========================================================

const observeSection = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    });
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSections.forEach(section => {
  section.classList.add('section--hidden');
  observeSection.observe(section);
});

//* =========================================================
//* Lazy Loading Images
//*==========================================================

const imageTarget = document.querySelectorAll('[data-src]');
const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    console.log(entry.isIntersecting);

    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img');

    // entry.target.addEventListener('load', () => {});
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-300px',
  }
);

imageTarget.forEach(element => {
  imageObserver.observe(element);
});



