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


//// PRODUCT CATEGORY SLIDER ////

const productTabContainer = document.querySelector(".product-slider-tabs");
const productSlides = document.querySelectorAll(".product-collection");
const lineSelector = document.querySelector('.line-selector')

productTabContainer.addEventListener('click', (event) => {
  const clicked = event.target.closest(".product-slider-tab");
  if (!clicked) return;
  const curSlide = clicked.dataset.tab;
  console.log(clicked);
  console.log(curSlide);

  // ___ REMOVE ACTIVE CLASS FROM TABS AND SLIDES //
  document
    .querySelectorAll(".product-slider-tab")
    .forEach((tab) => tab.classList.remove("product-slider-tab--active"));
  productSlides.forEach((slide) =>
    slide.classList.remove("product-collection--active")
  );

  // ___ MOVE LINE SELECTOR UNDER ACTIVE TAB //
  if (curSlide === '1') {
    lineSelector.style.transform = `translateX(0rem)`;
  }

    if (curSlide === "2") {
      lineSelector.style.transform = `translateX(100%)`;
    }
  
    if (curSlide === "3") {
      lineSelector.style.transform = `translateX(200%)`;
    }

  
  

  // ___ ADD ACTIVE CLASS FROM TABS AND SLIDES //
  document
    .querySelector(`.product-slider-tab[data-tab="${clicked.dataset.tab}"]`)
    .classList.add("product-slider-tab--active");

  document
    .querySelector(`.product-collection-${clicked.dataset.tab}`)
    .classList.add("product-collection--active");
}
)