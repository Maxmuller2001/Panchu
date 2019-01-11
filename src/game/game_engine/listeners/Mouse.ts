class Mouse {

    private position: Vector2 = new Vector2(0, 0);

    private canvasElement: HTMLCanvasElement;

    constructor(canvasElement: HTMLCanvasElement) {
        this.canvasElement = canvasElement;
        canvasElement.addEventListener("mousemove", this.onMouseMove);
    }

    // Updates the mouse position
    private onMouseMove = (event: MouseEvent): void => {
        this.position.x = event.clientX;
        this.position.y = event.clientY;
    }

    // Used to bind callbacks
    public BindCallback(eventName: string, callback: () => void) {
        this.canvasElement.addEventListener(eventName, callback);
    }

    // Returns the position of the mouse
    public GetPosition(): Vector2 {
        return this.position;
    }

}