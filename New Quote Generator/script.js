let tweetBtn = document.querySelector(".tweetBtn");
let quoteBtn = document.querySelector("#quoteBtn");
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let loader = document.querySelector(".loader");
let container = document.querySelector(".container");
let apiQuote = [];
tweetBtn.addEventListener("click", () => {
  let str = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
  window.open(str, "_blank");
});
const getQuotes = async () => {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const { data } = await axios(apiUrl);
    apiQuote = await data;
  } catch (err) {
    console.log(err);
  }
};
function newQuote() {
  loading();
  let quoteIndex = Math.floor(Math.random() * apiQuote.length);
  quote.textContent = apiQuote[quoteIndex].text;
  if (!apiQuote[quoteIndex].author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = apiQuote[quoteIndex].author;
  }
  complete();
}
function loading() {
  loader.hidden = false;
  container.hidden = true;
}
function complete() {
  container.hidden = false;
  loader.hidden = true;
}
window.addEventListener("DOMContentLoaded", async () => {
  loading();
  await getQuotes();
  newQuote();
});
quoteBtn.addEventListener("click", newQuote);
