// 1. Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 2. Record the turn number the player is on. Start it on 1.
let turnCount = 1;


// 3. Provide the player with a way to guess what the number is.
const sendTurn = document.querySelector('.sendTurn')

// 4. Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
const turns = document.querySelector('.turns');

// To show the last result
const latestResult = document.querySelector('.latestResult');

// to indicat if it's high or low
const highOrLow = document.querySelector('.highOrLow')

// To catches the guess of the user
const turnField = document.querySelector('.turnField');

// to restart the UI
let restartButton;

// 5. Next, check whether it is the correct number.
let checkNumber = () => {
  turnField.style.border = '1px solid red';
  //let popup = document.getElementById("myPopup");
  //popup.classList.toggle("show");
  }
  

let checkTurn = () => {
    const userGuess = Number(turnField.value);
    if (userGuess < 1 || userGuess > 100) {
      checkNumber();
      checkTurn();
    }
    if (turnCount === 1) {
      turns.textContent = 'Palpites anteriores: ';
    }
    turns.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
      latestResult.textContent = 'Parabéns! Você acertou!';
      latestResult.style.backgroundColor = 'green';
      highOrLow.textContent = '';
      setGameOver();
    } else if (turnCount === 10) {
      latestResult.textContent = 'FIM DE JOGO!!';
      highOrLow.textContent = '';
      setGameOver();
    } else {
      latestResult.textContent = 'Errado! Tente de novo!';
      latestResult.style.backgroundColor = 'red';
      if (userGuess < randomNumber) {
        highOrLow.textContent = 'Palpite muito frio!';
      } else if (userGuess > randomNumber) {
        highOrLow.textContent = 'Palpite muito quente!';
      }
    }

    turnCount++;
    turnField.value = '';
    turnField.focus();

}

sendTurn.addEventListener('click', checkTurn);


let setGameOver = () => {
  turnField.disabled = true;
  sendTurn.disabled = true;
  restartButton = document.createElement('button');
  restartButton.textContent = 'Start new game!';
  document.body.append(restartButton);
  restartButton.addEventListener('click', resetGame);
}

let resetGame = () => {
  turnCount = 1;

  const ResetParas = document.querySelectorAll('.ResultParas p');
  for (const ResetPara of ResetParas){
    ResetPara.textContent = '';
  }

  restartButton.parentNode.removeChild(restartButton);

  turnField.disabled = false;
  sendTurn.disabled = false;
  turnField.value = '';
  turnField.focus();

  latestResult.style.backgroundColor = 'white'

  randomNumber = Math.floor(Math.random() * 100) + 1;

}