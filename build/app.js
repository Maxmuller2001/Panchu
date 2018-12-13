function onLoad() {
    let canvasElement = document.getElementById("canvas");
    let game = new Game(canvasElement);
    game.Run();
}
window.onload = onLoad;
class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
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
        this.context.strokeRect(x + lineWidth / 2, y + lineWidth / 2, width - lineWidth, height - lineWidth);
    }
    DrawCircle(x, y, radius, endAngle, counterClockwise, LineWidth, BorderColor, FillStyle) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 1.501 * Math.PI, endAngle, counterClockwise);
        this.context.lineWidth = LineWidth;
        this.context.strokeStyle = BorderColor;
        this.context.stroke();
        this.context.fillStyle = FillStyle;
        this.context.fill();
    }
    WriteText(text, x, y, fontSize = 30, color = "white", alignment = "center", maxWidth) {
        this.context.fillStyle = color;
        this.context.font = `${fontSize.toString()}px Arial`;
        this.context.textAlign = alignment;
        this.context.fillText(text, x, y, maxWidth);
    }
    DrawImage(source, x, y, width, height) {
        let image = new Image(width, height);
        image.onload = () => {
            this.context.drawImage(image, x, y, width, height);
        };
        image.src = source;
        return image;
    }
    DrawImageFromFile(image, x, y, width, height) {
        this.context.drawImage(image, x, y, width, height);
    }
    GetSize() {
        const size = new Vector2(this.canvas.width, this.canvas.height);
        return size;
    }
}
class Game {
    constructor(canvasElement) {
        this.lastTimeStamp = 0;
        this.Run = (timeStamp = 0) => {
            const deltaTime = (timeStamp - this.lastTimeStamp) / 1000;
            this.lastTimeStamp = timeStamp;
            this.canvas.Clear();
            this.startScreen.Draw();
            requestAnimationFrame(this.Run);
        };
        this.canvas = new Canvas(canvasElement);
        this.mouse = new Mouse(canvasElement);
        this.demoLevelScreen = new DemoLevelScreen(this.canvas, this.mouse);
        this.questionScreen = new QuestionScreen(this.canvas, this.mouse);
        this.startScreen = new StartScreen(this.canvas, this.mouse);
    }
}
class Entity {
    constructor(position, size, canvas, mouse) {
        this.size = size;
        this.position = position;
        this.canvas = canvas;
        this.mouse = mouse;
    }
    GetSize() {
        return this.size;
    }
    GetPosition() {
        return this.position;
    }
}
class DynamicEntity extends Entity {
    constructor() {
        super(...arguments);
        this.velocity = new Vector2(0, 0);
        this.force = new Vector2(0, 0);
    }
}
class View {
    constructor(canvas, mouse) {
        this.canvas = canvas;
        this.mouse = mouse;
    }
}
class ImageBox extends Entity {
    constructor(source, x, y, width, height, canvas, mouse) {
        super(new Vector2(x, y), new Vector2(width, height), canvas, mouse);
        this.scale = 1;
        this.image = new Image(width, height);
        this.image.onload = () => { this.canDraw = true; };
        this.image.src = source;
    }
    Draw() {
        console.log(this.image.src);
        if (this.canDraw === true) {
            console.log(1);
            this.canvas.DrawImageFromFile(this.image, this.position.x, this.position.y, this.size.x * this.scale, this.size.y * this.scale);
        }
    }
}
class TextBox extends Entity {
    constructor(text, x, y, width, height, canvas, mouse, textColor, fontSize, lineWidth, strokeColor, fillColor) {
        super(new Vector2(x, y), new Vector2(width, height), canvas, mouse);
        this.text = text;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.lineWidth = lineWidth;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    }
    Draw() {
        this.canvas.DrawStrokedRectangle(this.position.x, this.position.y, this.size.x, this.size.y, this.lineWidth, this.strokeColor, this.fillColor);
        this.canvas.WriteText(this.text, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2 + this.size.y / 8, this.fontSize, this.textColor);
    }
}
var Tile;
(function (Tile) {
    Tile[Tile["Nothing"] = 0] = "Nothing";
    Tile[Tile["Floor"] = 1] = "Floor";
})(Tile || (Tile = {}));
const tileMap = [0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0];
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
class Mouse {
    constructor(canvasElement) {
        this.position = new Vector2(0, 0);
        this.onMouseMove = (event) => {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        };
        this.canvasElement = canvasElement;
        canvasElement.addEventListener("mousemove", this.onMouseMove);
    }
    BindCallback(eventName, callback) {
        this.canvasElement.addEventListener(eventName, callback);
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class DemoLevelScreen extends View {
    constructor(canvas, mouse) {
        super(canvas, mouse);
        this.Draw = () => {
            let player = new ImageBox("./assets/images/player.png", 0, 0, 100, 100, this.canvas, this.mouse);
            player.Draw();
            let floor = new ImageBox("./assets/images/floortexture.png", 0, 510, 1900, 100, this.canvas, this.mouse);
            floor.Draw();
        };
    }
}
class QuestionScreen extends View {
    constructor(canvas, mouse) {
        super(canvas, mouse);
        this.Draw = () => {
            document.getElementById("canvas").style.background = "#e67e22 url('')";
            const answersObject = [{
                    questionNumber: 1,
                    question: 'Wat is de hoofdstad van Noord-Holland?',
                    answer_1: 'Amsterdam',
                    answer_2: 'Rotterdam',
                    answer_3: 'Haarlem',
                    answer_4: 'Utrecht',
                    correct_answer: 'Haarlem'
                },
                {
                    questionNumber: 2,
                    question: 'Welk klimaat heeft Noord-Europa?',
                    answer_1: 'Poolklimaat',
                    answer_2: 'Landklimaat',
                    answer_3: 'Zeeklimaat',
                    answer_4: 'Hoog-gebergte klimaat',
                    correct_answer: 'Poolklimaat'
                },
                {
                    questionNumber: 3,
                    question: "Wat zijn toendra's?",
                    answer_1: 'Vlakte met ijs en sneeuw',
                    answer_2: 'Vlakte met mos, gras en kleine struiken',
                    answer_3: 'Vlakte met bergen en bomen',
                    answer_4: 'Vlakte met gras',
                    correct_answer: 'Vlakte met mos, gras en kleine struiken'
                },
                {
                    questionNumber: 4,
                    question: 'Welke zee grenst er aan Nederland?',
                    answer_1: 'Middenlandse zee',
                    answer_2: 'Noorse zee',
                    answer_3: 'Noordzee',
                    answer_4: 'Oostzee',
                    correct_answer: 'Noordzee'
                },
                {
                    questionNumber: 5,
                    question: 'Uit welke landen bestaat Scandinavië?',
                    answer_1: 'Denemarken, Finland, Zweden, Noorwegen',
                    answer_2: 'Estland, Letland, Litouwen',
                    answer_3: 'Estland, Noorwegen, Zweden',
                    answer_4: 'Denemarken, Noorwegen, Letland',
                    correct_answer: 'Denemarken, Finland, Zweden, Noorwegen'
                },
                {
                    questionNumber: 6,
                    question: 'In Noorwegen vind je langs de hele kust fjorden. Wat zijn fjorden?',
                    answer_1: 'Diepe inham met een steile bergwand',
                    answer_2: 'Stranden',
                    answer_3: 'Diepe inham met een kleine bergwand',
                    answer_4: 'Bergen',
                    correct_answer: 'Diepe inham met een steile bergwand'
                }
            ];
            for (let i = 0; i < answersObject.length; i++) {
            }
            const randomNumberQuestion = Math.floor((Math.random() * answersObject.length));
            let textBoxInformation = new TextBox(`${answersObject[randomNumberQuestion].question}`, (innerWidth / 2) / 2, 60, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#3498db", "#3498db");
            textBoxInformation.Draw();
            this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 210, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
            this.canvas.WriteText("A", (innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 220, 30, "#FFF", "center");
            let questionAnswer1 = new TextBox(`${answersObject[randomNumberQuestion].answer_1}`, (innerWidth / 2) / 2, 170, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
            questionAnswer1.Draw();
            this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 300, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
            this.canvas.WriteText("B", (innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 310, 30, "#FFF", "center");
            let questionAnswer2 = new TextBox(`${answersObject[randomNumberQuestion].answer_2}`, (innerWidth / 2) / 2, 260, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
            questionAnswer2.Draw();
            this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 390, 24, 4.709, false, 25, "#eE58D3A", "#E58D3A");
            this.canvas.WriteText("C", (innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 400, 30, "#FFF", "center");
            let questionAnswer3 = new TextBox(`${answersObject[randomNumberQuestion].answer_3}`, (innerWidth / 2) / 2, 350, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
            questionAnswer3.Draw();
            this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 480, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
            this.canvas.WriteText("D", (innerWidth / 2) - ((innerWidth / 2) / 2) - 50, 490, 30, "#FFF", "center");
            let questionAnswer4 = new TextBox(`${answersObject[randomNumberQuestion].answer_4}`, (innerWidth / 2) / 2, 440, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
            questionAnswer4.Draw();
            this.canvas.DrawCircle((innerWidth / 2) + ((innerWidth / 2) / 2) + 150, 160, 80, 4.709, false, 45, "#2980b9", "#e67e22");
            this.canvas.DrawCircle((innerWidth / 2) + ((innerWidth / 2) / 2) + 150, 160, 80, 2.1, false, 45, "#3498db", "#e67e22");
            this.canvas.WriteText("11", (innerWidth / 2) + ((innerWidth / 2) / 2) + 150, 175, 40, "#FFF", "center");
        };
    }
}
class StartScreen extends View {
    constructor(canvas, mouse) {
        super(canvas, mouse);
        this.Draw = () => {
            const canvasSize = this.canvas.GetSize();
            let textBoxInformation = new TextBox("", 75, 50, 600, 720, this.canvas, this.mouse, "white", 30, 500, "#007ded", "#007ded");
            let textBoxInstruction = new TextBox("Kies een onderwerp", 80, 50, 500, 250, this.canvas, this.mouse, "white", 30, 200, "#007ded", "#007ded");
            let subjectBox = new TextBox("", 800, 100, 500, 250, this.canvas, this.mouse, "white", 30, 200, "#1a94ff", "#1a94ff");
            let startButton = new TextBox("start", 955, 630, 200, 100, this.canvas, this.mouse, "white", 80, 50, "#fe7300", "#fe7300");
            let levelChoice = new TextBox("level ...", 800, 400, 400, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
            let DutchChoice = new TextBox("Nederlands", 80, 350, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
            let EnglishChoice = new TextBox("Engels", 80, 450, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
            let mathChoice = new TextBox("Rekenen", 80, 550, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
            let GeographyChoice = new TextBox("Topografie", 80, 650, 500, 70, this.canvas, this.mouse, "white", 50, 50, "#fe7300", "#fe7300");
            let subjectImage = new ImageBox("./assets/images/subjects/math.png", 950, 130, 200, 200, this.canvas, this.mouse);
            textBoxInformation.Draw();
            textBoxInstruction.Draw();
            startButton.Draw();
            levelChoice.Draw();
            DutchChoice.Draw();
            EnglishChoice.Draw();
            mathChoice.Draw();
            GeographyChoice.Draw();
            subjectImage.Draw();
            subjectBox.Draw();
        };
    }
}
//# sourceMappingURL=app.js.map