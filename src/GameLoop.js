export class GameLoop {
    //params are functions?
    constructor(update, render) {
        this.lastFrameTime = 0; 
        this.accumulatedTime = 0; //keeps track of time
        this.timeStep = 1000/60; //60 frames per sec

        this.update = update;
        this.render = render;

        this.radId = null; //function ID; we are having callback function in case game is paused so it
        this.isRunning = false;

    }

    //function for loop
    mainLoop = (timestamp) => {
        if (!this.isRunning) return;
    
        //how much time has passed
        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
    
        // Accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;
    
        // Fixed time step updates.
        // If there's enough accumulated time to run one or more fixed updates, run them.
        while (this.accumulatedTime >= this.timeStep) {
          this.update(this.timeStep); // Here, we pass the fixed time step size.
          this.accumulatedTime -= this.timeStep;
        }
    
        // Render
        this.render();
    
        //browser will perfectly time when update loop happens so it doesn't go too quickly
        this.rafId = requestAnimationFrame(this.mainLoop);
    }
    
    start() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }
    
    stop() {
        if (this.rafId) {
          cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
};