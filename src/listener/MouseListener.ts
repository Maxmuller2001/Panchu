class Mouse {

    private position: Vector2 = new Vector2(0, 0);

    private canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
        canvasElement.addEventListener("mousemove", this.onMouseMove);
    }

    private onMouseMove = (event: MouseEvent): void => {
        this.position.x = event.clientX;
        this.position.y = event.clientY;
    }

    public BindCallback(eventName: string, callback: () => void) {
        this.canvasElement.addEventListener(eventName, callback);
    }

}