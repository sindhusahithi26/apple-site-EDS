


export default function decorate(block) {
  // Select all <h2> elements
  const headings = document.querySelectorAll("h2");

  headings.forEach((heading) => {
    // Remove the 'id' attribute if it exists
    heading.removeAttribute("id");


    heading.classList.add("break-heading");
  });
}
