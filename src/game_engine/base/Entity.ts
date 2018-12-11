namespace GameEngine {

    export class Entity {
        protected xPos: number;
        protected yPos: number;
        protected height: number;
        protected width: number;
        private imageSrc: string;
        private canvas: Canvas;

        public constructor(
            canvas: Canvas,
            imageSrc: string,
            xPos: number,
            yPos: number,
            width: number,
            height: number
        ) {
            this.canvas = canvas;
            this.imageSrc = imageSrc;
            this.xPos = xPos;
            this.yPos = yPos;
            this.width = width;
            this.height = height;
        }
        public draw(deltaTime: number) {
            this.canvas.writeImageFromFileToCanvas(this.imageSrc, this.xPos, this.yPos);
        }

        public getX(): number {
            return this.xPos;
        }

        public getY(): number {
            return this.yPos;
        }

        public getWidth(): number {
            return this.width;
        }

        public getHeight(): number {
            return this.height;
        }
    }
}

