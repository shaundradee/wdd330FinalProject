import { saveToStorage, getFromStorage, removeFromStorage, formatCeoPath } from "./utilities.mjs";


// Newsletter form handling: simple validation + placeholder submit
export function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  const status = form?.querySelector(".form-status");
  const unsubscribeBtn = document.getElementById("unsubscribe-btn");
  if (!form || !status || !unsubscribeBtn) return;

  // Check storage on load
  const savedEmail = getFromStorage("newsletterEmail");
  if (savedEmail) {
    status.hidden = false;
    status.textContent = "Hey pack member! You're already subscribed.";
    unsubscribeBtn.hidden = false; // show unsubscribe
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      status.hidden = false;
      status.textContent = "Please enter a valid email.";
      return;
    }

    saveToStorage("newsletterEmail", email);
    status.hidden = false;
    status.textContent = "Thanks for joining the pack!";
    unsubscribeBtn.hidden = false; // show unsubscribe
    form.reset();
  });

  // Handle unsubscribe
  unsubscribeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    removeFromStorage("newsletterEmail");
    status.hidden = false;
    status.textContent = "You've been unsubscribed.";
    unsubscribeBtn.hidden = true; // hide again
  });
}
  

export async function initSpotlight() {
  const spotlightImage = document.querySelector(".spotlight-image");
  const spotlightInfo = document.querySelector(".spotlight-info");
  const learnMoreBtn = document.querySelector(".spotlight-card .btn-primary");

  if (!spotlightImage || !spotlightInfo || !learnMoreBtn) return;

  try {
    // 1. Load local mapping file
    const res = await fetch("matchingBreeds.json");
    const breedMap = await res.json();

    // 2. Pick a random breed
    const randomIndex = Math.floor(Math.random() * breedMap.length);
    const randomBreed = breedMap[randomIndex];

    const ceoBreed = randomBreed.ceo_format;
    const standardBreed = randomBreed.standard_format;

    // 3. Normalize ceo_format for API path
    const ceoPath = formatCeoPath(ceoBreed);

    // 4. Fetch image from Dog CEO API
    const imgRes = await fetch(`https://dog.ceo/api/breed/${ceoPath}/images/random`);
    const imgData = await imgRes.json();
    // console.log(imgData); // for debugging

    // 5. Update spotlight card
    spotlightImage.src = imgData.message;
    spotlightImage.alt = `Image of a ${standardBreed}`;
    spotlightImage.hidden = false;

    spotlightInfo.textContent = `Breed: ${standardBreed}`;

    // 6. Save both formats for details page
    saveToStorage("spotlightBreed", randomBreed);

    // 7. Redirect when "Learn more" is clicked
    learnMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "navpages/details.html";
    });
  } catch (err) {
    spotlightInfo.textContent = "Couldn't fetch a pup right now. Try again later!";
    console.error(err);
  }
}
  