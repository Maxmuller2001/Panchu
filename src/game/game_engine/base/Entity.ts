abstract class Entity {

    // Properties
    public position: Vector2;
    public size: Vector2;

    // Event callbacks
    public OnHover: () => void = () => {};
    public OnClick: () => void = () => {};
    public BeforePhysicsUpdate: () => void = () => {};

    protected canvas: Canvas;

    protected constructor(position: Vector2, size: Vector2, canvas: Canvas) {
        this.size = size;
        this.position = position;
        this.canvas = canvas;
    }


    public Update(deltaTime: number): void {};
    public abstract Draw(): void;

}