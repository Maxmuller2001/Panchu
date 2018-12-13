function onLoad() {
    let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let canvas: Canvas = new Canvas(canvasElement);
    let game: Game = new Game(canvas);
    let edgar = new QuestionScreen(canvas);
    edgar.draw();
}

window.onload = onLoad;