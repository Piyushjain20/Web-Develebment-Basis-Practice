const addBtn = document.getElementById("addBtn");
const modalXmark = document.getElementById("modalClose");
const modalScreen = document.getElementById("modalScreen");
const bookmarkForm = document.getElementById("modalForm");
const websiteNameEL = document.getElementById("websiteName");
const websiteUrlEL = document.getElementById("websiteUrl");
const bookmarkContainer = document.getElementById("bookmark-container");
const deleteBookmarkBtn = document.getElementById("delete-bookmark");

let myBookmarks = localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : [];

class Bookmark {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
function showModal() {
  modalScreen.classList.remove("modal-hide");
  websiteNameEL.focus();
}
function validateForm(name, url) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (name === "" || url === "") {
    alert("Please submit values for both fields.");
    return false;
  }
  if (!url.match(regex)) {
    alert("Please provide a valid web address.");
    return false;
  }
  return true;
}
function storeBookemark(e) {
  e.preventDefault();
  let nameValue = e.srcElement[0].value;
  let urlValue = e.srcElement[1].value;
  if (!urlValue.includes("http://") || !urlValue.includes("https://")) {
    urlValue = `https://${urlValue}`;
  }
  console.log(urlValue);
  if (!validateForm(nameValue, urlValue)) {
    return false;
  }
  let newBookmark = new Bookmark(nameValue, urlValue);
  myBookmarks.push(newBookmark);
  displayBookmark(newBookmark);
  bookmarkForm.reset();
  localStorage.setItem("bookmarks", JSON.stringify(myBookmarks));
}
function displayBookmark(item) {
  const bookmark = document.createElement("div");
  bookmark.className = "bookmark";
  bookmark.innerHTML = '<i class="fa-solid fa-xmark" id="delete-bookmark" title="Delete Bookmark"></i>';
  const favicon = document.createElement("img");
  favicon.src = `https://www.google.com/s2/favicons?domain=${item.url}`;
  const urlText = document.createElement("a");
  urlText.href = item.url;
  urlText.setAttribute("target", "_blank");
  urlText.textContent = item.name;
  bookmark.appendChild(favicon);
  bookmark.appendChild(urlText);
  bookmarkContainer.appendChild(bookmark);
}
function deleteBookmark(e) {
  if (e.target.id === "delete-bookmark") {
    myBookmarks.forEach((bookmark, index) => {
      if (bookmark.name === e.target.nextElementSibling.nextElementSibling.textContent) {
        myBookmarks.splice(index, 1);
      }
    });
    e.target.parentElement.remove();
    localStorage.setItem("bookmarks", JSON.stringify(myBookmarks));
  }
}

// Event Listeners
addBtn.addEventListener("click", showModal);
window.addEventListener("click", (e) => {
  if (e.target == modalScreen || e.target == modalXmark) {
    modalScreen.classList.add("modal-hide");
  }
});
bookmarkForm.addEventListener("submit", storeBookemark);
bookmarkContainer.addEventListener("click", deleteBookmark);

// Display all the fetched bookmark from local Storage
myBookmarks.forEach((item) => displayBookmark(item));
