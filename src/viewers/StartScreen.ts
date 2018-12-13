/// <reference path="../game_engine/base/View.ts"/>
class StartScreen extends View {
    textBox: TextBox;

    constructor(canvas: Canvas, mouse: Mouse) {
        // Add images to this canvasElement
        super(canvas, mouse);
    }

    public Draw = () => {
        const canvasSize: Vector2 = this.canvas.GetSize();

        let textBoxInformation = new TextBox("", 75, 50, 600, 720, this.canvas, this.mouse, "white", 30, 500, "#007ded", "#007ded");
        let textBoxInstruction = new TextBox("Kies een onderwerp", 80, 50, 500, 250, this.canvas, this.mouse, "white", 30, 200, "#007ded", "#007ded");
        let subjectBox = new TextBox("", 800, 100, 500, 250, this.canvas, this.mouse, "white", 30, 200, "#1a94ff", "#1a94ff");
        let startButton = new TextBox("start", 955, 630, 200, 100, this.canvas, this.mouse, "white", 80, 50, "#fe7300", "#fe7300");
        let levelChoice = new TextBox("level ...", 800, 400, 400, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
        let DutchChoice = new TextBox("Nederlands", 80, 350, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
        let EnglishChoice = new TextBox("Engels", 80, 450, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
        let mathChoice = new TextBox("Rekenen", 80, 550, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
        let GeographyChoice = new TextBox("Topografie", 80, 650, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
        let subjectImage = new ImageBox("./assets/images/subjects/math.png", 950, 130, 200, 200, this.canvas, this.mouse);

        textBoxInformation.Draw();
        textBoxInstruction.Draw();
        startButton.Draw();
        levelChoice.Draw();
        DutchChoice.Draw();
        EnglishChoice.Draw();
        mathChoice.Draw();
        GeographyChoice.Draw();
        subjectImage.Draw();
        subjectBox.Draw();

    }
}