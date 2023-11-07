"use strict";

//// INTERSECTION OBSERVER - SECTION POP-UP ANIMATION ////
const allSections = document.querySelectorAll(".section");


const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section, i) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// SEARCH BAR

const searchBtn = document.querySelector('.search-btn');
const searchBar = document.querySelector('.search-bar');
const closeSearchBtn = document.querySelector('.close-search');
const overlay = document.querySelector('.overlay');

searchBtn.addEventListener('click', (e) => {
  console.log('CLICK')
  if (searchBar.classList.contains('hidden')) {
    searchBar.classList.remove("hidden");
    overlay.classList.remove("hidden");

  } else {
    searchBar.classList.add("hidden");
    overlay.classList.add("hidden");
  }
  
})

closeSearchBtn.addEventListener('click', (e) => {
  searchBar.classList.add("hidden");
  overlay.classList.add("hidden");
})
