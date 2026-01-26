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

// about-options

let optionsBtn = document.querySelectorAll(".option-btn");
let resultPages = document.querySelectorAll(".result-about");
optionsBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    optionsBtn.forEach((b) => {
      b.classList.remove("selected-option");
    });
    btn.classList.add("selected-option");
    let selectedDiv = document.querySelector(`#${btn.id}-page`);
    resultPages.forEach((page) => {
      page.style.display = "none";
    });
    selectedDiv.style.display = "block";
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

let projectsContainer = document.querySelector(".project-image");
let projectsNav = document.querySelector(".projects-nav");

let projects = [
  {
    id: 1,
    title: "Car Rental Website",
    description:
      "A comprehensive car rental web application built with React, allowing users to browse, book, and manage car rentals with ease.",
    source: "/imgs/projects/_car-rentals.webp",
    stack: "React",
    liveProject: "https://car-rental-react-js.vercel.app",
    githubResp: "https://github.com/abdellahak/CarRental-ReactJS",
  },
  {
    id: 2,
    title: "E-commerce Website",
    description:
      "A fully-featured e-commerce website built with Laravel and Blade, offering a seamless shopping experience with product listings, user authentication, and a secure checkout process.",
    source: "/imgs/projects/e-commerce website.webp",
    stack: "Laravel, Blade",
    liveProject: null,
    githubResp: "https://github.com/abdellahak/_e-commerce-laravel",
  },
  {
    id: 3,
    title: "E-Shopping Cart",
    description:
      "An interactive online shopping cart built with HTML, CSS, and JavaScript, featuring dynamic product listings and a responsive checkout process.",
    source: "/imgs/projects/eshoping cart project.webp",
    stack: "HTML5, CSS3, JavaScript",
    liveProject: "https://abdellahak.github.io/eshoping-Cart/",
    githubResp: "https://github.com/abdellahak/eshoping-Cart",
  },
  {
    id: 4,
    title: "Instagram Clone",
    description:
      "A responsive front-end clone of Instagram, showcasing photo and video feeds, and user profiles.",
    source: "imgs/projects/instagram-clone.webp",
    stack: "HTML5, CSS3",
    liveProject: "https://abdellahak.github.io/instagram-clone/",
    githubResp: "https://github.com/abdellahak/instagram-clone/",
  },
  {
    id: 5,
    title: "Arabic Website",
    description:
      "A landing page for an Arabic website, built with HTML, CSS, and JavaScript.",
    source: "/imgs/projects/arabic-website.webp",
    stack: "HTML5, CSS3",
    liveProject: "https://abdellahak.github.io/arabicwebsite/",
    githubResp: "https://github.com/abdellahak/arabicwebsite",
  },
  {
    id: 6,
    title: "Library Book Loan",
    description:
      "A Python and Tkinter application for managing book loans and maintaining a catalog of available books.",
    source: "/imgs/projects/library project.webp",
    stack: "Python",
    liveProject: null,
    githubResp: "https://github.com/abdellahak/projet-bibliotheque",
  },
];

let projectsNavigationHtml = projects
  .map(
    (prj) => `
        <button class="project-card" id="card-${prj.id}" onclick = "changeProject(${prj.id})">
            <div class="card-bg"></div>
            <img src="${prj.source}" alt="${prj.title}" class="prj-icon" loading="lazy">
            <div>
                <h1>${prj.title}</h1>
            </div>
        </button>
                `
  )
  .join("");
projectsNav.innerHTML = projectsNavigationHtml;

let projectsCards = document.querySelectorAll(".project-card");
function changeNavColor(id) {
  let targetedCard = document.getElementById(`card-${id}`);
  projectsCards.forEach((card) => {
    card.classList.remove("selected-card");
  });
  targetedCard.classList.add("selected-card");
}
let globalid = 0;
function showProject(id) {
  let targetedProject = projects.find((prj) => prj.id == id);
  projectsContainer.innerHTML = `
        <div class="image-container">
            <img
            src="${targetedProject.source}"
            alt="${targetedProject.title}"
            class="prj-img"
            loading="lazy"
          />
          </div>
          <div class="img-infos">
            <div class="prj-infos">
            
            <div class="img-btns">
                ${
                  targetedProject.liveProject
                    ? `<a href="${targetedProject.liveProject}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i>Live project</a>`
                    : ""
                }
                ${
                  targetedProject.githubResp
                    ? `<a href="${targetedProject.githubResp}" target="_blank">
                  <i class="fa-brands fa-github"></i>
                  Github respository
                </a>`
                    : ""
                }
              </div>
              <h1>${targetedProject.title}</h1>
            </div>
          </div>
        `;
}
function sliderMovement(id = globalid) {
  globalid++;
  if (globalid > projects.length) {
    globalid = 1;
  }
  showProject(globalid);
  changeNavColor(globalid);
}
let sliderInterval;

function changeProject(id) {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
  globalid = id - 1;
  sliderMovement(globalid - 1);
  sliderInterval = setInterval(sliderMovement, 8000);
}

changeProject(1);

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

function changeAnimation2(){
  if(window.innerWidth < 1000){
    projectsNavigation.classList.remove("block2");
    projectsCards2.forEach((card) => {
      card.classList.add("block2");
    });
  }else{
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