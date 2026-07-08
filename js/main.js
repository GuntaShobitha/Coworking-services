// STACKLY — main interactions
(function () {
  // Nav scroll state
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .split-img').forEach(el => io.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target + suffix; return; }
        el.textContent = cur + suffix;
        requestAnimationFrame(tick);
      };
      tick();
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cio.observe(el));

  // Dashboard sidebar mobile
  const dashToggle = document.querySelector('.dash-toggle');
  const dashSide = document.querySelector('.dash-side');
  if (dashToggle && dashSide) {
    dashToggle.addEventListener('click', () => dashSide.classList.toggle('open'));
  }
})();


const slides = document.querySelectorAll(".hero-slide");
const overlay = document.querySelector(".grid-overlay");

let current = 0;

// Create Grid
function createGrid(){

    overlay.innerHTML="";

    let cols = 16;
    let rows = 9;

    if(window.innerWidth < 992){
        cols = 12;
        rows = 7;
    }

    if(window.innerWidth < 768){
        cols = 8;
        rows = 6;
    }

    overlay.style.gridTemplateColumns=`repeat(${cols},1fr)`;
    overlay.style.gridTemplateRows=`repeat(${rows},1fr)`;

    const total = cols * rows;

    for(let i=0;i<total;i++){

        const box=document.createElement("div");
        box.className="grid-box";

        overlay.appendChild(box);

    }

}

createGrid();

window.addEventListener("resize",createGrid);

function animateGrid(){

    const boxes=document.querySelectorAll(".grid-box");

    boxes.forEach(box=>{

        box.classList.remove("hide");

    });

    boxes.forEach(box=>{

        const delay=Math.random()*700;

        setTimeout(()=>{

            box.classList.add("hide");

        },delay);

    });

}

function changeSlide(){

    animateGrid();

    setTimeout(()=>{

        slides[current].classList.remove("active");

        current=(current+1)%slides.length;

        slides[current].classList.add("active");

    },450);

}

setInterval(changeSlide,5000);