const userDigits = document.querySelectorAll('.input-default');
const shuffleBtn = document.getElementById('btnShuffle');
const resultBox = document.getElementById('results')
const clearBtn = document.getElementById('clearValue');


clearBtn.addEventListener('click', function () {
  for (let i = 0; i < userDigits.length; i++) {
    userDigits[i].value = '';
  }
});


//TODO
//  Zadanie domowe:
//  miej na uwadze, ze 1 dnia zapomina się do 80% rzeczy, dlatego odrób zadanie:
//
// 1. Podpiąc walidacje do wszystkich funkcji (najświeższy kod na slacku)
// 2. Pokazywać wylosowane liczby
// 3. Zliczać hajs
// 4. Zadanie z *, zapisywać do localstorage (localstorage.setItem()) historie trafień

shuffleBtn.addEventListener('click', function () {

  // checkIsEmpty();

  if (checkIsEmpty()) {
    if (checkIsNumber()) {
      if (checkIsInRange()) {
        if (checkIsRedundant()) {
          // console.log('jest nie puste i liczbą i  w zakresie i sie nie powtarzaja');
          let shuffledDigits = shuffle();
          let hits = checkHits(shuffledDigits);
          showResults(hits);
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
      return false;
    }
  }
  return true;
}

//sprawdzamy czy liczy znajdują się w zakresie
function checkIsInRange() {
  for (let i = 0; i < userDigits.length; i++) {
    if (userDigits[i].value < 1 || userDigits[i].value > 49) {
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
      }
    }
  }
  return temp;
}

function showResults(hits) {

  let message = `Liczba trafień: ${hits.length}.
    Liczby trafione to ${hits}.
    Gratulacje!!!
    Nic nie wygrałeś, bo nas nie stać.`;

  resultBox.innerText = message;
}

function showValidation(element, message) {
  element.classList.add('error')
}
