const player = document.getElementById("player");
const block = document.getElementById("block");
const counter = document.getElementById("counter");
const game = document.getElementById("game");
const instruction = document.getElementById("instruction");

var count = 0;
let jumCount = 0;
let animationTime = parseFloat(getComputedStyle(block).animationDuration);


function playAgain() {
    window.location.reload();
}

function jump() {
    jumCount++;
    if (player.classList == "jump-animation") {
        return;
    }
    player.classList.add("jump-animation");
    if (jumCount > 0) {
        block.classList.add("move-animation");
        instruction.remove();
    }
    setTimeout(function () {
        player.classList.remove("jump-animation");
    }, 700);
}


const checkDead = setInterval(function () {
    counter.innerHTML = `<p>${count}</p>`;
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockLeft <= 90 && blockLeft > 50 && playerTop >= 220) {
        block.classList.remove("move-animation");
        const previousScore = localStorage.getItem("score");
        if (count > previousScore) {
            localStorage.setItem("score", count);
        }
        console.log(previousScore);
        game.innerHTML = `
        <div id="gameOver">
            <div class="menu">
                <h1>Game Over</h1>
                ${previousScore ? `<h2>Score: ${count} || Best: ${previousScore}</h2>`
                : `<h2>Score: ${count}</h2>`
            }
                
                <button onclick="playAgain()">Play again</button>
            </div>
        </div>
        `;
    } else {
        if (jumCount > 0) {
            count++;
        }
        if (animationTime > 1.5) {
            animationTime = animationTime - 0.0001;
            block.style.animation = `move ${animationTime}s infinite linear`;
        }
    }
}, 10);
