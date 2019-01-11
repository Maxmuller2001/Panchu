abstract class View {

    protected canvas: Canvas;
    protected game: Game;
    protected canvasElement: HTMLCanvasElement;
    protected mouse: Mouse;
    protected entities: Entity[] = [];

    private click: boolean = false;

    // Callback
    public BeforeExit: () => void = (): void => { };

    protected constructor(canvas: Canvas, game: Game, mouse: Mouse) {
        this.game = game;
        this.canvas = canvas;
        this.mouse = mouse;
        this.canvasElement = canvas.canvas;

        // Detect a click
        mouse.BindCallback("click", () => { this.click = true });
    }

    // Load the content of the 'View'
    public abstract LoadEntities(): void;

    public Draw(deltaTime: number): void {
        // Update the mouse events
        this.mouseUpdate();
        // Draw
        this.entities.forEach((entity: Entity) => { entity.Draw() });
    }

    public ClearView(): void {
        this.entities = [];
    }

    private mouseUpdate() {
        // Loop through the 'this.entities' array inversely, so that the visible entities are checked first
        for (let i = this.entities.length; i > 0; i--) {
            let entity: Entity = this.entities[i - 1];

            let mousePosition: Vector2 = this.mouse.GetPosition();
            let entityPosition = entity.position;
            let entitySize = entity.size;
            // Check if the mouse is in entity
            if (
                mousePosition.x >= entityPosition.x &&
                mousePosition.x <= entityPosition.x + entitySize.x &&
                mousePosition.y >= entityPosition.y &&
                mousePosition.y <= entityPosition.y + entitySize.y
            ) {
                // Call the callbacks
                entity.OnHover();
                if (this.click)
                    entity.OnClick();
            }
        }

        // Set the this.click variable to false in order to refresh it
        this.click = false;
    }
    
}