const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $imput = document.querySelector("input");

const INITIAL_TIME = 30;

const TEXT =
  "the quick brown fox jumps over the lazy dog and miduev is trying to clone monkey type for fun and profit using vanilla js for the typing test speed";

let words = [];
let currenTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(" ").slice(0, 32);
  currenTime = INITIAL_TIME;

  $time.innerHTML = currenTime;
  $paragraph.innerHTML = words
    .map((word, index) => {
      const letters = word.split("");

      return `<word>
        ${letters.map((letter) => `<letter>${letter}</letter>`).join("")}
      </word>
      `;
    })
    .join("");

  const $firsWord = $paragraph.querySelector("word");
  $firsWord.classList.add("active");
  $firsWord.querySelector("letter").classList.add("active");

  const intervalId = setInterval(() => {
    currenTime--;
    $time.textContent = currenTime;

    if (currenTime === 0) {
      clearInterval(intervalId);
      console.log("game over");
    }
  }, 1000);
}
function initEvents() {
  document.addEventListener("keydown", () => {
    $imput.focus();
  });
  $imput.addEventListener("keydown", onkeyDown);
  $imput.addEventListener("keyup", onkeyUp);
}

function onkeyDown() {}
function onkeyUp() {
  //recuperamops los elementos actuales
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");
  console.log($currentLetter);

  const currentWord = $currentLetter.innerText.trim();
  $imput.maxLength = currentWord.length;
  console.log({ value: $imput.value, currentWord });
}

function gameOver() {
  console.log("game over");
}
