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
    
    const arrow = document.createElement('span');
    arrow.innerHTML = '▼';
    arrow.style.cursor = 'pointer';
    arrow.style.marginLeft = '10px';

    
    heading.appendChild(arrow);

    
    const list = heading.nextElementSibling;

    if (list) {
      
      list.style.display = 'none';

      
      heading.addEventListener('click', () => {
        if (list.style.display === 'none') {
          list.style.display = 'block';
          arrow.innerHTML = '▲';
        } else {
          list.style.display = 'none';
          arrow.innerHTML = '▼';
        }
      });
    }
  });
}
