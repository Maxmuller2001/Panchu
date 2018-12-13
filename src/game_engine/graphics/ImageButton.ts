class ImageButton extends Entity {

    private imageBox: ImageBox;

    constructor(source: string, x: number, y: number, width: number, height: number, canvas: Canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.imageBox = new ImageBox(source, x, y, width, height, canvas);
    }

    public Draw() {
       this.imageBox.Draw();
    }

}