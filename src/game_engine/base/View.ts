abstract class View {

    protected canvas: Canvas;
    protected mouse: Mouse;

    protected constructor(canvas: Canvas, mouse: Mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
    }


    abstract Draw(deltaTime: number): void;

}