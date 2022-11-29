const jokeApiUrl = "https://v2.jokeapi.dev/joke/Programming";
const btn = document.querySelector(".btn");
async function getJoke() {
  try {
    let { data } = await axios(jokeApiUrl);
    if (data.type === "single") {
      return data.joke;
    } else {
      return `${data.setup} ..... ${data.delivery} `;
    }
  } catch (error) {
    console.log(error);
  }
}
function tellJoke(joke) {
  console.log(joke);
  let speech = new SpeechSynthesisUtterance(joke);
  speech.rate = 0.9;
  speechSynthesis.speak(speech);
  speech.addEventListener("end", () => {
    btn.disabled = false;
  });
}
btn.addEventListener("click", async () => {
  btn.disabled = true;
  tellJoke(await getJoke());
});
