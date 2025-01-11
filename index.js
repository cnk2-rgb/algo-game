//grab reference to canvas tag in DOM
//troubleshooting: run http-server on local host (not network)
// command shift refresh to clear cache

import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d") //getting context for canvas

//only define these sprite once
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})
//only define these sprite once
const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
    resource: resources.images.hero, //reference to hero spreadsheet
    frameSize: new Vector2(32, 32),
    hFrames: 3, 
    vFrames: 8,
    frame: 1, // 0 indexing, second element of first row
})
const heroPos = new Vector2(16 * 6, 16 * 5); //inital pos for hero

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32),
})

const coinSprite = new Sprite({
    resource: resources.images.coin,
    frameSize: new Vector2(16*5, 16*5),
    scale: 0.4,
});
// Array to hold multiple coins
let coins = [];

const spawnCoins = () => {
    // Positioning for coins, hardcoded these for now but can randomize later
    coins.push({pos: new Vector2(125, 43), value: 10});
    coins.push({pos: new Vector2(230, 75), value: 20});
    coins.push({pos: new Vector2(170, 60), value: 30});
    coins.push({pos: new Vector2(200, 30), value: 40});
    coins.push({pos: new Vector2(140, 90), value: 50});
    console.log(coins);
};
spawnCoins(); // Spawn 5 initial coins

// Player's score
let score = 0;

// Track mouse clicks
canvas.addEventListener('click', (event) => {
    // Get mouse click position
    const mousePos = new Vector2(event.offsetX, event.offsetY);
    // Check for collision with any coin
    console.log("mousePos", mousePos);
    for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        console.log("coinPos", coin.pos);
        // need to mutiply by 0.4 to match the scale of the coin sprite
        if (
            mousePos.x * 0.4 >= coin.pos.x - 16 &&
            mousePos.x * 0.4 <= coin.pos.x + 16 &&
            mousePos.y * 0.4  >= coin.pos.y - 16 &&
            mousePos.y * 0.4 <= coin.pos.y + 16
        ) {
            console.log(`Coin collected! Value: ${coin.value}`);
            score += coin.value; // Add coin value to score
            coins.splice(i, 1); // Remove coin from array
            break; // Exit the loop after a successful click
        }
    }
});

const update = () => {
    // Updating entities in the game
    hero.frame = (hero.frame + 1) % 24;
};

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    // center hero in cell (state is still hero pos)
    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroPos.x+heroOffset.x;
    const heroPosY = heroPos.y+1+heroOffset.y;
    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
    
    coins.forEach(coin => {
        coinSprite.drawImage(ctx, coin.pos.x, coin.pos.y);
        // // show the coin value beneath the coin (this is a little faulty :())
        // ctx.font = "bold 10px Arial"; // Set font size
        // ctx.fillStyle = "black"; // Set text color
        // ctx.fillText(coin.value, coin.pos.x + 5, coin.pos.y + 36);
    });
    // Display score on the canvas
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10, 30);
}


//game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();