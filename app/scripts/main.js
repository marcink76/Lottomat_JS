const userDigits = document.querySelectorAll('.input-default');
const shuffleBtn = document.getElementById('btnShuffle');
const resultBox = document.getElementById('results');
const clearBtn = document.getElementById('clearValue');
const messageDiv = document.getElementById('error-message');
const shuffleCountH2 = document.getElementById('shuffle-count');
const prizeCount = document.getElementById('prize-count');
const totalCost = document.getElementById('total-cost');
const totalPrize = document.getElementById('total-prize');
const randomizeBtn = document.getElementById('randomize-btn');

let shuffleCount = 1;
let hajsBucket = [];
//-------------------
const prize43 = 24;
const prize44 = 750;
const prize45 = 55000;
const prize46 = 20000000;
const shuffleCost = 10;

randomizeBtn.addEventListener('click', function () {
  const temp = shuffle();
  for (let i = 0; i < userDigits.length; i++) {
  userDigits[i].value = temp[i];
  console.log(userDigits[i]);
  }
})


clearBtn.addEventListener('click', function () {
  for (let i = 0; i < userDigits.length; i++) {
    userDigits[i].value = '';
    clearBingo(i);
  }
});


//TODO
//  Zadanie domowe:
//  miej na uwadze, ze 1 dnia zapomina się do 80% rzeczy, dlatego odrób zadanie:
//
// 1. Podpiąc walidacje do wszystkich funkcji (najświeższy kod na slacku)
// 2. Pokazywać wylosowane liczby -> DONE!
// 3. Zliczać hajs
// 4. Zadanie z *, zapisywać do localstorage (localstorage.setItem()) historie trafień

shuffleBtn.addEventListener('click', function () {

  // checkIsEmpty();
  clearBingo();
  if (checkIsEmpty()) {
    if (checkIsNumber()) {
      if (checkIsInRange()) {
        if (checkIsRedundant()) {
          let shuffledDigits = shuffle();
          let hits = checkHits(shuffledDigits);
          showResults(hits);
          console.log(hits);
          moneyCount(hits);
          shuffleCountH2.innerText = shuffleCount++;
          showStatistics();
        }
      }
    }
  }
});

//sprawdzamy czy pola są puste
function checkIsEmpty() {
  let increment = 0;
  for (let i = 0; i < userDigits.length; i++) {
    if (userDigits[i].value === '') {
      increment++;
      showValidation(userDigits[i], 'Pola są puste');
    }
  }
  if (increment > 0) {
    return false;
  }
  return true;
}

function checkIsNumber() {
  for (let i = 0; i < userDigits.length; i++) {
    if (userDigits[i].value % 1 !== 0) {
      showValidation(userDigits[i], 'wprowadź liczbę' + '');
      return false;
    }
  }
  return true;
}

//sprawdzamy czy liczy znajdują się w zakresie
function checkIsInRange() {
  for (let i = 0; i < userDigits.length; i++) {
    if (userDigits[i].value < 1 || userDigits[i].value > 49) {
      showValidation(userDigits[i], 'liczba z poza zakresu');
      return false;
    }
  }
  return true;
}

//Sprawdzamy czy liczby się nie powtarzają
function checkIsRedundant() {
  for (let i = 0; i < userDigits.length; i++) {
    for (let j = 0; j < userDigits.length; j++) {
      if (userDigits[i].value === userDigits[j].value && i !== j) {
        showValidationForRedundant(userDigits[i], userDigits[j], 'liczby się powtarzaja');
        return false;
      }
    }
  }
  return true;
}

//losowanie
function shuffle() {
  const temp = [];

  for (let i = 0; i < 6; i++) {
    let shuffledDigit = Math.floor(Math.random() * 48 + 1);
    if (temp.indexOf(shuffledDigit) === -1) {
      temp.push(shuffledDigit);
    } else {
      i--;
    }
  }
  return temp;
}

function checkHits(shuffledDigits) {
  const temp = [];
  for (let i = 0; i < userDigits.length; i++) {
    for (let j = 0; j < shuffledDigits.length; j++) {
      if (parseInt(userDigits[i].value, 10) === shuffledDigits[j]) {
        temp.push(shuffledDigits[j]);
        bingo(i);
      }
    }
  }
  return temp;
}

function showResults(hits) {

  let message = `Liczba trafień: ${hits.length}.
    Liczby trafione to ${hits}.
    Gratulacje!!!
    Nic nie wygrałeś, bo nas nie stać.
    `;

  resultBox.innerText = message;
}

function showValidation(element, message) {
  messageDiv.innerText = message;
  element.classList.add('error');
}

function bingo(i) {
  userDigits[i].classList.add('bingo');
}

function showValidationForRedundant(element, element1, message) {
  element.classList.add('error');
  element1.classList.add('error');
  showMessage(message);
}

function clearBingo() {
  for (let i = 0; i < userDigits.length; i++) {
    if (userDigits[i].classList.contains('bingo') || userDigits[i].classList.contains('error')) {
      userDigits[i].classList.remove('error');
      userDigits[i].classList.remove('bingo');
      messageDiv.innerText = '';
    }
  }
}

function showMessage(message) {
  messageDiv.innerHTML = message;
}

function moneyCount(hits) {
  if (hits.length === 3) {
    showMessage('wygrałeś 24pln, na flaszkę i dwa harnasie');
    hajsBucket.push(prize43);
  }
  if (hits.length === 4) {
    showMessage('wygrałeś dużo więcej gościu');
    hajsBucket.push(prize44);
  }
  if (hits.length === 5) {
    showMessage('jesteś całkiem przystojny');
    hajsBucket.push(prize45);
  }
  if (hits.length === 6) {
    showMessage('Kocham Cię');
    hajsBucket.push(prize46);
  }
}

function showStatistics() {
  let sum = 0;
  prizeCount.innerText = hajsBucket.length;
  for (let i = 0; i < hajsBucket.length; i++) {
    sum = sum + hajsBucket[i];
  }
  totalCost.innerText = shuffleCost * shuffleCount - 10; // mało eleganckie rozwiązanie
  totalPrize.innerText = sum;
}
