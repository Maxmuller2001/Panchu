/// <reference path="../Questions.ts"/>
class QuestionView extends View {
    private readonly boxColor: string = "#00b4db";
    private readonly correctColor: string = "#00b16a";
    private readonly incorrectColor: string = "#e74c3c";

    private readonly fontSize: number = 30;

    private readonly answerDelay: number = 0.2;

    private correctCount: number = 0;
    private wrongCount: number = 0;

    private timer: Timer;
    private score: Score;

    private subject: any;


    constructor(canvas: Canvas, game: Game, mouse: Mouse) {
        super(canvas, game, mouse);
        this.BeforeExit = () => {
            this.correctCount = 0;
            this.wrongCount = 0;
        }
    }

    public LoadEntities(): void {

        this.subject = this.game.GetSubject();
        const offset: number = 10;
        const canvasSize: Vector2 = this.canvas.GetSize();

        // Load the timer
        this.timer = new Timer(0, 59, this.canvas);
        this.timer.box.position.x += offset;
        this.timer.box.position.y += offset;
        // Load the score
        this.score = new Score(this.canvas);
        this.score.box.position.x = canvasSize.x - this.score.box.size.x - offset;
        this.score.box.position.y = offset;
        // Load the first question
        this.entities.push(this.timer.box, this.score.box);
        this.loadQuestion();
        // Start the timer
        this.timer.Start();
        this.timer.OnFinished = () => {
            const score: number = this.score.GetScore();
            Score.AddScore(score);
            this.game.GoToScoreView();
        }

    }


    public getCorrectCount(): number {
        return this.correctCount;
    }

    public getWrongCount(): number {
        return this.wrongCount;
    }


    private shuffleAnswers(answers: string[]): string[] {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }

    private loadQuestion() {

        const canvasSize: Vector2 = this.canvas.GetSize();

        // Get the required data about the question
        const question: any = this.subject.GetQuestion();
        const correctAnswer: string = question.correctAnswer;
        let answers: string[] = this.subject.GetAnswers(question, 4);
        answers = this.shuffleAnswers(answers);

        // Draw the question
        let questionBox: Box = new Box(
            0,
            canvasSize.y / 4,
            canvasSize.x / 6 * 5,
            canvasSize.y / 10,
            this.canvas
        );
        questionBox.position.x = canvasSize.x / 2 - questionBox.size.x / 2;
        questionBox.fillColor = this.boxColor;
        questionBox.fontSize = this.fontSize;
        questionBox.text = question.question;
        
        // Draw the answers
        answers.forEach((answer: string, index: number) => {
            const yPositionStart: number = questionBox.position.y + questionBox.size.y;
            const questionMargin: number = questionBox.size.y / 4;
            const padding: number = questionBox.size.y / 8;
            const height: number = questionBox.size.y / 4 * 3;

            const yPosition: number = yPositionStart + questionMargin + height * index + padding * index;
            const box: Box = new Box(questionBox.position.x, yPosition, questionBox.size.x, height, this.canvas);
            box.text = answer;
            box.fontSize = this.fontSize - 4;
            box.fillColor = this.boxColor;

            // Set the callback
            box.OnClick = () => {
                const points: number = question.toughness * Score.scoreScale;
                if (box.text === correctAnswer) {
                    box.fillColor = this.correctColor;
                    this.score.Add(points);
                    this.correctCount++;
                }
                else {
                    box.fillColor = this.incorrectColor;
                    this.score.Add(-points);
                    this.wrongCount++;
                }
                // Go to the next question
                this.nextQuestion();
            }

            // Add it to the entities array so it gets drawn on the View
            this.entities.push(box);
        })
        
        // Add it to the entities array so it gets drawn on the View
        this.entities.push(questionBox);
        document.getElementById("canvas").style.backgroundColor = "#99ccff";
    }

    private nextQuestion() {
        // Add a slight delay before switching over to the next question
        setTimeout(
            () => {
                this.ClearView();
                this.loadQuestion();
                this.entities.push(this.timer.box, this.score.box);
            }, this.answerDelay * 1e3 // Multiply by 1000 to convert from s to ms
        )
    }

}