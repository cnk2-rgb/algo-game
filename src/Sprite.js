import { Vector2 } from "./Vector2.js";

//so we can have specific drawing instructions
export class Sprite {
    constructor({
        //config options for each sprite
        resource,
        frameSize, //can use one frame from hero spreadsheet (small size)
        hFrames, // can "index" into hero spreadsheet
        vFrames, //how sprite arranged vertically
        frame, //which frame we want to show
        scale, 
        position, //position
    }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16,16); //default frame size varies game to game
    this.hFrames = hFrames ?? 1; //default 1 for sky if null val passed in constructor
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0,0);
    this.buildFrameMap();

    }
    //iterate thru spreadsheet as a grid
    buildFrameMap() {
        let frameCount = 0;
        for (let v=0; v<this.vFrames; v++) {
          for (let h=0; h<this.hFrames; h++) {
            this.frameMap.set(
                frameCount,
                new Vector2(this.frameSize.x * h, this.frameSize.y * v)
            )
            frameCount++;
          }
        }
    }

    //new method
    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }
        //find correct sprite sheet frame to use from frame map
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame); //index into frame map
        if (frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;  
        }

        //j for easier readability
        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y; 

        //for drawing subset of spreadsheet to canvas
        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY, // Top Y corner of frame
            frameSizeX, //How much to crop from the sprite sheet (X)
            frameSizeY, //How much to crop from the sprite sheet (Y)
            x, //Where to place this on canvas tag X (0)
            y, //Where to place this on canvas tag Y (0)
            frameSizeX * this.scale, //How large to scale it (X)
            frameSizeY * this.scale, //How large to scale it (Y)
        );

    }
}