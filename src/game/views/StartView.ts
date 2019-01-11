class StartView extends View {

    public choice: string;
    public colorChoice: string;

    // Callback
    public OnChoice: (choice: string) => void = (choice: string): void => {};

    constructor(canvas: Canvas, game: Game, mouse: Mouse) {
        super(canvas, game, mouse);
        // Load the entities so they can be rendered
        this.choice = "None";
    }

    public LoadEntities() {
        const writeTtile = this.canvas.WriteText("Title!", innerWidth / 2, 100, 50, "#FFF", "center");
        const canvasWidth = innerWidth;
        const canvasHeight = innerHeight;
        const boxMiddelLeft = (canvasWidth / 2) - ((canvasWidth / 2) / 2) - 50
        const boxMiddelRight = (canvasWidth / 2) - ((((((canvasWidth / 2) / 2) / 2) / 2) / 2) / 2) + 15;

        // Choice Dutch
        let choiceDutch: Box = new Box(boxMiddelLeft, 120, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceDutch.text = "Nederlands";
        choiceDutch.fillColor = "#00b4db";
        choiceDutch.OnClick = (): void => {
            this.choice = "Dutch";
            choiceDutch.fillColor = "#f5d76e";
            choiceHistory.fillColor = "#fad859";
            choiceMath.fillColor = "#fad859";
            choiceGeography.fillColor = "#fad859";
            choiceTopography.fillColor = "#fad859";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#f5d76e";
            document.getElementById("canvas").style.backgroundColor = "#f4d03f";
            let iconDutch = new ImageBox("./assets/images/subjects/icon_nl2.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconDutch);
        }

        // Choice History
        let choiceHistory: Box = new Box(boxMiddelLeft, 230, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceHistory.text = "Geschiedenis";
        choiceHistory.fillColor = "#00b4db";
        choiceHistory.OnClick = (): void => {
            this.choice = "History";
            choiceDutch.fillColor = "#c0392b";
            choiceHistory.fillColor = "#e74c3c";
            choiceMath.fillColor = "#c0392b";
            choiceGeography.fillColor = "#c0392b";
            choiceTopography.fillColor = "#c0392b";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#e74c3c";
            document.getElementById("canvas").style.backgroundColor = "#96281b";
            let iconHistory = new ImageBox("./assets/images/subjects/icon_gs2.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconHistory);
        }

        // Choice Math
        let choiceMath: Box = new Box(boxMiddelLeft, 340, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceMath.fillColor = "#00b4db";
        choiceMath.text = "Rekenen";
        choiceMath.OnClick = (): void => {
            this.choice = "Math";
            choiceDutch.fillColor = "#446cb3";
            choiceHistory.fillColor = "#446cb3";
            choiceMath.fillColor = "#4b77be";
            choiceGeography.fillColor = "#446cb3";
            choiceTopography.fillColor = "#446cb3";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#4b77be";
            document.getElementById("canvas").style.backgroundColor = "#3a539b";
            let iconMath = new ImageBox("./assets/images/subjects/Rekenen.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconMath);
        }

        // Choice Geography
        let choiceGeography: Box = new Box(boxMiddelLeft, 450, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceGeography.text = "Aardrijkskunde";
        choiceGeography.fillColor = "#00b4db";
        choiceGeography.OnClick = (): void => {
            this.choice = "Geography";
            choiceDutch.fillColor = "#e74c3c";
            choiceHistory.fillColor = "#e74c3c";
            choiceMath.fillColor = "#e74c3c";
            choiceGeography.fillColor = "#e07267";
            choiceTopography.fillColor = "#e74c3c";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#e74c3c";
            document.getElementById("canvas").style.backgroundColor = "#c0392b";
            let iconGeograpy = new ImageBox("./assets/images/subjects/Aardrijkskunde.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconGeograpy);

        }

        let choiceTopography: Box = new Box(boxMiddelLeft, 560, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceTopography.text = "Topografie";
        choiceTopography.fillColor = "#00b4db";
        choiceTopography.OnClick = (): void => {
            this.choice = "Topography";
            choiceDutch.fillColor = "#00b16a";
            choiceHistory.fillColor = "#00b16a";
            choiceMath.fillColor = "#00b16a";
            choiceGeography.fillColor = "#00b16a";
            choiceTopography.fillColor = "#87d37c";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#87d37c";
            document.getElementById("canvas").style.backgroundColor = "#26a65b";
            let iconTopograpy = new ImageBox("./assets/images/subjects/icon_tg2.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconTopograpy);
        }

        let imageChoice: Box = new Box(boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
        imageChoice.fillColor = "#c4d1d3";

        let playButton: Box = new Box(boxMiddelRight, 560, (canvasWidth / 2) / 2, 80, this.canvas);
        playButton.text = "Starten";
        playButton.fillColor = "#c4d1d3";
        playButton.OnClick = (): void => {
            if (this.choice)
                this.game.GoToQuestionView(this.choice);
        }
        let iconChoice = new ImageBox("./assets/images/subjects/Choice.png",boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);

        // Add them to the entities array so that they will render
        this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconChoice);

    }

    public getChoice(): string {
        return this.choice;
    }

}