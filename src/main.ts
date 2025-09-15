const dropdownBtn = document.getElementById("dropdown-btn") as HTMLButtonElement;
const dropdownMenu = document.getElementById("dropdown-menu") as HTMLDivElement;

let closeTimeout: number | undefined;

dropdownBtn.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
  dropdownMenu.classList.remove("hidden");
});


dropdownBtn.addEventListener("mouseleave", (event) => {
  if (!dropdownMenu.contains(event.relatedTarget as Node)) {
    closeTimeout = window.setTimeout(() => {
      dropdownMenu.classList.add("hidden");
    }, 500);
  }
});

dropdownMenu.addEventListener("mouseleave", () => {
  closeTimeout = window.setTimeout(() => {
    dropdownMenu.classList.add("hidden");
  }, 100);
});


dropdownMenu.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
});


