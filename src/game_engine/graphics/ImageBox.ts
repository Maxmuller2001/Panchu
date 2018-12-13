class ImageBox extends Entity {

    public scale: number;

    private image: HTMLImageElement;
    private canDraw: boolean;

    //public onClick: 

    constructor(source: string, x: number, y: number, width: number, height: number, canvas: Canvas, mouse: Mouse) {
        super(new Vector2(x, y), new Vector2(width, height), canvas, mouse);
        this.scale = 1;
        this.image = new Image(width, height);
        this.image.onload = () => { this.canDraw = true };
        this.image.src = source;
    }

    public Draw() {
        console.log(this.image.src);
        if (this.canDraw === true) {
            console.log(1);
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