abstract class Entity {

    protected position: Vector2;
    protected size: Vector2;

    protected canvas: Canvas;
    protected mouse: Mouse;

    protected constructor(position: Vector2, size: Vector2, canvas: Canvas, mouse: Mouse) {
        this.size = size;
        this.position = position;
        this.canvas = canvas;
        this.mouse = mouse;
    }


    /**
     * GetSize
     */
    public GetSize(): Vector2 {
        return this.size;
    }

    /**
     * GetPosition
     */
    public GetPosition(): Vector2 {
        return this.position;
    }


    abstract Draw(deltaTime: number): void;

}