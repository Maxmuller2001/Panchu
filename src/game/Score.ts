class Score {
    // Is used as a display and carries all scores with a static number array

    private score: number = 0;
    public static readonly scoreScale: number = 1e1;
    public static scores: number[] = [];

    // THe display
    public box: TextBox;


    constructor(canvas: Canvas) {
        // Create the TextBox display
        const canvasSize: Vector2 = canvas.GetSize();
        const width: number = canvasSize.x / 20;
        const height: number = width / 2;

        this.box = new TextBox(0, 0, width, height, canvas);
        this.box.text = this.score.toString();
    }


    // Add x to the current score
    public Add(x: number) {
        x = Math.floor(x);
        this.score += x;
        if (this.score < 0) {
            this.score = 0;
        }
        this.updateText();
    }

    // Reset the display
    public Reset() {
        this.score = 0;
        this.updateText();
    }

    // Get the score
    public GetScore() {
        return this.score;
    }

    // Add a score to the static scores array
    public static AddScore(score: number) {
        Score.scores.push(score);
        Score.scores.sort((a: number, b: number): number => { return b - a; })
    }


    // Update the display
    private updateText() {
        this.box.text = this.score.toString();
    }

}