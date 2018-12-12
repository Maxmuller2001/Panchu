class ImageBox extends Entity {

    public scale: number;

    private image: HTMLImageElement;

    constructor(source: string, x: number, y: number, width: number, height: number, canvas: Canvas) {
        const position: Vector2 = new Vector2(x, y);
        const size: Vector2 = new Vector2(width, height);
        super(position, size, canvas);

        this.image = new Image(width, height);
        this.image.src = source;
        this.scale = 1;
    }

    public Draw() {
        this.canvas.DrawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.x * this.scale,
            this.size.y * this.scale
        );
    }

}