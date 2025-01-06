class Resources {
    //concepts:
        //functional vs object oriented programming?
            //functional: based around functions (inputs and outputs), no state maintained
            //OOP: based around objects; can maintain state
        //json: works as a dict, can be serialized and deserialized from str to native js obj
        //constructor: special method for init an object instance of class in js (like __init__)
        //js classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes 


    constructor() {
        //obj for every asset we plan to download
        this.toLoad = {
            //download image files
            sky: "sprites/sky.png",
            ground: "sprites/ground.png",
            hero: "sprites/hero-sheet.png",
            shadow: "sprites/shadow.png",
        };

        //A bucket to keep all of our images
        this.images = {};

        //load each image
        //iterate through keys of "to load"
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            //create entry into bucket
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            //creates safety check to make sure image is loaded
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
    
}

// export an instance of resources class
export const resources = new Resources();