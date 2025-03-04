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

      return `<word>${letters
        .map((letter) => `<letter>${letter}</letter>`)
        .join("")}</word> `;
    })
    .join("");
}
function initEvents() {}
