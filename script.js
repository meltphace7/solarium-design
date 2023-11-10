"use strict";

//// INTERSECTION OBSERVER - SECTION POP-UP ANIMATION ////
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
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

const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");
const closeSearchBtn = document.querySelector(".close-search");
const overlay = document.querySelector(".overlay");

searchBtn.addEventListener("click", (e) => {
  console.log("CLICK");
  if (searchBar.classList.contains("hidden")) {
    searchBar.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    searchBar.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

closeSearchBtn.addEventListener("click", (e) => {
  searchBar.classList.add("hidden");
  overlay.classList.add("hidden");
});

//// PRODUCT CATEGORY SLIDER ////

const productTabContainer = document.querySelector(".product-tabs-container");
const firstTab = productTabContainer.querySelector(":first-child");
const productSlider = document.querySelector(".product-slider");
const lineSelector = document.querySelector(".line-selector");

// screen resize
window.addEventListener("resize", (event) => {
  const activeTab = document.querySelector(".product-tab--active");
  lineSelector.style.left = `${activeTab.offsetLeft}px`;
});

// SET LINE SELECTOR POSITION UNDER FIRST TAB
const setSelectorLine = function () {
  lineSelector.style.display = "block";
  lineSelector.style.width = `${
    firstTab.offsetWidth - firstTab.offsetWidth / 2
  }px`;
  lineSelector.style.left = `${firstTab.offsetLeft}px`;
};

setSelectorLine();

productTabContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".product-tab");
  if (!clicked) return;
  const curSlideGroup = clicked.dataset.tab;
  console.log(curSlideGroup);
  console.log(window.screen.width);

  // REMOVE ACTIVE CLASS FROM ALL TABS
  document
    .querySelectorAll(".product-tab")
    .forEach((tab) => tab.classList.remove("product-tab--active"));

  // ADD ACTIVE CLASS TO CLICKED TAB
  document
    .querySelector(`.product-tab[data-tab="${curSlideGroup}"]`)
    .classList.add("product-tab--active");

  // MOVE LINE SELECTOR UNDER ACTIVE TAB
    lineSelector.style.width = `${
    clicked.offsetWidth - clicked.offsetWidth / 2}px`;
    lineSelector.style.left = `${clicked.offsetLeft}px`;
  // SCROLL TO GROUP
    let childWidth;
  if (window.screen.width < 492) {
    childWidth = productSlider.offsetWidth * 1;

    if (curSlideGroup === "1") {
      productSlider.scrollLeft = 0;
    }

    if (curSlideGroup === "2") {
      productSlider.scrollLeft = childWidth * 3;
    }

    if (curSlideGroup === "3") {
      productSlider.scrollLeft = childWidth * 6;
    }
  } else {
    childWidth = productSlider.offsetWidth * 0.333333;
    if (curSlideGroup === "1") {
      productSlider.scrollLeft = 0;
    }

    if (curSlideGroup === "2") {
      productSlider.scrollLeft = childWidth * 3;
    }

    if (curSlideGroup === "3") {
      productSlider.scrollLeft = childWidth * 6;
    }
  }
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const productItem = document.querySelector('.product-slider-item');

isInViewport(productItem)

let currentGroup = null;
productSlider.addEventListener('scroll', (event) => {
  if (window.screen.width > 492) return;
   let scrollLeft = productSlider.scrollLeft;
  let childWidth = productSlider.offsetWidth;
  let newGroup;

      console.log("scroll left", scrollLeft);
      console.log("scroll width", childWidth);

  if (scrollLeft < childWidth * 2.77) {
    console.log('SECTION ONE')
    newGroup = 1;
  } else if(scrollLeft > childWidth * 2.77 && scrollLeft < childWidth * 5.56 ) {
    console.log('SECTION TWO')
    newGroup = 2;
  } else {
    console.log('SECTION THREE')
    newGroup = 3;
  }
  if (currentGroup !== newGroup) {
    // REMOVE ACTIVE CLASS FROM ALL TABS
    document.querySelectorAll('.product-tab').forEach(tab => tab.classList.remove('product-tab--active'))
    // ADD ACTIVE CLASS
    const activeClass = document.querySelector(`.product-tab[data-tab="${newGroup}"]`);
    activeClass.classList.add("product-tab--active");
        lineSelector.style.width = `${
          activeClass.offsetWidth - activeClass.offsetWidth / 2
        }px`;
        lineSelector.style.left = `${activeClass.offsetLeft}px`;
    
  }

  
})



// const productTabContainer = document.querySelector(".product-slider-tabs");
// const productSlides = document.querySelectorAll(".product-collection");
// const lineSelector = document.querySelector('.line-selector');

// const setSelectorLine = function () {
//   const firstTab = productTabContainer.querySelector(':first-child');
//   lineSelector.style.display = "block";
//   lineSelector.style.width = `${
//     firstTab.offsetWidth - firstTab.offsetWidth / 2
//   }px`;
//   lineSelector.style.left = `${firstTab.offsetLeft}px`;
// }

// setSelectorLine()

// productTabContainer.addEventListener('click', (event) => {
//   const clicked = event.target.closest(".product-slider-tab");
//   if (!clicked) return;
//   const curSlide = clicked.dataset.tab;

//   // ___ REMOVE ACTIVE CLASS FROM TABS AND SLIDES //
//   document
//     .querySelectorAll(".product-slider-tab")
//     .forEach((tab) => tab.classList.remove("product-slider-tab--active"));
//   productSlides.forEach((slide) =>
//     slide.classList.remove("product-collection--active")
//   );
//   //////////////////////////////////////
//   // ___ MOVE LINE SELECTOR UNDER ACTIVE TAB //
//     lineSelector.style.width = `${clicked.offsetWidth - clicked.offsetWidth / 2}px`;
//     lineSelector.style.left = `${clicked.offsetLeft}px`;
//   // ___ ADD ACTIVE CLASS FROM TABS AND SLIDES //
//   document
//     .querySelector(`.product-slider-tab[data-tab="${clicked.dataset.tab}"]`)
//     .classList.add("product-slider-tab--active");

//   document
//     .querySelector(`.product-collection-${clicked.dataset.tab}`)
//     .classList.add("product-collection--active");
// }
// )
