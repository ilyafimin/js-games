const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timer = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let timerId;
let currentTime = timer.textContent;

function randomSquare() {
    square.forEach((className) => {
        className.classList.remove('mole');
    })
    let randomPos = square[Math.floor(Math.random() * square.length)];
    randomPos.classList.add('mole');


    let hitPosition = randomPos.id;
    

    square.forEach((id) => {
        id.addEventListener('mouseup', () => {
            if ( id.id === hitPosition ) {
                result += 1;
                score.textContent = result;
            }
        })
    })
}
function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
    currentTime--;
    timer.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(timerCountDown);
        alert(result);
    }
}


let timerCountDown = setInterval(countDown, 1000);