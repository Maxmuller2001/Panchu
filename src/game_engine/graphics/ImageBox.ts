class ImageBox extends Entity {

    public scale: number;

    private image: HTMLImageElement;
    private imageSource: string;

    constructor(source: string, x: number, y: number, width: number, height: number, canvas: Canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.scale = 1;
        this.imageSource = source;
    }

    public Draw() {
        if (this.image) {
            this.canvas.DrawImageFromFile(
                this.image,
                this.position.x,
                this.position.y,
                this.size.x * this.scale,
                this.size.y * this.scale
            );
        } else {
            this.image = this.canvas.DrawImage(
                this.imageSource,
                this.position.x,
                this.position.y,
                this.size.x * this.scale,
                this.size.y * this.scale
            );
        }
    }

}