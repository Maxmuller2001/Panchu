/// <reference path="../game_engine/base/View.ts"/>
class QuestionScreen extends View {

    constructor(canvas: Canvas, mouse: Mouse) {
        super(canvas, mouse);
    }

    public Draw = () => {
        // Object of questions

        // Uncommend for new background color
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
            //console.log(answersObject[i].questionNumber);
            //console.log(answersObject[i].question);
            //console.log(answersObject[i].answer_1);
            //console.log(answersObject[i].answer_2);
            //console.log(answersObject[i].answer_3);
            //console.log(answersObject[i].answer_4);
            //console.log(answersObject[i].correct_answer);
        }
        const randomNumberQuestion = Math.floor((Math.random() * answersObject.length));
        //console.warn(answersObject[randomNumberQuestion].question);
        //console.log(answersObject[randomNumberQuestion].answer_1);
        //console.log(answersObject[randomNumberQuestion].answer_2);
        //console.log(answersObject[randomNumberQuestion].answer_3);
        //console.log(answersObject[randomNumberQuestion].answer_4);

        // Question
        let textBoxInformation = new TextBox(`${answersObject[randomNumberQuestion].question}`, (innerWidth / 2) / 2, 60, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#3498db", "#3498db");
        textBoxInformation.Draw();
        // Answer A
        this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) /2) - 50 , 210, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
        this.canvas.WriteText("A",(innerWidth / 2) - ((innerWidth / 2) /2) - 50, 220, 30, "#FFF", "center");
        let questionAnswer1 = new TextBox(`${answersObject[randomNumberQuestion].answer_1}`, (innerWidth / 2) / 2, 170, innerWidth / 2, 80, this.canvas, this.mouse,"white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
        questionAnswer1.Draw();
        // Answer B
        this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) /2) - 50 , 300, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
        this.canvas.WriteText("B",(innerWidth / 2) - ((innerWidth / 2) /2) - 50, 310, 30, "#FFF", "center");
        let questionAnswer2 = new TextBox(`${answersObject[randomNumberQuestion].answer_2}`, (innerWidth / 2) / 2, 260, innerWidth / 2, 80, this.canvas, this.mouse,"white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
        questionAnswer2.Draw();
        // Answer C
        this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) /2) - 50 , 390, 24, 4.709, false, 25, "#eE58D3A", "#E58D3A");
        this.canvas.WriteText("C",(innerWidth / 2) - ((innerWidth / 2) /2) - 50, 400, 30, "#FFF", "center");
        let questionAnswer3 = new TextBox(`${answersObject[randomNumberQuestion].answer_3}`, (innerWidth / 2) / 2, 350, innerWidth / 2, 80, this.canvas, this.mouse,"white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
        questionAnswer3.Draw();
        // Answer D
        this.canvas.DrawCircle((innerWidth / 2) - ((innerWidth / 2) /2) - 50 , 480, 24, 4.709, false, 25, "#E58D3A", "#E58D3A");
        this.canvas.WriteText("D",(innerWidth / 2) - ((innerWidth / 2) /2) - 50, 490, 30, "#FFF", "center");
        let questionAnswer4 = new TextBox(`${answersObject[randomNumberQuestion].answer_4}`, (innerWidth / 2) / 2, 440, innerWidth / 2, 80, this.canvas, this.mouse, "white", innerWidth / 70, 50, "#E58D3A", "#E58D3A");
        questionAnswer4.Draw();

        // Timer
        this.canvas.DrawCircle((innerWidth / 2) + ((innerWidth / 2) / 2)+ 150, 160, 80, 4.709, false, 45, "#2980b9", "#e67e22");
        this.canvas.DrawCircle((innerWidth / 2) + ((innerWidth / 2) / 2)+ 150, 160, 80, 2.1, false, 45, "#3498db", "#e67e22");
        this.canvas.WriteText("11", (innerWidth / 2) + ((innerWidth / 2) / 2)+ 150,175, 40, "#FFF", "center");


        document.getElementById("canvas").addEventListener("click", console.log("Test"));

    }
}