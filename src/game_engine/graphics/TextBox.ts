class TextBox extends Entity {

    public text: string;
    private readonly textColor: string;
    private readonly fontSize: number;
    private readonly lineWidth: number;
    private readonly strokeColor: string;
    private readonly fillColor: string;

    constructor(
        text: string,
        x: number,
        y: number,
        width: number,
        height: number,
        canvas: Canvas,
        textColor?: string,
        fontSize?: number,
        lineWidth?: number,
        strokeColor?: string,
        fillColor?: string
    ) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);

        this.text = text;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.lineWidth = lineWidth;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    }
    
    public Draw() {
        // Draw the box
        this.canvas.DrawStrokedRectangle(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y,
            this.lineWidth,
            this.strokeColor,
            this.fillColor
        );

        // Write the text
        this.canvas.WriteText(
            this.text,
            this.position.x,
            this.position.y + this.size.y / 4,
            this.fontSize,
            this.textColor
        );
    }
}