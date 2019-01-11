function onLoad() {
    // Get the canvas on which the game runs
    let canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
    // Create an instance of the game
    let game: Game = new Game(canvasElement);
    // Run the instance of the game
    game.Run();
}

// Set the callback function on the event 'onload'
window.onload = onLoad;