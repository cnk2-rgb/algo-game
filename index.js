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
const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32),
})

const heroPos = new Vector2(16 * 6, 16 * 5); //inital pos for hero

const update = () => {
    // Updating entities in the game
    hero.frame = (hero.frame + 1) % 24;
};

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0, 0);
    
    //center hero in cell (state is still hero pos)
    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroPos.x+heroOffset.x;
    const heroPosY = heroPos.y+1+heroOffset.y;

    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}


//game loop
const gameLoop = new GameLoop(update, draw);
gameLoop.start();