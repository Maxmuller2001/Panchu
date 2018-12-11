function onLoad() {
    let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    let game: GameEngine.Game = new GameEngine.Game(canvasElement);
    game.Run();
}

window.onload = onLoad;