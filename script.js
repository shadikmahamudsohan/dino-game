const player = document.getElementById("player");
const block = document.getElementById("block");
const counter = document.getElementById("counter");
var count = 0;
let animationTime = parseFloat(getComputedStyle(block).animationDuration);

function jump() {
    if (player.classList == "jump-animation") {
        return;
    }
    player.classList.add("jump-animation");
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
        alert("Game Over. score: " + (count - 1));
        const playAgain = confirm("Do you want to play again?");
        if (playAgain) {
            count = 0;
            animationTime = 2.5;
            block.style.animation = `move 2.5s infinite linear`;
            block.classList.add("move-animation");
        }
    } else {
        count++;
        console.log(animationTime);
        if (animationTime > 1.7) {
            animationTime = animationTime - 0.0001;
            block.style.animation = `move ${animationTime}s infinite linear`;
        }
    }
}, 10);
