let score = 0;
let lives = 3;

let breakoutCanvas;
let breakoutCanvasWidth = 1000;
let breakoutCanvasHeight = 700;
let context;

//

let paddleWidth = 120;
let paddleHeight = 20;
let paddleSpeedX = 30;

//

let ballWidth = 10;
let ballHeight = 10;
let ballSpeedX = 3;
let ballSpeedY = 3;

let ball = {
    x : breakoutCanvasWidth/2,
    y : breakoutCanvasHeight/2,
    width: ballWidth,
    height: ballHeight,
    speedX : ballSpeedX,
    speedY : ballSpeedY
}

//

let blockWidth = 60;
let blockHeight = 20;
let blockNmbr = 14;
let radius = 10;
let blocks = [];

let totalBlockWidth = blockNmbr * (blockWidth + 10) - 10;

let startX = (breakoutCanvasWidth - totalBlockWidth) / 2;

for (let row = 0; row < 4; row++) {
    for (let col = 0; col < blockNmbr; col++) {
        blocks.push({
            x: startX + col * (blockWidth + 10),
            y: row * (blockHeight + 10) + 30,
            width: blockWidth,
            height: blockHeight,
            visible: true,
            color: getRandomColor()
        });
    }
}

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); 
    const saturation = '70%'; 
    const lightness = '50%'; 
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

let paddle = {
    x : breakoutCanvasWidth/2 - paddleWidth/2,
    y : breakoutCanvasHeight - paddleHeight -5,
    width : paddleWidth,
    height : paddleHeight,
    speedX : paddleSpeedX
}

window.onload = function(){
    breakoutCanvas = document.getElementById("breakoutCanvas");
    breakoutCanvas.width = breakoutCanvasWidth;
    breakoutCanvas.height = breakoutCanvasHeight;

    context = breakoutCanvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    

    requestAnimationFrame(update);

    document.addEventListener("keydown", movePaddle);
}

function update() {
    context.clearRect(0, 0, breakoutCanvas.width, breakoutCanvas.height);

    context.fillStyle = "white";
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    blocks.forEach(block => {
        if (block.visible) {
            context.fillStyle = block.color;
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    });

    updateBall();

    
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);
    context.fillText("Lives: " + lives, breakoutCanvasWidth - 80, 20);

    requestAnimationFrame(update);
}


function movePaddle(k){
    if (k.code == "ArrowLeft") {
        if (paddle.x - paddle.speedX >= 0) {
            paddle.x -= paddle.speedX;
        }
    } else if (k.code == "ArrowRight") {
        if (paddle.x + paddle.width + paddle.speedX <= breakoutCanvasWidth) {
            paddle.x += paddle.speedX;
        }
    }
}

function updateBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.width / 2, 0, Math.PI * 2);
    context.fillStyle = "white"; 
    context.fill();
    context.closePath();

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.x - ball.width / 2 < 0 || ball.x + ball.width / 2 > breakoutCanvasWidth) {
        ball.speedX = -ball.speedX;
    }

    if (ball.y - ball.height / 2 < 0 || ball.y + ball.height / 2 > breakoutCanvasHeight) {
        ball.speedY = -ball.speedY;
    }

    if (ball.y + ball.height / 2 > breakoutCanvasHeight) {
        lives--;

        if (lives < 0) {
            alert("Game Over! Your score is: " + score);
            resetGame();
        } else {
            ball.x = breakoutCanvasWidth / 2;
            ball.y = breakoutCanvasHeight / 2;
            paddle.x = breakoutCanvasWidth / 2 - paddleWidth / 2;
        }
    }

    if (ball.y + ball.height / 2 > paddle.y &&
        ball.y - ball.height / 2 < paddle.y + paddle.height &&
        ball.x + ball.width / 2 > paddle.x &&
        ball.x - ball.width / 2 < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
    }

    blocks.forEach(block => {
        if (block.visible && isCollision(ball, block)) {
            ball.speedY = -ball.speedY;
            block.visible = false;
            score += 10;

            if (checkGameOver()) {
                alert("Game Over! Your score is: " + score);
                resetGame();
            }
        }
    });

}

function isCollision(ball, block) {
    return (
        ball.x + ball.width / 2 > block.x &&
        ball.x - ball.width / 2 < block.x + block.width &&
        ball.y + ball.height / 2 > block.y &&
        ball.y - ball.height / 2 < block.y + block.height
    );
}

function checkGameOver() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].visible) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    score = 0;
    lives = 3;
    blocks.forEach(block => {
        block.visible = true;
    });
    ball.x = breakoutCanvasWidth / 2;
    ball.y = breakoutCanvasHeight / 2;
    paddle.x = breakoutCanvasWidth / 2 - paddleWidth / 2;
}



const username = document.getElementById("username");
const password = document.getElementById("password");

const AUTH_URL_BASE = "/index.php?auth&action=";

async function authenticate(action) {
    let form = new FormData();
    form.set("username", username.value);
    form.set("password", password.value);

    try {
        const result = await fetch(`${AUTH_URL_BASE}${action}`, {
            method: "POST",
            body: form
        });

        if (result.status === 200) {
            endAuth();
        } else {
            showAuthWarning();
        }
    } catch (error) {
        console.error("Error during authentication:", error);
    }
}


async function login() {
    await authenticate("login");
}

async function register() {
    await authenticate("register");
}


function showAuthWarning () {
    clearAuthWarning();
    document.getElementById("wrong-auth").style.display = "block";
    wtimer = setTimeout(clearAuthWarning, 3000);
}
function clearAuthWarning () {
    clearTimeout(wtimer);
    document.getElementById("wrong-auth").style.display = "none";
}

