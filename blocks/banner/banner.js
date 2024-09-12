
export default function decorate(block) {
  const headings = document.querySelectorAll("h2");
  headings.forEach((heading) => {
    heading.removeAttribute("id");
    heading.classList.add("break-heading");
  });
}
