let photosArray = [];
let imgLoaded = false; // boolean to track all the images are loaded or not at a current time
const imageFetchCount = 30;
const apiKey = "q0FhFDRHMqHb7PD_znd6_mQF3zck_mG292dGaj8NgzE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageFetchCount}&page=3&per_page=10`;
const imageConatiner = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

//get photos from unsplash api
async function getPhotos() {
  try {
    const { data } = await axios(apiUrl);
    photosArray = await data;
    loader.hidden = true;
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}
//display all the photos fetched from api
function displayPhotos() {
  photosArray.forEach((imgData) => {
    let newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", imgData.links.html);
    newAnchor.setAttribute("target", "_blank");
    let newImg = document.createElement("img");
    newImg.setAttribute("src", imgData.urls.regular);
    newImg.setAttribute("alt", imgData.description);
    newImg.setAttribute("title", imgData.description);
    newAnchor.appendChild(newImg);
    imageConatiner.append(newAnchor);
  });
  imgLoaded = true;
}
//detect we are at the bottom of page
function detectAtBottom() {
  if (
    window.innerHeight + window.scrollY >= document.body.scrollHeight - 500 &&
    imgLoaded
  ) {
    imgLoaded = false;
    getPhotos();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getPhotos();
});
window.addEventListener("scroll", detectAtBottom);
