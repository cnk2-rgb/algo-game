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
const graphSprite = new Sprite({
    resource: resources.images.graph,
    frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
    resource: resources.images.hero, //reference to hero spreadsheet
    frameSize: new Vector2(32, 32),
    // hFrames: 3, 
    // vFrames: 8,
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
    coins.push({pos: new Vector2(120, 49), value: 10, distance: 60});
    coins.push({pos: new Vector2(200, 90), value: 10, distance: 0});
    coins.push({pos: new Vector2(160, 70), value: 10, distance: 35});
    coins.push({pos: new Vector2(180, 50), value: 10, distance: 85});
    coins.push({pos: new Vector2(140, 90), value: 10, distance: 50});
    console.log(coins);
};
spawnCoins(); // Spawn 5 initial coins

// Player's score
let score = 0;

// Array to store details of collected coins
let collectedCoins = [];

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
            // Add coin details to collectedCoins array
            score += coin.value; // Add coin value to score
            collectedCoins.push({ distance: coin.distance, value: score });
            coins.splice(i, 1); // Remove coin from array
            break; // Exit the loop after a successful click
        }
    }
});

const update = () => {
    // Updating entities in the game
    hero.frame = (hero.frame + 1) % 24;
    // Check if all coins are collected
    if (coins.length === 0) {
        // Wait 3 seconds before redirecting to explanation.html
        setTimeout(() => {
            window.location.href = "explanation.html";
        }, 500); // 3000 milliseconds = 3 seconds
    }
};


const draw = () => {
    // Draw background
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    graphSprite.drawImage(ctx, 10, 1);

    // Center hero in cell
    const heroOffset = new Vector2(110, -15);
    const heroPosX = heroPos.x + heroOffset.x;
    const heroPosY = heroPos.y + 1 + heroOffset.y;
    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);

    // Draw coins
    coins.forEach(coin => {
        // Draw coin sprite
        coinSprite.drawImage(ctx, coin.pos.x, coin.pos.y);

        // Debug: Draw a bounding box around the coin
        // ctx.strokeStyle = "red"; // Red outline for visibility
        // ctx.lineWidth = 1;
        // ctx.strokeRect(
        //     coin.pos.x - 16, 
        //     coin.pos.y - 16, 
        //     32, // Width of the bounding box
        //     32  // Height of the bounding box
        // );
    });

    // Display score
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Goal: 50 doubloons`, 10, 20);
    // Display collected coins
    ctx.font = "10px Arial";
    ctx.fillText(
        `Score (Dist., Coins.): ${collectedCoins.map(coin => `(${coin.distance}, ${coin.value})`).join(", ")}`,
        10,
        170
    );
    
};



//game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();