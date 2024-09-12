import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);

  // Decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  const headings = footer.querySelectorAll(
    "div > .section:nth-child(2) > div > h5"
  );

  console.log(headings);

  headings.forEach((heading) => {
    // Create a down arrow icon
    const arrow = document.createElement('span');
    arrow.innerHTML = '▼'; // Unicode for down arrow
    arrow.style.cursor = 'pointer';
    arrow.style.marginLeft = '10px';

    // Append the arrow to the heading
    heading.appendChild(arrow);

    // Get the next sibling element (which should be the <ul> list)
    const list = heading.nextElementSibling;

    if (list) {
      // Initially hide the list
      list.style.display = 'none';

      // Add a click event listener to the heading and arrow
      heading.addEventListener('click', () => {
        if (list.style.display === 'none') {
          list.style.display = 'block';
          arrow.innerHTML = '▲'; // Change to up arrow when expanded
        } else {
          list.style.display = 'none';
          arrow.innerHTML = '▼'; // Change back to down arrow when collapsed
        }
      });
    }
  });
}
