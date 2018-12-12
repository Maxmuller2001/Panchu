class Canvas {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    // Clear the screen
    public Clear() {
        this.context.clearRect(
            0, 0,
            this.canvas.width,
            this.canvas.height
        );
    }

    public DrawRectangle(x: number, y: number, width: number, height: number, fillColor: string = "black") {
        this.context.fillStyle = fillColor;
        this.context.fillRect(x, y, width, height);
    }

    public DrawStrokedRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        lineWidth = 4,
        strokeColor: string = "black",
        fillColor: string = strokeColor
    ) {
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = strokeColor;
        this.context.lineWidth = lineWidth;
        this.context.strokeRect(
            x + lineWidth / 2,
            y + lineWidth / 2,
            width - lineWidth,
            height - lineWidth
        );
    }

    public WriteText(
        text: string,
        x: number,
        y: number,
        fontSize: number = 30,
        color: string = "white",
        maxWidth?: number
    ) {
        this.context.fillStyle = color;
        this.context.font = `${fontSize.toString()}px Arial`;
        this.context.fillText(
            text,
            x,
            y + fontSize,
            maxWidth
        );
    }

    public DrawImage(image: HTMLImageElement, x: number, y: number, width?: number, height?: number) {
        this.context.drawImage(
            image,
            x,
            y,
            width,
            height
        );
    }

}