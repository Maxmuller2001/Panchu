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
            this.context = canvas.getContext('2d');
        }
        Clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        DrawRectangle(x, y, width, height, fillColor = "black") {
            this.context.fillStyle = fillColor;
            this.context.fillRect(x, y, width, height);
        }
        DrawStrokedRectangle(x, y, width, height, lineWidth = 4, strokeColor = "black", fillColor = strokeColor) {
            this.context.fillStyle = fillColor;
            this.context.strokeStyle = strokeColor;
            this.context.lineWidth = lineWidth;
            this.context.strokeRect(x, y, width, height);
        }
        WriteText(text, x, y, width, fontSize = 30, color = "white") {
            this.context.fillStyle = color;
            this.context.font = `${fontSize}px Minecraft`;
            this.context.fillText(text, x, y, width);
        }
        DrawImage(source, x, y, width, height) {
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
            this.Run = (timeStamp = 0) => {
                const deltaTime = (timeStamp - this.lastTimeStamp) / 1000;
                this.lastTimeStamp = timeStamp;
                this.canvas.Clear();
                this.entities.forEach((entity) => {
                    entity.Draw(deltaTime);
                });
                requestAnimationFrame(this.Run);
            };
            this.canvas = new GameEngine.Canvas(canvasElement);
        }
    }
    GameEngine.Game = Game;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class Entity {
        constructor(position, size, canvas) {
            this.size = size;
            this.position = position;
            this.canvas = canvas;
        }
        GetSize() {
            return this.size;
        }
        GetPosition() {
            return this.position;
        }
    }
    GameEngine.Entity = Entity;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class DynamicEntity extends GameEngine.Entity {
        constructor() {
            super(...arguments);
            this.velocity = new Vector2(0, 0);
        }
    }
    GameEngine.DynamicEntity = DynamicEntity;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class StaticEntity extends GameEngine.Entity {
    }
    GameEngine.StaticEntity = StaticEntity;
})(GameEngine || (GameEngine = {}));
var GameEngine;
(function (GameEngine) {
    class TextBox extends GameEngine.StaticEntity {
        constructor(text, x, y, width, height, canvas, textColor, fontSize, lineWidth, strokeColor, fillColor) {
            const position = new Vector2(x, y);
            const size = new Vector2(width, height);
            super(position, size, canvas);
            this.text = text;
            this.textColor = textColor;
            this.fontSize = fontSize;
            this.lineWidth = lineWidth;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }
        Draw() {
            const position = this.GetPosition();
            const size = this.GetSize();
            this.canvas.DrawStrokedRectangle(position.x, position.y, size.x, size.y, this.lineWidth, this.strokeColor, this.fillColor);
            this.canvas.WriteText(this.text, this.fontSize, position.x, position.y, this.fontSize, this.textColor);
        }
        SetText(text) {
            this.text = text;
        }
    }
    GameEngine.TextBox = TextBox;
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
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=app.js.map