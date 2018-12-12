class StartScreen {
    private canvas: Canvas;
    private button: Button;

    constructor(canvas: Canvas) {
        // Add images to this canvasElement
        this.canvas = canvas;
    }

    public draw = () => {
        let startButton = new Button("Test", 150, 150, 100, 100, this.canvas, "../assets/images/button.png");
        startButton.Draw();
        // let textBoxInformation = new TextBox("Hallo", 0, 0, 100, 100, this.canvas);
        // textBoxInformation.Draw();
    }
    

}