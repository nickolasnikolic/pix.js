
class Px{
    constructor(imageUrl){

        this.imageArray = [];
        this.width = null;
        this.height = null;

        //pull the image
        const i = new Image();
        i.src = imageUrl;

        i.addEventListener('load', () => {
            //process it
            //put it on canvas
            const canvas = document.createElement('canvas');
            canvas.width = i.width;
            canvas.height = i.height;
            const c = canvas.getContext('2d');
            c.drawImage(i, 0, 0, i.width, i.height);
            //get image data
            let imageData = c.getImageData(0,0,i.width, i.height);

            this.width = imageData.width;
            this.height = imageData.height;

            //where there is a pixel, put an object
            let xArrayOffset = 0;
            for(let y = 0; y < imageData.height; y++){
                let xOfPixel = 0;
                xArrayOffset += imageData.width * 4;
                for(let x = 0; x < imageData.width * 4; x += 4){

                    let pixel = {};
                    
                    pixel.r = imageData.data[x + xArrayOffset];
                    pixel.g = imageData.data[x + 1 + xArrayOffset];
                    pixel.b = imageData.data[x + 2 + xArrayOffset];
                    pixel.a = imageData.data[x + 3 + xArrayOffset];

                    pixel.x = xOfPixel++;
                    pixel.y = y;
                    
                    this.imageArray.push(pixel);
                }
            }
        });
    }

    // get a pixel value object
    getPixel(coordX, coordY){
        //calculate how far over the offset must be
        const x = coordX;
        const y = coordY;

        let arrayOffSet = (x + (y * this.width));
    
        //return that object
        return this.imageArray[arrayOffSet];
        
    }

    //get an array of pixels
    getPixelSubsection(coordX, coordY, width, height){
        //calculate how far over the offset must be
        let arrayOffSet = coordX + (coordY * this.width);
            
        //return that object array
        if(width > 1 || height > 1){
            let subSection = [];
            //get values in square
            for(let y = coordY; y < height; y++){
                for(let x = arrayOffSet; x < arrayOffSet + width; x++){
                    subSection.push(this.imageArray[x]);
                }
            }
            return subSection;
        }else{
            return this.getPixel(coordX, coordY); //return individual pixel
        }
    }

    get(){
        return this.imageArray;
    }
}