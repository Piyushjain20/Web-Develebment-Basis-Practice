const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datePicker = document.getElementById("date-picker");

const countdownEle = document.getElementById("countdown");
const countdownTitleEle = document.getElementById("countdown-title");
const resetBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEle = document.getElementById("complete");
const completeEleInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = ""; // to hold title input value from user
let countdownDate = ""; // to hold date input value from user
let countdownValue; // to hold the date instance of "string date" added by user
let countdownActive; // to hold id to setInterval function for resetting in future
let savedCountdown; // object to be used to save and retrive data from local storage

const MILLISEC_IN_SEC = 1000;
const MILLISEC_IN_MIN = MILLISEC_IN_SEC * 60;
const MILLISEC_IN_HOUR = MILLISEC_IN_MIN * 60;
const MILLISEC_IN_DAY = MILLISEC_IN_HOUR * 24;

//to disable past date input by the user dynamically
datePicker.setAttribute("min", new Date().toISOString().substring(0, 10));

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  countdownValue = new Date(countdownDate).getTime();
  if (countdownDate === "") {
    alert("Please select a date for the countdown.");
  } else if (countdownTitle === "") {
    alert("Please enter a title.");
  }
  updateDOM();
}
function updateDOM() {
  countdownActive = setInterval(populateCountdown, MILLISEC_IN_SEC);
  // save the date of this countdown to local storage
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
    resetKey: countdownActive,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
}
function populateCountdown() {
  const now = new Date().getTime() - new Date().getTimezoneOffset() * MILLISEC_IN_MIN;
  const distance = countdownValue - now;
  inputContainer.hidden = true;
  // when countdown is completed
  if (distance <= 0) {
    clearInterval(countdownActive);
    completeEleInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    countdownEle.hidden = true;
    completeEle.hidden = false;
  } else {
    let days = Math.floor(distance / MILLISEC_IN_DAY);
    let hours = Math.floor((distance % MILLISEC_IN_DAY) / MILLISEC_IN_HOUR);
    let minutes = Math.floor((distance % MILLISEC_IN_HOUR) / MILLISEC_IN_MIN);
    let seconds = Math.floor((distance % MILLISEC_IN_MIN) / MILLISEC_IN_SEC);
    countdownTitleEle.textContent = countdownTitle;
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent = seconds;
    countdownEle.hidden = false;
  }
}
function reset() {
  countdownEle.hidden = true;
  completeEle.hidden = true;
  countdownForm.title.value = "";
  datePicker.value = "";
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown"); // remove the countdown from local storage
}
// to check for past active countdown
function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownActive = savedCountdown.resetKey;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownForm.addEventListener("submit", updateCountdown);
resetBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
