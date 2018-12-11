function onLoad() {
    let canvasElement = document.getElementById("canvas");
    let game = new GameEngine.Game(canvasElement);
    game.Run();
}
window.onload = onLoad;
var GameEngine;
(function (GameEngine) {
    class Canvas {
        constructor(canvas) {
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');
            console.log('in canvas constructor');
        }
        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        writeTextToCanvas(Text, FontSize, Xpos, Ypos, Color = "white", Alignment = "center") {
            this.context.font = `${FontSize}px Minecraft`;
            this.context.fillStyle = Color;
            this.context.textAlign = Alignment;
            this.context.fillText(Text, Xpos, Ypos);
        }
        writeImageFromFileToCanvas(Src, Xpos, Ypos) {
            let image = new Image();
            image.addEventListener('load', () => {
                this.context.drawImage(image, Xpos, Ypos);
            });
            image.src = Src;
        }
    }
    GameEngine.Canvas = Canvas;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class Game {
        constructor(canvasElement) {
            this.entities = [];
            this.lastTimeStamp = 0;
            this.canvas = new GameEngine.Canvas(canvasElement);
        }
        Run(timeStamp = 0) {
            const deltaTime = (timeStamp - this.lastTimeStamp) / 1000;
            this.canvas.clear();
            this.entities.forEach((entity) => {
                entity.draw(deltaTime);
            });
            requestAnimationFrame(this.Run);
        }
    }
    GameEngine.Game = Game;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class QuestionScreen {
    }
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class Entity {
        constructor(canvas, imageSrc, xPos, yPos, width, height) {
            this.canvas = canvas;
            this.imageSrc = imageSrc;
            this.xPos = xPos;
            this.yPos = yPos;
            this.width = width;
            this.height = height;
        }
        draw(deltaTime) {
            this.canvas.writeImageFromFileToCanvas(this.imageSrc, this.xPos, this.yPos);
        }
        getX() {
            return this.xPos;
        }
        getY() {
            return this.yPos;
        }
        getWidth() {
            return this.width;
        }
        getHeight() {
            return this.height;
        }
    }
    GameEngine.Entity = Entity;
})(GameEngine || (GameEngine = {}));
class KeyBoardListener {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = true;
            }
            if (event.keyCode == 38) {
                this.upPressed = true;
            }
            if (event.keyCode == 39) {
                this.rightPressed = true;
            }
            if (event.keyCode == 40) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 38) {
                this.upPressed = false;
            }
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
            if (event.keyCode == 40) {
                this.downPressed = false;
            }
        };
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getUpPressed() {
        return this.upPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getdownPressed() {
        return this.downPressed;
    }
}
//# sourceMappingURL=app.js.map