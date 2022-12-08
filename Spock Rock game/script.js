import { startConfetti, removeConfetti } from "./confetti.js";

const playerSelection = document.getElementById("playerSelection");
const playerChoice = document.getElementById("playerChoice");
const playerScoreEle = document.getElementById("playerScore");
const computerSelection = document.getElementById("computerSelection");
const computerChoice = document.getElementById("computerChoice");
const computerScoreEle = document.getElementById("computerScore");
const resetBtn = document.querySelector(".reset-icon");
const result = document.getElementById("resultText");
const allIcons = document.querySelectorAll(".fa-regular");

let yourScore = 0;
let computerScore = 0;

const choices = {
  Rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  Paper: { name: "Paper", defeats: ["rock", "spock"] },
  Scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  Lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  Spock: { name: "Spock", defeats: ["scissors", "rock"] },
};
function resetSelected() {
  allIcons.forEach((item) => {
    item.classList.remove("selected");
  });
  removeConfetti();
}
function checkResult(choice1, choice2) {
  if (choice1.toLowerCase() === choice2) {
    result.textContent = "It's a tie.";
  } else if (choices[choice1].defeats.includes(choice2)) {
    result.textContent = "You Win!";
    yourScore++;
    playerScoreEle.textContent = yourScore;
    startConfetti();
  } else {
    result.textContent = "You Lost!";
    computerScore++;
    computerScoreEle.textContent = computerScore;
  }
}
function beginGame(e) {
  if (e.target.matches("i")) {
    resetSelected();
    e.target.classList.add("selected");
    playerChoice.textContent = ` --- ${e.target.title}`;
    checkResult(e.target.title, computerChoiceGenerator());
  }
}
function computerChoiceGenerator() {
  const keys = Object.keys(choices);
  let computerAns = keys[Math.floor(Math.random() * (keys.length - 1))];
  document.getElementById(`computer${computerAns}`).classList.add("selected");
  computerChoice.textContent = ` --- ${computerAns}`;
  return computerAns.toLowerCase();
}
function resetGame() {
  yourScore = 0;
  computerScore = 0;
  resetSelected();
  playerChoice.textContent = "";
  computerChoice.textContent = "";
  playerScoreEle.textContent = 0;
  computerScoreEle.textContent = 0;
  result.textContent = "";
}

playerSelection.addEventListener("click", beginGame);
resetBtn.addEventListener("click", resetGame);
