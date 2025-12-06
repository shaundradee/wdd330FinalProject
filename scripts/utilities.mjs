export async function loadHeaderFooter() {
    // load the header
    const header = await fetch("/partials/header.html");
    const headerText = await header.text();
    document.querySelector("#header").innerHTML = headerText;

    // load the footer
    const footer = await fetch("/partials/footer.html");
    const footerText = await footer.text();
    document.querySelector("#footer").innerHTML = footerText;

    // once footer is loaded, update the year
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById("currentyear");
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Adding menu toggle functionality
    const menuBtn = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".menu-wrap .navlinks");
    
    menuBtn.addEventListener("click", (e) => {
        e.preventDefault(); // keep the page from jumping to top
        navLinks.classList.toggle("show");
        navLinks.classList.toggle("hidden");
    });
}

// menu toggle functionality
export function initMenuToggle() {
    const menuBtn = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".menu-wrap .navlinks");

    menuBtn.addEventListener("click", (e) => {
        e.preventDefault(); // keep the page from jumping to top
        navLinks.classList.toggle("show");
        navLinks.classList.toggle("hidden");
    });
}

// Basic breed template for breed listings
// Will be used in breeds.js and favorites.js (will edit returned once available data from api is finalized)
export function breedBaseTemplate(breed) {
    return `
    <div class="breed-card">
        <img src="${breed.image.url}" alt="Image of ${breed.name}" class="breed-image"/>
        <h3 class="breed-name">${breed.name}</h3>
        <p class="breed-temperament"><strong>Temperament:</strong> ${breed.temperament}</p>
        <p class="breed-life-span"><strong>Life Span:</strong> ${breed.life_span}</p>
        <button class="favorite-btn" data-breed-id="${breed.id}">Add to Favorites</button>
        <button class="details-btn" data-breed-id="${breed.id}">View Details</button>
    </div>
    `;
}

// Detailed breed template for the details page
// Will be used in details.js and will edit returned once available data from api is finalized
export function breedDetailTemplate(breed) {
    return `
    <div class="breed-detail">
        <h2>${breed.name}</h2>
        <img src="${breed.image.url}" alt="Image of ${breed.name}" class="breed-detail-image"/>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Life Span:</strong> ${breed.life_span}</p>
        <p><strong>Height:</strong> ${breed.height.metric} cm</p>
        <p><strong>Weight:</strong> ${breed.weight.metric} kg</p>
        <p><strong>Origin:</strong> ${breed.origin || 'Unknown'}</p>
        <p><strong>Bred For:</strong> ${breed.bred_for || 'Unknown'}</p>
        <p><strong>Description:</strong> ${breed.description || 'No description available.'}</p>
        <button class="favorite-btn" data-breed-id="${breed.id}">Add to Favorites</button>
    </div>
    `;
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


