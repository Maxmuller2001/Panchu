class TextBox extends Entity {

    // Properties
    public text: string = "";
    public textColor: string;
    public fontSize: number = 30;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        canvas: Canvas
    ) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
    }
    
    public Draw() {
        // Write the text
        this.canvas.WriteText(
            this.text,
            this.position.x + this.size.x / 2,
            this.position.y + this.fontSize / 2 + this.size.y / 2 - 5,
            this.fontSize,
            this.textColor
        );
    }
}