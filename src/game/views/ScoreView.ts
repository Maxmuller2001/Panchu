class ScoreView extends View {

    private static amountOfScores: number = 5;


    constructor(canvas: Canvas, game: Game, mouse: Mouse) {
        super(canvas, game, mouse);
    }

    public LoadEntities() {

        const canvasSize: Vector2 = this.canvas.GetSize();

        // Draw the title
        let title: Box = new Box(
            0, 0,
            canvasSize.x / 4,
            canvasSize.y / 8,
            this.canvas
        );
        title.position.x = canvasSize.x / 2 - title.size.x / 2;
        title.position.y = canvasSize.y / 6;
        title.fillColor = "#00b4db";
        title.fontSize = 35;
        title.text = "Scores";
        
        // Draw the back button
        let backButton: Box = new Box(0, 0, title.size.x, title.size.y / 4 * 3, this.canvas);
        backButton.position.x = canvasSize.x / 2 - backButton.size.x / 2;
        backButton.position.y = canvasSize.y - canvasSize.y / 20 - backButton.size.y;
        backButton.text = "Ga terug";
        backButton.fillColor = "gray";
        backButton.OnClick = (): void => {
            this.game.GoToStartView();
        }

        // Draw the scores
        const padding: number = 10;
        const _scores: number = Math.min(ScoreView.amountOfScores, Score.scores.length)
        for (let i: number = 0; i < _scores; i++) {
            const score: number = Score.scores[i];
            const n: number = i + 1;

            let scoreBox: Box = new Box(title.position.x, 0, title.size.x, title.size.y / 4 * 3, this.canvas);
            scoreBox.position.y = title.position.y + title.size.y + padding * n + scoreBox.size.y * i;
            scoreBox.text = `${score}`;
            scoreBox.fillColor = "#00b4db";

            let numberBox: TextBox = new TextBox(
                0,
                scoreBox.position.y,
                scoreBox.size.y,
                scoreBox.size.y,
                this.canvas
            );
            numberBox.position.x = scoreBox.position.x;
            numberBox.text = `${n}.`;

            // Push the entity
            this.entities.push(scoreBox, numberBox);
        }
        
        // Push the entities
        this.entities.push(title, backButton);

    }

}