class ImageBox extends Entity {

    public scale: number;

    private image: HTMLImageElement;

    private loaded: boolean = false;

    constructor(source: string, x: number, y: number, width: number, height: number, canvas: Canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.scale = 1;
        this.image = new Image(width, height);
        this.image.onload = () => { this.loaded = true };
        this.image.src = source;
    }

    public Draw() {
        // Make sure that it only draws when 'this.image' is loaded
        if (this.loaded === true) {
            // Draw the image from file so that it does not have to load each frame (from URL)
            this.canvas.DrawImageFromFile(
                this.image,
                this.position.x,
                this.position.y,
                this.size.x * this.scale,
                this.size.y * this.scale
            );
        }
    }
}