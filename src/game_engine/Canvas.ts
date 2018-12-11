namespace GameEngine {

    export class Canvas {
        private readonly canvas: HTMLCanvasElement;
        private readonly context: CanvasRenderingContext2D;

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');
            console.log('in canvas constructor');
        }

        // clear the screen
        public clear(): void {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        /**
             * writeTextToCanvas
             * @AccessModifier {public}
             * Handles the internal redirection of the click event.
             * @param {string} text -
             * @param {number} fontSize -
             * @param {number} aXpos -
             * @param {number} aYpos -
             * @param {string} color -
             * @param {CanvasTextAlign} alignment -
             */
        public writeTextToCanvas(Text: string,
            FontSize: number,
            Xpos: number,
            Ypos: number,
            Color: string = "white",
            Alignment: any = "center") {

            this.context.font = `${FontSize}px Minecraft`;
            this.context.fillStyle = Color;
            this.context.textAlign = Alignment;
            this.context.fillText(Text, Xpos, Ypos);
        }

        /**
        * writeTextToCanvas
        * @AccessModifier {public}
        * Handles the internal redirection of the click event.
        * @param {string} Src - the source of the resource
        * @param {number} Xpos - the x axis value of the coordinate
        * @param {number} Ypos - the y axis value of the coordinate
        */
        public writeImageFromFileToCanvas(Src: string,
            Xpos: number,
            Ypos: number) {

            let image = new Image();
            // add the listener so the waiting will not affect the change
            image.addEventListener('load', () => {
                //this.d_context.clip();
                this.context.drawImage(image, Xpos, Ypos);
            });

            // load the source in the image.
            image.src = Src;
        }
    }
}
