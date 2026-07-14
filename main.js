const header = document.querySelector("header");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");
const faqItems = document.querySelectorAll(".faq-item");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.querySelector("nav");

/* -------------------- 1. Header background on scroll -------------------- */
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* -------------------- 2. Nav link click: smooth scroll (same page) or navigate (other pages) -------------------- */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href"); // e.g. "#services" or "index.html#services"
    const hashIndex = href.indexOf("#");
    const hash = hashIndex !== -1 ? href.slice(hashIndex + 1) : null;
    const targetSection = hash ? document.getElementById(hash) : null;

    if (targetSection) {
      // section exists on this page — smooth scroll, don't navigate away
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    // otherwise let the browser follow the link normally (e.g. to index.html#services)
  });
});

/* -------------------- 2b. On page load, smooth-scroll to a hash if we just landed here from another page -------------------- */
window.addEventListener("load", () => {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});

/* -------------------- 3. Active underline (scroll-position based) -------------------- */
if (navLinks.length) {
  function updateActiveLink() {
    let currentId = "";

    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10
    ) {
      currentId = "contact";
    } else if (sections.length) {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        if (scrollPos >= section.offsetTop) {
          currentId = section.id;
        }
      });
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const hashIndex = href.indexOf("#");
      const linkHash = hashIndex !== -1 ? href.slice(hashIndex + 1) : "";
      link.classList.toggle("active", linkHash === currentId);
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
}

/* -------------------- 4. FAQ -------------------- */
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

/* -------------------- 5. Hamburger menu (only runs if nav/hamburger exist on this page) -------------------- */
if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("nav-open");
    hamburgerBtn.classList.toggle("active");
  });

  // close menu after clicking a link (mobile UX)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav-open");
      hamburgerBtn.classList.remove("active");
    });
  });

  // close menu on outside click
  document.addEventListener("click", (e) => {
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnHamburger = hamburgerBtn.contains(e.target);

    if (
      navMenu.classList.contains("nav-open") &&
      !isClickInsideNav &&
      !isClickOnHamburger
    ) {
      navMenu.classList.remove("nav-open");
      hamburgerBtn.classList.remove("active");
    }
  });
}

/* -------------------- 6. Preloader (always runs, regardless of what's on the page) -------------------- */
document.body.classList.add("loading");

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  preloader.classList.add("hidden");
  document.body.classList.remove("loading");

  preloader.addEventListener("transitionend", () => {
    preloader.remove();
  });
});