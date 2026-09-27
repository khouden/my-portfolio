let menubtn = document.querySelector(".menubtn");
let closebtn = document.querySelectorAll(".closebtn");
let mobileHeader = document.querySelector(".mobileHeader");
menubtn.addEventListener("click", function () {
  mobileHeader.style.transform = `translateX(0%)`;
});
closebtn.forEach((element) => {
  element.addEventListener("click", function () {
    mobileHeader.style.transform = `translateX(100%)`;
  });
});

// about-options - New Tab System
const aboutTabs = document.querySelectorAll(".about-tab");
const tabPanes = document.querySelectorAll(".tab-pane");

aboutTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and panes
    aboutTabs.forEach((t) => t.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked tab
    tab.classList.add("active");

    // Show corresponding pane
    const tabId = tab.dataset.tab + "-tab";
    document.getElementById(tabId).classList.add("active");
  });
});

// change logo color when hover

let skillCard = document.querySelectorAll(".skill");
skillCard.forEach((card) => {
  let img = card.lastElementChild;
  card.addEventListener("mouseenter", function () {
    if (img.tagName == "IMG") {
      img.src = img.src.slice(0, -4) + "2.png";
    }
  });
  card.addEventListener("mouseleave", function () {
    if (img.tagName == "IMG") {
      img.src = img.src.slice(0, -5) + ".png";
    }
  });
});

// work section for the slider

// Technology icons mapping
const techIcons = {
  React: "fa-brands fa-react",
  Laravel: "fa-brands fa-laravel",
  Blade: "fa-solid fa-leaf",
  HTML5: "fa-brands fa-html5",
  CSS3: "fa-brands fa-css3-alt",
  JavaScript: "fa-brands fa-js",
  Python: "fa-brands fa-python",
  PHP: "fa-brands fa-php",
  "Node.js": "fa-brands fa-node-js",
  Vue: "fa-brands fa-vuejs",
  "Vue.js": "fa-brands fa-vuejs",
  Bootstrap: "fa-brands fa-bootstrap",
  Sass: "fa-brands fa-sass",
  Git: "fa-brands fa-git-alt",
  GitHub: "fa-brands fa-github",
  MySQL: "fa-solid fa-database",
  PostgreSQL: "fa-solid fa-database",
  FastAPI: "fa-solid fa-bolt",
  Tailwind: "fa-solid fa-wind",
  "Tailwind CSS": "fa-solid fa-wind",
  "Azure AI": "fa-solid fa-cloud",
  "Gemini API": "fa-solid fa-wand-magic-sparkles",
  Docker: "fa-brands fa-docker",
};

let projects = [
  {
    id: 1,
    title: "AI Web Platform",
    description:
      "All-in-one AI platform integrating translation, text summarization, grammatical correction, YouTube and audio transcription, and OCR. Built with Vue.js, FastAPI, Azure AI, and Gemini API, complete with authentication, file uploads, history, and favorites.",
    source: "/imgs/projects/ai plateform.webp",
    stack: ["Vue.js", "FastAPI", "Azure AI", "Gemini API"],
    liveProject: "https://www.3ssila-ai.tech/",
    githubResp: null,
  },
  {
    id: 2,
    title: "Impulse Project - Corporate Website",
    description:
      "Corporate showcase website developed for a French client to exhibit their professional consulting services and enable prospective clients to initiate contact and request quotes. Built with Laravel and Blade, and deployed online.",
    source: "/imgs/projects/impulse-project.webp",
    stack: ["Laravel", "Blade", "PHP", "CSS3"],
    liveProject: "https://www.impulse-project.fr/",
    githubResp: null,
    isClientProject: true,
  },
  {
    id: 3,
    title: "Twist Food - Restaurant Website",
    description:
      "Showcase website designed and developed for a fast-casual restaurant, featuring interactive menu browsing, venue information, Google Maps integration, and an integrated customer ordering flow via WhatsApp.",
    source: "/imgs/projects/twistfood.webp",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    liveProject: "https://twist-food.vercel.app/",
    githubResp: null,
  },
  {
    id: 4,
    title: "School Absence Management System",
    description:
      "Full-stack web application designed for school attendance and absence tracking by class, with role-based dashboards, RESTful APIs, Laravel Sanctum token authentication, and automated PDF report generation.",
    source: "/imgs/projects/gestion_absences.webp",
    stack: ["Laravel", "React", "MySQL"],
    liveProject: null,
    githubResp: "https://github.com/khouden/gestion_absences.git",
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce platform featuring product browsing, AJAX-driven shopping cart management, Laravel Breeze authentication, and an administrative dashboard for managing products, categories, and customers.",
    source: "/imgs/projects/e-commerce website.webp",
    stack: ["Laravel", "Blade", "PHP", "MySQL"],
    liveProject: null,
    githubResp: "https://github.com/khouden/_e-commerce-laravel",
  },
];

