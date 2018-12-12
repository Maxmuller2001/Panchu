function onLoad() {
    let canvasElement = document.getElementById("canvas");
    let canvas = new Canvas(canvasElement);
    let game = new Game(canvas);
    let screen = new StartScreen(canvas);
    screen.draw();
}
window.onload = onLoad;
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
        this.context.strokeRect(x + lineWidth / 2, y + lineWidth / 2, width - lineWidth, height - lineWidth);
    }
    WriteText(text, x, y, fontSize = 30, color = "white", maxWidth) {
        this.context.fillStyle = color;
        this.context.font = `${fontSize.toString()}px Arial`;
        this.context.fillText(text, x, y + fontSize, maxWidth);
    }
    DrawImage(image, x, y, width, height) {
        this.context.drawImage(image, x, y, width, height);
    }
}
class Game {
    constructor(canvas) {
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
        this.canvas = canvas;
    }
}
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
class DynamicEntity extends Entity {
    constructor() {
        super(...arguments);
        this.velocity = new Vector2(0, 0);
    }
}
class Button extends Entity {
    constructor(text, x, y, width, height, canvas, imageSource) {
        const position = new Vector2(x, y);
        const size = new Vector2(width, height);
        super(position, size, canvas);
        this.text = text;
        if (imageSource) {
            this.image = new Image(width, height);
            this.image.onload = () => { this.imageLoaded = true; };
            this.image.src = imageSource;
        }
    }
    Draw() {
        if (this.imageLoaded || this.image === undefined)
            this.canvas.DrawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
    }
}
class ImageBox extends Entity {
    constructor(source, x, y, width, height, canvas) {
        const position = new Vector2(x, y);
        const size = new Vector2(width, height);
        super(position, size, canvas);
        this.image = new Image(width, height);
        this.image.src = source;
        this.scale = 1;
    }
    Draw() {
        this.canvas.DrawImage(this.image, this.position.x, this.position.y, this.size.x * this.scale, this.size.y * this.scale);
    }
}
class TextBox extends Entity {
    constructor(text, x, y, width, height, canvas, textColor, fontSize, lineWidth, strokeColor, fillColor) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.text = text;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.lineWidth = lineWidth;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    }
    Draw() {
        this.canvas.DrawStrokedRectangle(this.position.x, this.position.y, this.size.x, this.size.y, this.lineWidth, this.strokeColor, this.fillColor);
        this.canvas.WriteText(this.text, this.position.x, this.position.y + this.size.y / 4, this.fontSize, this.textColor);
    }
}
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
class QuestionScreen {
    constructor(canvas) {
        this.draw = () => {
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
                    question: 'Uit welke landen bestaad Scandinavië?',
                    answer_1: 'Denemarken, Finland, Zweden, Noorwegen',
                    answer_2: 'Estland, Letland, Litouwen',
                    answer_3: 'Estland, Noorwegen, Zweden',
                    answer_4: 'Denemarken, Noorwegen, Letland',
                    correct_answer: 'Denemarken, Finland, Zweden, Noorwegen'
                },
                {
                    questionNumber: 6,
                    question: 'In noorwegen vind je langs de hele kust fjorden. Wat zijn fjorden?',
                    answer_1: 'Diepe inham met een steile bergwand',
                    answer_2: 'Stranden',
                    answer_3: 'Diepe inham met een kleine bergwand',
                    answer_4: 'Bergen',
                    correct_answer: 'Diepe inham met een steile bergwand'
                }
            ];
            for (let i = 0; i < answersObject.length; i++) {
                console.log(answersObject[i].questionNumber);
                console.log(answersObject[i].question);
                console.log(answersObject[i].answer_1);
                console.log(answersObject[i].answer_2);
                console.log(answersObject[i].answer_3);
                console.log(answersObject[i].answer_4);
                console.log(answersObject[i].correct_answer);
            }
            const randomNumberQuestion = Math.floor((Math.random() * answersObject.length));
            console.log(answersObject[randomNumberQuestion].question);
            const QuestionOnScreen = new TextBox(`${answersObject[randomNumberQuestion].question}`, 50, 200, innerWidth / 1.5, 50, this.canvas, "#FFF", 10, 0, "", "Orange");
            QuestionOnScreen.Draw();
            console.log(QuestionOnScreen);
        };
        this.canvas = canvas;
    }
}
class StartScreen {
    constructor(canvas) {
        this.draw = () => {
            let startButton = new Button("Test", 150, 150, 100, 100, this.canvas, "../assets/images/button.png");
            startButton.Draw();
        };
        this.canvas = canvas;
    }
}
//# sourceMappingURL=app.js.map