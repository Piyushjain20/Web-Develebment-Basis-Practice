let hamburgerBtn = document.getElementById("hamburgerBtn");
let sideBarElement = document.querySelector(".side-navbar");
hamburgerBtn.addEventListener("click", () => {
  sideBarElement.classList.toggle("side-navbar-enabled");
});
window.addEventListener("resize", () => {
  if (this.innerWidth > 576 && !sideBarElement.classList.contains("side-navbar-enabled")) {
    sideBarElement.classList.add("side-navbar-enabled");
  }
  if (this.innerWidth < 576 && sideBarElement.classList.contains("side-navbar-enabled")) {
    sideBarElement.classList.remove("side-navbar-enabled");
  }
});