// DOM Elements
const projectPreview = document.querySelector(".project-preview");
const projectTitle = document.querySelector(".project-title");
const projectDescription = document.querySelector(".project-description");
const techStack = document.querySelector(".tech-stack");
const projectActions = document.querySelector(".project-actions");
const thumbnailStrip = document.querySelector(".thumbnail-strip");
const currentNum = document.querySelector(".current-num");
const totalNum = document.querySelector(".total-num");
const prevBtn = document.querySelector(".nav-prev");
const nextBtn = document.querySelector(".nav-next");

let currentIndex = 0;
let sliderInterval;

// Set total number
totalNum.textContent = String(projects.length).padStart(2, "0");

// Generate thumbnails
function generateThumbnails() {
  thumbnailStrip.innerHTML = projects
    .map(
      (prj, index) => `
    <button class="thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
      <img src="${prj.source}" alt="${prj.title}" loading="lazy">
      <div class="thumbnail-overlay"></div>
    </button>
  `,
    )
    .join("");

  // Add click listeners
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      goToProject(parseInt(thumb.dataset.index));
    });
  });
}

// Update active thumbnail
function updateThumbnails(index) {
  document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

// Render project
function renderProject(index) {
  const project = projects[index];

  // Add animation class
  projectPreview.classList.add("animating");

  // Update preview image
  projectPreview.innerHTML = `
    <img src="${project.source}" alt="${project.title}" class="preview-img">
    <div class="preview-overlay"></div>
  `;

  // Update title with animation
  projectTitle.textContent = project.title;

  // Update description
  projectDescription.textContent = project.description;

  // Update tech stack with icons
  techStack.innerHTML = project.stack
    .map(
      (tech) => `
    <span class="tech-badge">
      <i class="${techIcons[tech] || "fa-solid fa-code"}"></i>
      ${tech}
    </span>
  `,
    )
    .join("");

  // Update action buttons
  projectActions.innerHTML = `
    ${
      project.liveProject
        ? `
      <a href="${project.liveProject}" target="_blank" class="action-btn primary">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        <span>Live Demo</span>
      </a>
    `
        : ""
    }
    ${
      project.githubResp
        ? `
      <a href="${project.githubResp}" target="_blank" class="action-btn secondary">
        <i class="fa-brands fa-github"></i>
        <span>Source Code</span>
      </a>
    `
        : ""
    }
    ${
      !project.liveProject && !project.githubResp
        ? `
      <a href="#contact" class="action-btn secondary">
        <i class="fa-solid fa-envelope"></i>
        <span>Inquire About Project</span>
      </a>
    `
        : ""
    }
  `;

  // Update counter
  currentNum.textContent = String(index + 1).padStart(2, "0");

  // Update thumbnails
  updateThumbnails(index);

  // Remove animation class
  setTimeout(() => {
    projectPreview.classList.remove("animating");
  }, 500);
}

// Navigation functions
function goToProject(index) {
  currentIndex = index;
  renderProject(currentIndex);
  resetInterval();
}

function goToPrev() {
  currentIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  renderProject(currentIndex);
  resetInterval();
}

function goToNext() {
  currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  renderProject(currentIndex);
  resetInterval();
}

function resetInterval() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(goToNext, 8000);
}

// Event listeners
prevBtn.addEventListener("click", goToPrev);
nextBtn.addEventListener("click", goToNext);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goToPrev();
  if (e.key === "ArrowRight") goToNext();
});

// Initialize
generateThumbnails();
renderProject(0);
sliderInterval = setInterval(goToNext, 8000);

