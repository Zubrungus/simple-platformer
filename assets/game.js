const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let updateCount = 0;
let drawCount = 0;
let attackTime = 0;

const player = {
    x: 550,
    y: 700,
    width: 30,
    height: 50,
    speed: 2,
    isJumping: true,
    isAttacking: false,
    velY: 0,
    facing: "right",
    holdingJump: false
};

const sword = {
    x: 100,
    y: 100,
    width: 40,
    height: 15,
    swingDirection: "right"
}

const gravity = 0.013;


function update() {
    // Handle player movement and physics
    if (keys.a) {
        player.x -= player.speed;
        player.facing = "left";
    }
    if (keys.d) {
        player.x += player.speed;
        player.facing = "right";
    }

    // Jumping logic
    if (player.holdingJump && keys.End && player.velY <= -1.25){
        player.velY *= 1.01;
    } else{
        player.holdingJump = false;
    }

    if (keys.End && !player.isJumping) {
        player.isJumping = true;
        player.holdingJump = true;
        player.velY = -1.3;
    }



    // Attacking logic
    if (keys.PageDown && !player.isAttacking) {
        Attack();
    }

    //Gravity
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

    //Attack timer
    if(attackTime != 0){

        //If player is attacking left or right, keep facing that direction
        if (sword.swingDirection == "left"){
            player.facing = "left";
        }
        if(sword.swingDirection == "right"){
            player.facing = "right";
        }

        attackTime--;

    } else{
        player.isAttacking = false;
    }

    if(sword.swingDirection == "down"){
        sword.x = player.x + 7.5;
        sword.y = player.y + 45;
    } else if(sword.swingDirection == "up"){
        sword.x = player.x + 7.5;
        sword.y = player.y - 35;
    } else if(sword.swingDirection == "left"){
        sword.x = player.x - 35;
        sword.y = player.y + 15;
    } else{
        sword.x = player.x + 25;
        sword.y = player.y + 15;
    }
    updateCount++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "#77CCFF";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    //Draw eye depending on direction
    ctx.fillStyle = "#AA99DD"
    if (player.facing == "right"){
        ctx.fillRect(player.x + 20, player.y + 7, 5, 5)
    } else{
        ctx.fillRect(player.x + 5, player.y + 7, 5, 5)
    }
    //Draw sword
    if (player.isAttacking) {
        ctx.fillStyle = "#eebbbb";
        if (sword.swingDirection == "down"){
            ctx.fillRect(sword.x, sword.y, sword.height, sword.width);
        }else if (sword.swingDirection == "up"){
            ctx.fillRect(sword.x, sword.y, sword.height, sword.width);
        }
        else if (sword.swingDirection == "left"){
            ctx.fillRect(sword.x, sword.y, sword.width, sword.height);
        } else{
            ctx.fillRect(sword.x, sword.y, sword.width, sword.height);
        }
        
    }

    //Debug holding jump
    if(player.holdingJump)
    {
        ctx.fillRect(10, 10, 10, 10);
    }
    
    drawCount++;
    requestAnimationFrame(draw);
}

function Attack() {
    player.isAttacking = true;
    attackTime = 125;
    if(keys.s && player.isJumping){
        sword.swingDirection = "down";
    } else if(keys.w){
        sword.swingDirection = "up";
    } else{
        sword.swingDirection = player.facing;
    }

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