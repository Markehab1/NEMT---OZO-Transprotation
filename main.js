const header = document.querySelector("header");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");
const faqItems = document.querySelectorAll(".faq-item");

/* -------------------- 1. Header background on scroll -------------------- */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* -------------------- 2. Nav link click: smooth scroll -------------------- */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------- 3. Active underline (scroll-position based) -------------------- */
function updateActiveLink() {
  let currentId = "";

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 10
  ) {
    currentId = "contact";
  } else {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

/* -------------------- 4. FAQ accordion -------------------- */
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // close every item first
    faqItems.forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".faq-answer").style.maxHeight = null;
    });

    // re-open the clicked one only if it wasn't already open
    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});


const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.querySelector("nav");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
  hamburgerBtn.classList.toggle("active");
});

// close menu after clicking a link (mobile UX)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    hamburgerBtn.classList.remove("active");
  });
});