const api_key = "DEMO_KEY";
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&count=${count}`;

const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.getElementById("loadMore");
const backHome = document.getElementById("backHome");
const favouritesNavBtn = document.getElementById("favourites");
const loader = document.querySelector(".loader");
const savedMsg = document.querySelector(".save-confirmed");
const resultNav = document.getElementById("resultsNav");
const favouritesNav = document.getElementById("favouritesNav");

let resultsArray = [];
let favourites = {};

// fetch data from API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
  } catch (err) {
    console.log(err);
  }
}
// clear all card like elements form view
function clearHome() {
  imagesContainer.innerHTML = ``;
}
async function populateHome() {
  //show loader , hide second nav if not hidden ,show first nav if hidden
  loader.classList.remove("hidden");
  resultNav.classList.remove("hidden");
  favouritesNav.classList.add("hidden");
  // clear earlier shown cards
  clearHome();
  //get data from api
  await getNasaPictures();
  // populate favourites from storage if any
  favourites = localStorage.getItem("favouritesStorage") ? JSON.parse(localStorage.getItem("favouritesStorage")) : {};
  //loop through all fetched items and create cards for them
  resultsArray.forEach((item) => {
    imagesContainer.appendChild(createCard(item, "home"));
  });
  //hide loader
  loader.classList.add("hidden");
}
// function to create card like element with data & insert in DOM
function createCard(item, page) {
  // Main Card
  let card = document.createElement("div");
  card.className = "card";
  //   Link
  let a = document.createElement("a");
  a.href = item.hdurl;
  a.title = "View full Image";
  a.target = "_blank";
  // Img
  let img = document.createElement("img");
  img.src = item.url;
  img.alt = "NASA Picture of the Day";
  img.className = "card-img-top";
  imagesContainer.loading = "lazy";
  // Card-body
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  // Title
  let h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = item.title;
  // Favourite btn
  let btn = document.createElement("p");
  btn.className = "clickable";
  if (page === "home") {
    btn.textContent = "Add to favourites";
    btn.setAttribute("onclick", `addToFavourites('${item.url}')`);
  } else {
    btn.textContent = "Remove favourite";
    btn.setAttribute("onclick", `removeFromFavourites('${item.url}')`);
  }
  // Description
  let p = document.createElement("p");
  p.className = "card-text";
  p.textContent = item.explanation;
  //footer
  let small = document.createElement("small");
  small.className = "text-muted";
  let strong = document.createElement("strong");
  strong.textContent = item.date;
  let span = document.createElement("span");
  span.textContent = item.copyright ? ` ${item.copyright}` : " ";

  // Appending
  small.append(strong, span);
  cardBody.append(h5, btn, p, small);
  a.append(img);
  card.append(a, cardBody);
  return card;
}
// function to store object to local storage for favourites
function addToFavourites(itemUrl) {
  resultsArray.forEach((item) => {
    if (item.url === itemUrl && !favourites[itemUrl]) {
      favourites[itemUrl] = item;
      showConfirmedMsg();
    }
  });
  localStorage.setItem("favouritesStorage", JSON.stringify(favourites));
}
// function to show and auto hide confirm msg after 3 sec
function showConfirmedMsg() {
  savedMsg.classList.remove("hidden");
  setTimeout(() => {
    savedMsg.classList.add("hidden");
  }, 2000);
}
// changing view to favourites tab
function showFavourites() {
  clearHome();
  // Hide first nav and show second nav
  resultNav.classList.add("hidden");
  favouritesNav.classList.remove("hidden");
  // Populate accouring to items in favourites
  Object.keys(favourites).forEach((key) => {
    imagesContainer.appendChild(createCard(favourites[key], "favourites"));
  });
}
function removeFromFavourites(itemUrl) {
  if (favourites[itemUrl]) {
    delete favourites[itemUrl];
    localStorage.setItem("favouritesStorage", JSON.stringify(favourites));
    showFavourites();
  }
}

backHome.addEventListener("click", populateHome);
loadMore.addEventListener("click", populateHome);
favouritesNavBtn.addEventListener("click", showFavourites);
populateHome();
