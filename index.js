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

  $time.textContent = currenTime;
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

function onkeyDown(event) {
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");
  const { key } = event;
  if (key === " ") {
    event.preventDefault();

    const $nextWord = $currentWord.nextElementSibling;
    const $nextLetter = $nextWord.querySelector("letter");

    $currentWord.classList.remove("active");
    $currentLetter.classList.remove("active");

    $nextWord.classList.add("active");
    $nextLetter.classList.add("active");

    $imput.value = "";

    const hasMissedLetters =
      $currentWord.querySelectorAll("letter:not(.correct)").length > 0;

    const classToAdd = hasMissedLetters ? "marked" : "correct";
    $currentWord.classList.add(classToAdd);
  }
}
function onkeyUp() {
  //recuperamops los elementos actuales
  const $currentWord = $paragraph.querySelector("word.active");
  const $currentLetter = $currentWord.querySelector("letter.active");

  const currentWord = $currentWord.innerText.trim();
  $imput.maxLength = currentWord.length;
  console.log({ value: $imput.value, currentWord });

  const $allLetter = $currentWord.querySelectorAll("letter");
  $allLetter.forEach(($letter) =>
    $letter.classList.remove("correct", "incorrect")
  );

  $imput.value.split("").forEach((char, index) => {
    const $letter = $allLetter[index];
    const letterToCehck = currentWord[index];

    const isCorrect = char === letterToCehck;
    const letterClass = isCorrect ? "correct" : "incorrect";
    $letter.classList.add(letterClass);
  });

  $currentLetter.classList.remove("active", "is-last");
  const inputLeght = $imput.value.length;
  const $nextActiveLetter = $allLetter[inputLeght];

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add("active");
  } else {
    $currentLetter.classList.add("active", "is-last");
  }
}

function gameOver() {
  console.log("game over");
}
