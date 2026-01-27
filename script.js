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
const aboutTabs = document.querySelectorAll('.about-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

aboutTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and panes
    aboutTabs.forEach(t => t.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    // Add active class to clicked tab
    tab.classList.add('active');

    // Show corresponding pane
    const tabId = tab.dataset.tab + '-tab';
    document.getElementById(tabId).classList.add('active');
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
  "React": "fa-brands fa-react",
  "Laravel": "fa-brands fa-laravel",
  "Blade": "fa-solid fa-leaf",
  "HTML5": "fa-brands fa-html5",
  "CSS3": "fa-brands fa-css3-alt",
  "JavaScript": "fa-brands fa-js",
  "Python": "fa-brands fa-python",
  "PHP": "fa-brands fa-php",
  "Node.js": "fa-brands fa-node-js",
  "Vue": "fa-brands fa-vuejs",
  "Bootstrap": "fa-brands fa-bootstrap",
  "Sass": "fa-brands fa-sass",
  "Git": "fa-brands fa-git-alt",
  "GitHub": "fa-brands fa-github"
};

let projects = [
  {
    id: 1,
    title: "Car Rental Website",
    description: "A comprehensive car rental web application built with React, allowing users to browse, book, and manage car rentals with ease. Features include vehicle filtering, booking management, and responsive design.",
    source: "/imgs/projects/_car-rentals.webp",
    stack: ["React", "CSS3", "JavaScript"],
    liveProject: "https://car-rental-react-js.vercel.app",
    githubResp: "https://github.com/khouden/CarRental-ReactJS",
  },
  {
    id: 2,
    title: "E-commerce Website",
    description: "A fully-featured e-commerce website built with Laravel and Blade, offering a seamless shopping experience with product listings, user authentication, and a secure checkout process.",
    source: "/imgs/projects/e-commerce website.webp",
    stack: ["Laravel", "Blade", "PHP", "CSS3"],
    liveProject: null,
    githubResp: "https://github.com/khouden/_e-commerce-laravel",
  },
  {
    id: 3,
    title: "E-Shopping Cart",
    description: "An interactive online shopping cart built with HTML, CSS, and JavaScript, featuring dynamic product listings and a responsive checkout process.",
    source: "/imgs/projects/eshoping cart project.webp",
    stack: ["HTML5", "CSS3", "JavaScript"],
    liveProject: "https://khouden.github.io/eshoping-Cart/",
    githubResp: "https://github.com/khouden/eshoping-Cart",
  },
  {
    id: 4,
    title: "Instagram Clone",
    description: "A responsive front-end clone of Instagram, showcasing photo and video feeds, and user profiles with pixel-perfect design accuracy.",
    source: "imgs/projects/instagram-clone.webp",
    stack: ["HTML5", "CSS3"],
    liveProject: "https://khouden.github.io/instagram-clone/",
    githubResp: "https://github.com/khouden/instagram-clone/",
  },
  {
    id: 5,
    title: "Arabic Website",
    description: "A landing page for an Arabic website, built with HTML, CSS, and JavaScript featuring RTL layout and cultural design elements.",
    source: "/imgs/projects/arabic-website.webp",
    stack: ["HTML5", "CSS3", "JavaScript"],
    liveProject: "https://khouden.github.io/arabicwebsite/",
    githubResp: "https://github.com/khouden/arabicwebsite",
  },
  {
    id: 6,
    title: "Library Book Loan",
    description: "A Python and Tkinter application for managing book loans and maintaining a catalog of available books with an intuitive desktop interface.",
    source: "/imgs/projects/library project.webp",
    stack: ["Python"],
    liveProject: null,
    githubResp: "https://github.com/khouden/projet-bibliotheque",
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
totalNum.textContent = String(projects.length).padStart(2, '0');

// Generate thumbnails
function generateThumbnails() {
  thumbnailStrip.innerHTML = projects.map((prj, index) => `
    <button class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${prj.source}" alt="${prj.title}" loading="lazy">
      <div class="thumbnail-overlay"></div>
    </button>
  `).join("");

  // Add click listeners
  document.querySelectorAll(".thumbnail").forEach(thumb => {
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
  techStack.innerHTML = project.stack.map(tech => `
    <span class="tech-badge">
      <i class="${techIcons[tech] || 'fa-solid fa-code'}"></i>
      ${tech}
    </span>
  `).join("");

  // Update action buttons
  projectActions.innerHTML = `
    ${project.liveProject ? `
      <a href="${project.liveProject}" target="_blank" class="action-btn primary">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        <span>Live Demo</span>
      </a>
    ` : ''}
    ${project.githubResp ? `
      <a href="${project.githubResp}" target="_blank" class="action-btn secondary">
        <i class="fa-brands fa-github"></i>
        <span>Source Code</span>
      </a>
    ` : ''}
  `;

  // Update counter
  currentNum.textContent = String(index + 1).padStart(2, '0');

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
      label.children[i].style.transition = `transform 0.2s ease ${i / 10
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



// animation for elements on small screens
let aboutCards = document.querySelector(".cards-about");
let cards = document.querySelectorAll(".card");

function changeAnimation() {
  if (window.innerWidth < 640) {
    aboutCards.classList.remove("block");
    cards.forEach((card) => {
      card.classList.add("block");
    });
  } else {
    aboutCards.classList.add("block");
    cards.forEach((card) => {
      card.classList.remove("block");
    });
  }
};




let projectsNavigation = document.querySelector(".projects-nav");
let projectsCards2 = document.querySelectorAll(".project-card");

function changeAnimation2() {
  if (window.innerWidth < 1000) {
    projectsNavigation.classList.remove("block2");
    projectsCards2.forEach((card) => {
      card.classList.add("block2");
    });
  } else {
    projectsNavigation.classList.add("block2");
    projectsCards2.forEach((card) => {
      card.classList.remove("block2");
    });
  }
}

changeAnimation();
changeAnimation2();

window.addEventListener("resize", changeAnimation);
window.addEventListener("resize", changeAnimation2);