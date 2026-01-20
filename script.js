const pages = document.querySelectorAll(".page");
let current = 0;
let busy = false;

// ----- Page Turn Functions -----
function next() {
  if (current < pages.length - 1) {
    pages[current].classList.add("flipped");
    pages[current].classList.remove("active");
    current++;
    pages[current].classList.add("active");
  }
}

function prev() {
  if (current > 0) {
    pages[current - 1].classList.remove("flipped");
    pages[current].classList.remove("active");
    current--;
    pages[current].classList.add("active");
  }
}

// ----- Desktop Scroll -----
window.addEventListener("wheel", (e) => {
  if (busy) return;
  busy = true;

  e.deltaY > 0 ? next() : prev();

  setTimeout(() => busy = false, 1000);
});

// ----- Mobile Swipe -----
let startX = 0;
let endX = 0;

window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (busy) return;

  let diff = startX - endX;

  // Minimum swipe distance
  if (Math.abs(diff) < 50) return;

  busy = true;

  if (diff > 0) {
    next();   // swipe left
  } else {
    prev();   // swipe right
  }

  setTimeout(() => busy = false, 1000);
}
