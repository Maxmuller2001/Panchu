class Game {
    private canvas: Canvas;
    private keyBoard: KeyBoard;
    private mouse: Mouse;

    // In miliseconds
    private lastTimeStamp: number = 0;

    // Views
    private startView: StartView;
    private questionView: QuestionView;
    private scoreView: ScoreView;

    private currentView: View;

    private readonly questions: Questions = new Questions();
    private subject: any;

    // Callback
    private BeforeFrame: () => void = (): void => { };


    constructor(canvasElement: HTMLCanvasElement) {
        this.canvas = new Canvas(canvasElement);
        this.mouse = new Mouse(canvasElement);
        this.keyBoard = new KeyBoard();

        this.startView = new StartView(this.canvas, this, this.mouse);
        this.questionView = new QuestionView(this.canvas, this, this.mouse);
        this.scoreView = new ScoreView(this.canvas, this, this.mouse);

        // Set the first view
        this.currentView = this.startView;
        // Load the first view
        this.changeView(this.currentView);
    }


    public GoToQuestionView(choice: string) {
        switch (choice) {
            case "Math":
                this.subject = this.questions.math;
                break;
            case "Geography":
                this.subject = this.questions.geography;
                break;
            case "Dutch":
                this.subject = this.questions.dutch;
                break;
            case "Topography":
                this.subject = this.questions.topography;
                break;
            case "History":
                this.subject = this.questions.history;
                break;
        }
        this.changeView(this.questionView);
    }

    public GoToScoreView() {
        this.changeView(this.scoreView);
    }

    public GoToStartView() {
        this.changeView(this.startView);
    }


    /**
     * Run
     */
    public Run = (timeStamp: number = 0) => {
        // Calculate the time between the current and last frame from miliseconds to seconds
        const deltaTime: number = (timeStamp - this.lastTimeStamp) / 1e3;
        this.lastTimeStamp = timeStamp;

        // Clear the canvas
        this.canvas.Clear();
        // Call the callback
        this.BeforeFrame();
        if (this.BeforeFrame)
            this.BeforeFrame = (): void => { };
        // Load the view
        this.currentView.Draw(deltaTime);

        // Loop
        requestAnimationFrame(this.Run);
    }

    private changeView(view: View) {
        this.BeforeFrame = (): void => {
            this.currentView.BeforeExit();
            this.currentView.ClearView();

            view.LoadEntities();
            this.currentView = view;
        }
    }

    public GetSubject(): any {
        return this.subject;
    }

}