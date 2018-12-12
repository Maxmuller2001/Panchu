class QuestionScreen {
        canvas: Canvas;
        textBox: TextBox;

        constructor(canvas: Canvas) {
            this.canvas = canvas;
        }
        public draw = () => {
            // Object of questions

                // Uncommend for new background color
                document.getElementById("canvas").style.background = "#f3f3f3 url('')";

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
                //console.log(answersObject[i].questionNumber);
                //console.log(answersObject[i].question);
                //console.log(answersObject[i].answer_1);
                //console.log(answersObject[i].answer_2);
                //console.log(answersObject[i].answer_3);
                //console.log(answersObject[i].answer_4);
                //console.log(answersObject[i].correct_answer);
            }
            const randomNumberQuestion = Math.floor((Math.random() * answersObject.length));
            console.warn(answersObject[randomNumberQuestion].question);
            console.log(answersObject[randomNumberQuestion].answer_1);
            console.log(answersObject[randomNumberQuestion].answer_2);
            console.log(answersObject[randomNumberQuestion].answer_3);
            console.log(answersObject[randomNumberQuestion].answer_4);

            let textBoxInformation = new TextBox(`  ${answersObject[randomNumberQuestion].question}`, innerWidth / 2, 150, innerWidth / 2 , 0, this.canvas, "white", 20, 200, "orange", "orange");
            textBoxInformation.Draw();

        }
    }