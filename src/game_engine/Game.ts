class Game {
    private canvas: Canvas;

    private mouse: Mouse;

    // In miliseconds
    private lastTimeStamp: number = 0;

    // Views
    private demoLevelScreen: DemoLevelScreen;
    private questionScreen: QuestionScreen;
    private startScreen: StartScreen;


    constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = new Canvas(canvasElement);
        this.mouse = new Mouse(canvasElement);

        this.demoLevelScreen = new DemoLevelScreen(this.canvas, this.mouse);
        this.questionScreen = new QuestionScreen(this.canvas, this.mouse);
        this.startScreen = new StartScreen(this.canvas, this.mouse);
    }
    

    /**
     * Run
     */
    public Run = (timeStamp: number = 0) => {
        // Calculate the time between the current and last frame from miliseconds to seconds
        const deltaTime: number = (timeStamp - this.lastTimeStamp) / 1000;
        this.lastTimeStamp = timeStamp;

        // Clear the canvas
        this.canvas.Clear();
        //this.startScreen.Draw();
        //this.demoLevelScreen.Draw();
        //this.demoLevelScreen.Draw();

        requestAnimationFrame(this.Run);
    }


}