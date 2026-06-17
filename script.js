// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Cursor glow
const glow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Typed terminal
const lines = [
  "training_model.py --epochs 50 ...",
  "solving today's DSA problem ...",
  "evaluating best move: Nf3 ...",
  "git commit -m 'fix EDA notebook'",
  "bgmi_ranked.exe --mode competitive"
];
const typedEl = document.getElementById("typedText");
let li = 0, ci = 0, del = false;
function typeLoop() {
  const cur = lines[li];
  if (!del) {
    ci++;
    typedEl.textContent = cur.slice(0, ci);
    if (ci === cur.length) { del = true; setTimeout(typeLoop, 1800); return; }
  } else {
    ci--;
    typedEl.textContent = cur.slice(0, ci);
    if (ci === 0) { del = false; li = (li + 1) % lines.length; }
  }
  setTimeout(typeLoop, del ? 32 : 52);
}
typeLoop();

// Mobile nav
const toggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll-spy
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav__links a");
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    }
  });
}, { rootMargin: "-45% 0px -45% 0px" }).observe && sections.forEach(s =>
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" }).observe(s)
);

// Reveal on scroll
document.querySelectorAll(".section__inner, .pcard").forEach(el => el.classList.add("reveal"));
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); }
  });
}, { threshold: 0.1 }).observe && document.querySelectorAll(".reveal").forEach(el =>
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); } });
  }, { threshold: 0.1 }).observe(el)
);

// Contact form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const note = document.getElementById("formNote");
  note.textContent = "Thanks! Connect this form to Formspree or EmailJS to receive messages.";
  e.target.reset();
  setTimeout(() => { note.textContent = ""; }, 6000);
});