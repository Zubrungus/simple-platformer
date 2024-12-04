const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let updateCount = 0
let drawCount = 0;

const player = {
    x: 50,
    y: 700,
    width: 20,
    height: 40,
    speed: 2,
    isJumping: true,
    velY: 0
};

const gravity = 0.01;

function gameLoop() {
    update();
    draw();
}

function update() {
    // Handle player movement and physics
    if (keys.a) {
        player.x -= player.speed;
    }
    if (keys.d) {
        player.x += player.speed;
    }

    // Jumping logic
    if (keys.End && !player.isJumping) {
        player.isJumping = true;
        player.velY = -1.5;
    }
    if (keys.PageDown) {
        Attack();
    }

    player.velY += gravity;
    player.y += player.velY;

    // Prevent player from going off-screen
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
        player.velY = 0;
    }
    updateCount++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#77CCFF";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw platforms
    // ...
    drawCount++;
    requestAnimationFrame(draw);
}

function Attack() {


}

const keys = {};
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

setInterval(update,1);
requestAnimationFrame(draw);


setInterval(() => {
    console.log("updates per second: " + updateCount);
    updateCount = 0;

    console.log("draws per second: " + drawCount);
    drawCount = 0;

  }, 1000)