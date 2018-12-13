function onLoad() {
    let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let game: Game = new Game(canvasElement);
    game.Run();
}

window.onload = onLoad;