/// <reference path="../game_engine/base/View.ts"/>
class DemoLevelScreen extends View {
    textBox: TextBox;

    constructor(canvas: Canvas, mouse: Mouse) {
        // Add images to this canvasElement
        super(canvas, mouse);
    }

    public Draw = () => {
        let player = new ImageBox("./assets/images/player.png", 0, 0, 100, 100, this.canvas, this.mouse);
        player.Draw();

        let floor = new ImageBox("./assets/images/floortexture.png", 0, 510, 1900, 100, this.canvas, this.mouse);
        floor.Draw();
    }
}