// for contact section
let inputs = document.querySelectorAll(".forminput");
inputs.forEach((input) => {
  let label = input.previousElementSibling;
  if (input.value.length != 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transform = "translateY(0px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
  input.addEventListener("focus", moveOnFocus);
  input.addEventListener("focusout", moveOutFocus);
});

function moveOnFocus() {
  let label = this.previousElementSibling;
  if (this.value.length == 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transition = `transform 0.2s ease ${
        i / 10
      }s, color 0.2s linear`;
      label.children[i].style.transform = "translateY(0px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
}
function moveOutFocus() {
  let label = this.previousElementSibling;
  if (this.value.length == 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transition = `transform 0.2s ease ${i / 10}s`;
      label.children[i].style.transform = "translateY(43px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
}

// year for footer page

let year = document.querySelector("#year");
year.innerHTML = new Date().getFullYear();

// loader code
document.body.style.overflow = "hidden";

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-screen");
  loader.classList.add("hidden");
  document.body.style.overflow = "visible";
});

// floot navbar
let footNav = document.querySelector(".floot-nav-screen");
let footer = document.querySelector("footer");
// float nav hiding
// float nav hiding
window.addEventListener("scroll", function () {
  if (
    window.scrollY > 50 &&
    window.scrollY < footer.offsetTop - window.innerHeight + 10
  ) {
    footNav.classList.remove("hidden2");
  } else {
    footNav.classList.add("hidden2");
    footNav.classList.add("hidden2");
  }
});

// float nav selection

document.addEventListener("DOMContentLoaded", function () {
  let footopts = document.querySelectorAll(".footopt");
  let home = document.querySelector("#home");
  let about = document.querySelector("#about");
  let work = document.querySelector("#work");
  let contact = document.querySelector("#contact");

  window.addEventListener("scroll", function () {
    if (
      window.scrollY >= home.offsetTop - home.offsetHeight / 2 &&
      window.scrollY < about.offsetTop - about.offsetHeight / 2
    ) {
      footopts.forEach((opt) => opt.classList.remove("selectedfootopt"));
      footopts[0].classList.add("selectedfootopt");
    } else if (
      window.scrollY >= about.offsetTop - about.offsetHeight / 2 &&
      window.scrollY < work.offsetTop - work.offsetHeight / 2
    ) {
      footopts.forEach((opt) => opt.classList.remove("selectedfootopt"));
      footopts[1].classList.add("selectedfootopt");
    } else if (
      window.scrollY >= work.offsetTop - work.offsetHeight / 2 &&
      window.scrollY < contact.offsetTop - contact.offsetHeight / 2
    ) {
      footopts.forEach((opt) => opt.classList.remove("selectedfootopt"));
      footopts[2].classList.add("selectedfootopt");
    } else if (window.scrollY >= contact.offsetTop - contact.offsetHeight / 2) {
      footopts.forEach((opt) => opt.classList.remove("selectedfootopt"));
      footopts[3].classList.add("selectedfootopt");
    }
  });
});

//  contact form validation

// clear form after submission
const form = document.querySelector("#contactform");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;
  const name = document.getElementById("contactname").value.trim();
  const email = document.getElementById("contactemail").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorDiv = document.getElementById("error");
  errorDiv.innerHTML = "";

  if (name.length < 2) {
    valid = false;
    errorDiv.innerHTML += "<p>*Name must be at least 2 letters.</p>";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    valid = false;
    errorDiv.innerHTML += "<p>*Email must be valid.</p>";
  }

  if (message.length < 2) {
    valid = false;
    errorDiv.innerHTML += "<p>*Message must be at least 2 letters.</p>";
  }

  if (valid) {
    this.submit();
    this.reset();
  }
});

// Scroll animation fallback for browsers without CSS animation-timeline support
if (
  typeof CSS === "undefined" ||
  !CSS.supports ||
  !CSS.supports("animation-timeline", "view()")
) {
  const animatedElements = document.querySelectorAll(
    ".block, .block2, .block3, .block-right, .block-up"
  );

  animatedElements.forEach((el) => {
    el.classList.add("scroll-fallback-init");
  });

  const scrollObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-fallback-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedElements.forEach((el) => scrollObserver.observe(el));
}
