import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  // Create a <ul> element to contain the card items
  const ul = document.createElement("ul");
  ul.classList.add("cards-list"); // Add a class to style the ul

  // Loop through each row (each card)
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    li.classList.add("card-item"); // Add a class to style each card

    // Append all children from the row to the list item
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Loop through the div elements to assign appropriate classes
    [...li.children].forEach((div) => {
      if (div.querySelector("picture")) {
        // Check if the div contains a <picture> element
        div.className = "cards-card-image";
      } else {
        div.className = "cards-card-body";
      }
    });

    ul.append(li); // Add the list item to the ul
  });

  // Replace all <picture> elements with optimized ones
  const allPictures = ul.querySelectorAll("picture"); // Select all picture elements
  if (allPictures.length === 0) {
    console.error("No <picture> elements found in the DOM.");
  }
  
  allPictures.forEach((picture) => {
    const img = picture.querySelector("img");
    if (img) {
      const optimizedPicture = createOptimizedPicture(
        img.src, 
        img.alt, 
        false, 
        [{ width: "750" }]
      );
      picture.replaceWith(optimizedPicture); // Replace with optimized <picture>
    } else {
      console.error("No <img> inside <picture> found");
    }
  });

  // Clear the block and append the <ul> to it
  block.textContent = "";
  block.append(ul);

  // Create navigation buttons for sliding between cards
  const slideNavButtons = document.createElement("div");
  slideNavButtons.classList.add("navigation-buttons");
  slideNavButtons.innerHTML = `
      <button type="button" class="prev" aria-label="Previous Slide"><</button>
      <button type="button" class="next" aria-label="Next Slide">></button>
  `;
  block.append(slideNavButtons); // Add navigation buttons to the block

  // Add event listeners to scroll the card container
  const ulElement = block.querySelector("ul");
  const nextButton = block.querySelector(".next");
  const prevButton = block.querySelector(".prev");

  // Scroll right (next)
  nextButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: 200, behavior: "smooth" });
  });

  // Scroll left (previous)
  prevButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: -200, behavior: "smooth" });
  });
}
