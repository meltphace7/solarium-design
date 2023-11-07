"use-strict"

//// IMAGE SLIDER ////
const slides = document.querySelectorAll(".slide");
const sliderBtnPrev = document.querySelector(".slider-btn-prev");
const sliderBtnNext = document.querySelector(".slider-btn-next");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(curSlide);

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-dot="${i}" ></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dot")
    .forEach((s) => s.classList.remove("dot--active"));
  document
    .querySelector(`.dot[data-dot="${slide}"]`)
    .classList.add("dot--active");
};

activateDot(curSlide);

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

sliderBtnPrev.addEventListener("click", (e) => {
  prevSlide();
});
sliderBtnNext.addEventListener("click", (e) => {
  console.log("Forwards");
  nextSlide();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".dot");
  if (!clicked) return;
  const slide = clicked.dataset.dot;
  goToSlide(slide);
  activateDot(slide);
});

///// TABBED COMPONENT ///

const tabsContainer = document.querySelector('.tabs-container');
const tabSlides = document.querySelectorAll('.tab-slide');

tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.tab')
    if (!clicked) return;
    console.log(clicked.dataset.tab);
    document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('tab--active'));

    document.querySelector(`.tab[data-tab="${clicked.dataset.tab}"]`).classList.add('tab--active');

    tabSlides.forEach((slide) => slide.classList.remove('tab-slide--active'));
    document.querySelector(`.tab-slide-${clicked.dataset.tab}`).classList.add('tab-slide--active');
})