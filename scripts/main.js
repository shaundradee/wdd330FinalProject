import { initNewsletter, initSpotlight } from "./homepage.mjs";

// Initialize newsletter form functionality
initNewsletter();
// Initialize spotlight functionality
initSpotlight();


const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.textContent = currentYear;
}

// menu toggle functionality
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".menu-wrap .navlinks");

menuBtn.addEventListener("click", (e) => {
    e.preventDefault(); // keep the page from jumping to top
    navLinks.classList.toggle("show");
    navLinks.classList.toggle("hidden");
});
