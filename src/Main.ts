function onLoad() {
    let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let canvas: Canvas = new Canvas(canvasElement);
    let game: Game = new Game(canvas);
    let screen = new StartScreen(canvas);
    screen.draw();

}

window.onload = onLoad;