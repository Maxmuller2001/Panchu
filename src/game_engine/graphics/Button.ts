class Button extends Entity {

        public text: string;

        private readonly image: HTMLImageElement;

        private imageLoaded: boolean;

        constructor(text: string, x: number, y: number, width: number, height: number, canvas: Canvas, imageSource?: string) {
            const position: Vector2 = new Vector2(x, y);
            const size: Vector2 = new Vector2(width, height);
            super(position, size, canvas);

            this.text = text;

            if (imageSource) {
                this.image = new Image(width, height);
                this.image.onload = () => { this.imageLoaded = true; }
                this.image.src = imageSource;
            }
        }

        public Draw() {
            if (this.imageLoaded || this.image === undefined)
                this.canvas.DrawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
        }

}