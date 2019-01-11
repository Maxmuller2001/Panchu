class Canvas {
    public readonly canvas: HTMLCanvasElement;
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
        lineWidth: number,
        strokeColor: string = "black",
        fillColor: string = "white"
    ) {
        this.DrawRectangle(x + lineWidth / 2,
            y + lineWidth / 2,
            width - lineWidth,
            height - lineWidth,
            fillColor
        );

        this.context.strokeStyle = strokeColor;
        this.context.lineWidth = lineWidth;
        
        this.context.strokeRect(
            x + lineWidth / 2,
            y + lineWidth / 2,
            width - lineWidth,
            height - lineWidth
        );
    }

    public DrawCircle(x: number, y: number, radius: number, endAngle: number, counterClockwise: boolean, LineWidth: number, BorderColor: string, FillStyle?: string){
        this.context.beginPath();
        this.context.arc(x, y, radius, 1.501 * Math.PI, endAngle, counterClockwise);
        this.context.lineWidth = LineWidth;
        this.context.strokeStyle = BorderColor;
        this.context.stroke(); 
        this.context.fillStyle = FillStyle;
        this.context.fill();
    }

    public WriteText(
        text: string,
        x: number,
        y: number,
        fontSize: number = 30,
        color: string = "white",
        // Giving this variable its actual datatype causes a weird error...
        alignment: any = "center",
        maxWidth?: number
    ) {
        this.context.fillStyle = color;
        this.context.font = `${fontSize.toString()}px Arial`;
        this.context.textAlign = alignment;
        this.context.fillText(
            text,
            x,
            y,
            maxWidth
        );
    }

    public DrawImage(source: string, x: number, y: number, width?: number, height?: number) {
        let image: HTMLImageElement = new Image(width, height);

        image.onload = () => {
            this.context.drawImage(
                image,
                x,
                y,
                width,
                height
            );
        }

        image.src = source;

        return image;
    }

    public DrawImageFromFile(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
        this.context.drawImage(
            image,
            x,
            y,
            width,
            height
        );
    }


    public GetSize(): Vector2 {
        const size: Vector2 = new Vector2(this.canvas.width, this.canvas.height);
        return size;
    }

}