const pages = document.querySelectorAll(".page");
const book = document.querySelector(".book");
const fsBtn = document.getElementById("fullscreenBtn");

let current = 0;
let busy = false;

function nextPage() {
  if (current < pages.length - 1) {
    pages[current].classList.add("flipped");
    pages[current].classList.remove("active");
    current++;
    pages[current].classList.add("active");
  }
}

function prevPage() {
  if (current > 0) {
    pages[current - 1].classList.remove("flipped");
    pages[current].classList.remove("active");
    current--;
    pages[current].classList.add("active");
  }
}

window.addEventListener("wheel", (e) => {
  if (busy) return;
  busy = true;

  e.deltaY > 0 ? nextPage() : prevPage();

  setTimeout(() => busy = false, 1000);
});

let startX = 0;

window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

window.addEventListener("touchend", (e) => {
  if (busy) return;

  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  busy = true;

  diff > 0 ? nextPage() : prevPage();

  setTimeout(() => busy = false, 1000);
});

let lastTap = 0;

book.addEventListener("touchend", () => {
  const now = Date.now();
  if (now - lastTap < 300) {
    book.classList.toggle("zoomed");
  }
  lastTap = now;
});

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

window.scrollTo(0, 1);
