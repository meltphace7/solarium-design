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

//////////////// PRODUCT CATEGORY SLIDER /////////////
const productTabContainer = document.querySelector(".product-tabs-container");
const firstTab = productTabContainer.querySelector(":first-child");
const productSlider = document.querySelector(".product-slider");
const lineSelector = document.querySelector(".line-selector");

// ENSURES ACTIVE TAB ALWAYS INITIALLY UNDER THE FIRST TAB ON SCREEN RESIZE
window.addEventListener("resize", (event) => {
  const activeTab = document.querySelector(".product-tab--active");
  lineSelector.style.left = `${activeTab.offsetLeft}px`;
});

// SETS LINE SELECTOR POSITION UNDER FIRST TAB
const setSelectorLine = function () {
  lineSelector.style.display = "block";
  lineSelector.style.width = `${
    firstTab.offsetWidth - firstTab.offsetWidth / 2
  }px`;
  lineSelector.style.left = `${firstTab.offsetLeft}px`;
};
setSelectorLine();

// CHANGES ACTIVE TAB DISPLAYS CORRESPONDING ITEMS ON VIEWPORT
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
    clicked.offsetWidth - clicked.offsetWidth / 2
  }px`;
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

// MOBILE ONLY - CHANGES ACTIVE TAB BASED ON PRODUCT IN VIEWPORT
let currentGroup = null;
productSlider.addEventListener("scroll", (event) => {
  if (window.screen.width > 492) return;
  let scrollLeft = productSlider.scrollLeft;
  let childWidth = productSlider.offsetWidth;
  let newGroup;

  if (scrollLeft < childWidth * 2.77) {
    console.log("SECTION ONE");
    newGroup = 1;
  } else if (scrollLeft > childWidth * 2.77 && scrollLeft < childWidth * 5.56) {
    console.log("SECTION TWO");
    newGroup = 2;
  } else {
    console.log("SECTION THREE");
    newGroup = 3;
  }
  if (currentGroup !== newGroup) {
    // REMOVE ACTIVE CLASS FROM ALL TABS
    document
      .querySelectorAll(".product-tab")
      .forEach((tab) => tab.classList.remove("product-tab--active"));
    // ADD ACTIVE CLASS To APPROPRIATE TAB
    const activeClass = document.querySelector(
      `.product-tab[data-tab="${newGroup}"]`
    );
    activeClass.classList.add("product-tab--active");
    lineSelector.style.width = `${
      activeClass.offsetWidth - activeClass.offsetWidth / 2
    }px`;
    lineSelector.style.left = `${activeClass.offsetLeft}px`;
  }
});
