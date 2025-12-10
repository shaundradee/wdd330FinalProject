
export async function loadHeaderFooter() {
    // load the header
    const header = await fetch("../partials/header.html");
    const headerText = await header.text();
    document.querySelector("#header").innerHTML = headerText;

    // load the footer
    const footer = await fetch("../partials/footer.html");
    const footerText = await footer.text();
    document.querySelector("#footer").innerHTML = footerText;

    // once footer is loaded, update the year
    updateFooterYear();

    // Adding menu toggle functionality
    setupMenuToggle();
}

// update year in footer
export function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("currentyear");
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Add event listener to menu button
export function setupMenuToggle() {
    const menuBtn = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".menu-wrap .navlinks");
    menuBtn.addEventListener("click", (e) => {
        e.preventDefault(); // keep the page from jumping to top
        navLinks.classList.toggle("show");
        navLinks.classList.toggle("hidden");
    });
}

// Locale storage helper functions
/**
 * Save a value to localStorage
 * @param {string} key - The key under which to store the value
 * @param {any} value - The value to store (will be stringified)
 */
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

/**
 * Retrieve a value from localStorage
 * @param {string} key - The key to retrieve
 * @returns {any|null} - Parsed value or null if not found
 */
export function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return null;
  }
}

/**
 * Remove a value from localStorage
 * @param {string} key - The key to remove
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing ${key} from storage:`, err);
  }
}

/**
 * Convert a ceo_format string into a Dog CEO API path.
 * Example: "terrier-norwich" → "terrier/norwich"
 *          "affenpinscher" → "affenpinscher"
 */
export function formatCeoPath(ceoFormat) {
    return ceoFormat.includes("-")
      ? ceoFormat.replace("-", "/")
      : ceoFormat;
}

// Generate HTML markup for breed details card
export function buildBreedDetailsCard(attrs) {
  return `
    <p><strong>Description:</strong> ${attrs.description}</p>
    <p><strong>Life span:</strong> ${attrs.life.min}-${attrs.life.max} years</p>
    <p><strong>Male weight:</strong> ${attrs.male_weight.min}-${attrs.male_weight.max} kg</p>
    <p><strong>Female weight:</strong> ${attrs.female_weight.min}-${attrs.female_weight.max} kg</p>
    <p><strong>Hypoallergenic:</strong> ${attrs.hypoallergenic ? "Yes" : "No"}</p>
    `;
}