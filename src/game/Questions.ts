class Questions {

    public Subject = class Subject {

        public questions: any[] = [];

        public AddQuestion(_question: string, toughness: number, _correctAnswer: string, ...args: string[]) {
            // Toughness is a scale from 1 to 5
            const question = {
                question: _question,
                correctAnswer: _correctAnswer,
                otherAnswers: args,
                toughness: toughness
            }

            this.questions.push(question);
        }

        public GetAnswers(question: any, amountOfAnswers: number): string[] {
            // Returns the correct answer and more answers
            let answers: string[] = [];

            const correctAnswer: string = question.correctAnswer;
            // Duplicate an array using Object.assign in order to not modify the original one
            const otherAnswers: string[] = Object.assign([], question.otherAnswers);

            answers.push(correctAnswer);

            // Get some other answers
            for (let i = 0; i < amountOfAnswers - 1; i++) {
                const index: number = randomNumber(0, otherAnswers.length);
                const answer: string = otherAnswers[index];
                otherAnswers.splice(index, 1);
                answers.push(answer);
            }

            // Shuffle the answers around to make them seem more random
            answers = this.shuffleAnswers(answers);

            return answers;
        }

        public GetQuestion(): any {
            const index: number = randomNumber(0, this.questions.length);
            const question: any = this.questions[index];
            return question;
        }


        private shuffleAnswers(answers: string[]): string[] {
            for (let i = answers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answers[i], answers[j]] = [answers[j], answers[i]];
            }
            return answers;
        }

    }

    // Subjects
    public dutch = new this.Subject();
    public math = new this.Subject();
    public geography = new this.Subject();
    public topography = new this.Subject();
    public history = new this.Subject();

    // This constructor contains all declarations of the subject questions
    constructor() {
        // Math
        for (let i: number = 0; i < 50; i++) {
            const a: number = randomNumber(1, 1000);
            const b: number = randomNumber(1, 1000);
            const correctAnswer: number = a + b;
            // Offsets
            const c: number = randomNumber(-10, 10);
            const d: number = randomNumber(-10, 10);
            const e: number = randomNumber(-10, 10);
            // Toughness
            const toughness: number = correctAnswer / 2e3 * 4 + 1;
            // Add the question
            this.math.AddQuestion(
                `Wat is ${a} + ${b}?`,
                toughness,
                correctAnswer.toString(),
                (correctAnswer + c).toString(),
                (correctAnswer + d).toString(),
                (correctAnswer + e).toString()
            )
        }
        for (let i: number = 0; i < 50; i++) {
            const a: number = randomNumber(1, 20);
            const b: number = randomNumber(1, 20);
            const correctAnswer: number = a * b;
            // Offsets
            const c: number = randomNumber(-10, 10);
            const d: number = randomNumber(-10, 10);
            const e: number = randomNumber(-10, 10);
            // Toughness
            const toughness: number = correctAnswer / 400 * 4 + 1;
            // Add the question
            this.math.AddQuestion(
                `Wat is ${a} x ${b}?`,
                toughness,
                correctAnswer.toString(),
                (correctAnswer + c).toString(),
                (correctAnswer + d).toString(),
                (correctAnswer + e).toString()
            )
        }
        for (let i: number = 0; i < 50; i++) {
            const a: number = randomNumber(1, 50);
            const b: number = randomNumber(1, 50);
            const f: number = Math.max(a, b);
            const g: number = Math.min(a, b);
            const correctAnswer: number = f % g;
            // Offsets
            const c: number = randomNumber(-10, 10);
            const d: number = randomNumber(-10, 10);
            const e: number = randomNumber(-10, 10);
            // Toughness
            const toughness: number = f / 24 * 4 + 1;
            // Add the question
            this.math.AddQuestion(
                `Wat is de rest van ${f} : ${g}?`,
                toughness,
                correctAnswer.toString(),
                (correctAnswer + c).toString(),
                (correctAnswer + d).toString(),
                (correctAnswer + e).toString()
            )
        }

        // Geography | 1

        // Geography | 1
        this.geography.AddQuestion(
            "Uit welke steden bestaat de Randstad?",
            1,
            "Rotterdam, Den Haag, Amsterdam en Utrecht",
            "Rotterdam, Den Bosch, Amsterdam en Utrecht",
            "Delft, Den Haag, Amsterdam en  Utrecht",
            "Groningen, Drenthe, Amsterdam en Friesland"
        )//2
        this.geography.AddQuestion(
            "Midden in de Randstand ligt een gebied met grasland, namelijk:",
            1,
            "Het Groene Hart",
            "Het Blauwe Hart",
            "Het Groene Hert",
            "Het Blauwe Hart"
        )//3
        this.geography.AddQuestion(
            "Wereldsteden, metropolen en stedelijk gebieden zijn dichtbevolkt.",
            1,
            "Deze stelling is juist",
            "Alleen wereldsteden en stedelijk gebieden zijn dichtbevolkt",
            "Alleen wereldsteden zijn dichtbevolkt",
            "Deze stelling is onjuist"
        )//4
        this.geography.AddQuestion(
            "West-Europa heeft veel landbouw, dit komt door...",
            1,
            "Het zeeklimaat",
            "Het poolklimaat",
            "Het landklimaat",
            "Het Middelandse zeeklimaat"
        )//5
        this.geography.AddQuestion(
            "Laagland ligt gelijk of net boven de zeespiegel.",
            1,
            "Deze stelling is juist",
            "Laagland ligt alleen onder de zeespiegel",
            "Laagland ligt alleen boven de zeespiegel",
            "Deze stelling is onjuist"
        )//6
        this.geography.AddQuestion(
            "Uit welke landen bestaat Scandinavië?",
            1,
            "Denemarken, Finland, Zweden, Noorwegen en Ijsland",
            "Finland, Zweden, Duitsland, Noorwegen en Ijsland",
            "Schotland, Luxemburg, Denemarken, Finland en Zweden",
            "Denemarken, Finland, Zwitserland, Noorwegen en Ijsland"
        )//7
        this.geography.AddQuestion(
            "Wat zijn fjorden?",
            1,
            "Diepe inhammen met hele steile rotswanden",
            "Rivieren die vanuit de bergen naar de zee stromen",
            "Een paard",
            "Scheuren die in de bergen zijn onstaat in de loop van de jaren"
        )//8
        this.geography.AddQuestion(
            "Aquafarming houdt in dat:",
            1,
            "vissoorten in fjorden geweekt worden om ervoor te zorgen dat vissen niet uitsterven",
            "vissoorten uit de fjorden gevangen worden voor het bereiden van maaltijden",
            "waterbakken met daarin vissoorten worden geweekt",
            "vissoorten in waterbakken gesorteerd worden op grote"
        )//9
        this.geography.AddQuestion(
            "Hoe onstaat een geiser?",
            1,
            "Door een dunne aardkorst waardoor het grondwater wordt verwarmd en gaat koken",
            "Door een verschuivingen van platen",
            "Door de beweging van de aardkorst",
            "Door een dikke aardkost waardoor het grondwater wordt verwarmd en gaat koken"
        )//10
        this.geography.AddQuestion(
            "Wat zijn toendra's?",
            1,
            "Vlaktes met alleen mos, gras en kleine struiken",
            "Vlaktes met alleen met naaldbomen",
            "Boomsoorten",
            "Vlaktes met alleen struiken"
        )//11
        this.geography.AddQuestion(
            "Welke klimaten zijn er in Europa?",
            2,
            "Zeeklimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat",
            "Grasklimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat",
            "Zuidpool klimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat",
            "Zeeklimaat, sneeuwklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat"
        )//12
        this.geography.AddQuestion(
            "Wat is irrigatie?",
            2,
            "Boeren die water of grondwater over het land heen sproeien",
            "Een watersysteem om water te vervoeren",
            "Een manier die boeren gebruiken om de oogst te oogsten",
            "Een ander woord voor mest"
        )//13
        this.geography.AddQuestion(
            "Een berg van top naar dal ziet er als volgt uit:",
            2,
            "Rotsen, gras, naaldbomen, loofbomen en akkerbouw",
            "Rotsen, akkerbouw, naaldbomen, loofbomen en gras",
            "Rotsen, gras, naaldbomen, loofbomen",
            "Naaldbomen, rosten, loofbomen en akkerbouw"
        )//14
        this.geography.AddQuestion(
            "De loefzijde van een berg is de kant waar de wind vandaan komt.",
            2,
            "Deze stelling is juist",
            "De loefzijde van een berg is de kant waar de zon vandaag komt",
            "De loefzijde van een berg is de kant waar de wolken stijgen",
            "Deze stelling is niet juist"
        )//15
        this.geography.AddQuestion(
            "De natuurlijke omstandigheden bestaat uit:",
            2,
            "De temperatuur, de hoeveeheid neerslag en de grondsoort",
            "De temperatuur, de zon, wind en hagel",
            "De temperatuur, de zon, wind, hagel en sneeuw",
            "De temperatuur, de zond, de wind, hagel, sneeuw en regen"
        )//16
        this.geography.AddQuestion(
            "Het Oeralgebergte vormt de grens tussen:",
            2,
            "Europees Rusland en Aziatisch Rusland",
            "Aziatisch Rusland en China",
            "Frankrijk en Italië",
            "België, Nederland en Luxemburg"
        )//17
        this.geography.AddQuestion(
            "Rusland heeft meerdere klimaten, welke zijn dit?",
            2,
            "Toendraklimaat, poolklimaat, landklimaat en een subtropisch klimaat",
            "Zeeklimaat, poolklimaat, landklimaat en een subtropisch klimaat",
            "Toendraklimaat, poolklimaat, landklimaat en een hooggebergte klimaat",
            "Zeeklimaat, poolklimaat, landklimaat en een hooggebergte klimaat"
        )//18
        this.geography.AddQuestion(
            "Wat is de belangrijkste rivier van Polen?",
            2,
            "Wisla",
            "Oder",
            "Warta",
            "Neisse"
        )//19
        this.geography.AddQuestion(
            "Hoeveel keer groter is Polen in vergelijking met Nederland?",
            2,
            "7,5 keer",
            "9,5 keer",
            "9 keer",
            "7 keer"
        )//20
        this.geography.AddQuestion(
            "Het Ijzeren Gordijn verdeelde:",
            2,
            "Duitsland in Oost-Duitsland en West-Duitsland",
            "Duitsland in Noord-Duitsland en Zuid-Duistland",
            "Polen in Oost-Polen en West-Polen",
            "Polen in Noord-Polen en Zuid-Polen"
        )//21
        this.geography.AddQuestion(
            "Wat houdt massatoerisme in?",
            3,
            "Dit houdt in dat veel mensen naar dezelfde gebieden op vakantie gaan",
            "Dit houdt in dat er veel toerisme is",
            "Dit houdt in dat er meer toerisme nodig is in een stad",
            "Dit houdt in dat er minder mensen naar hetzelfde gebied op vakantie gaan"
        )//22
        this.geography.AddQuestion(
            "Veel jongeren gaan in de stad werken en de ouderen blijven op het platteland is:",
            3,
            "vergrijzing van het platteland",
            "vernieuwing van de stad",
            "vergrijzing van de stad",
            "vernieuwing van het platteland"
        )//23
        this.geography.AddQuestion(
            "Smog komt vaak voor in grotere steden. Wat is Smog?",
            3,
            "Rook van fabrieken dat in de stad blijft hangen",
            "Dichte regendruppels wat in de lucht hangt",
            "Een bepaalde stof",
            "Een reactie van de natuur"
        )//24
        this.geography.AddQuestion(
            "Hoe kan de overheid voor meer werkgelegenheid zorgen?",
            3,
            "Bijvoorbeeld door het aanleggen van beter snelwegen en spoorlijnen, waardoor meer bedrijven zichzelf daar vestigen",
            "Bijvoorbeeld door meer banen aanbieden",
            "Bijvoorbeeld door meer mensen te laten soliciteren bij verschillende bedrijven",
            "Bijvoorbeeld door hogere uitkereingen te geven aan de werkeloze mensen"
        )//25
        this.geography.AddQuestion(
            "Uit hoeveel vulkanen bestaat de Eolische Eilanden?",
            3,
            "7",
            "8",
            "5",
            "4"
        )//26
        this.geography.AddQuestion(
            "Een fossiele brandstof is:",
            3,
            "een brandstof die in miljoenen jaren onstaat uit hele oude plantenresten",
            "een aantal botten die diep in de grond zijn gevonden van miljoenen jaren geleden",
            "een brandstof wat in fabrieken gemaakt wordt",
            "een brandstof voor fossielen"
        )//27
        this.geography.AddQuestion(
            "Het afgraven van bruinkool aan de oppervlakte is:",
            3,
            "Dagbouw",
            "Schachtbouw",
            "Nachtbouw",
            "Landbouw"
        )//28
        this.geography.AddQuestion(
            "Het afgraven van steenkool in lange gangen diep in de grond is:",
            3,
            "Schachtbouw",
            "Dagbouw",
            "Landbouw",
            "Nachtbouw"
        )//29
        this.geography.AddQuestion(
            "Wat is de snelste manier van vervoer?",
            3,
            "Een vliegtuig",
            "Een auto",
            "Een trein",
            "Een boot"
        )//30
        this.geography.AddQuestion(
            "Hoe worden de hoofdwegen in Europa ook wel genoemd?",
            3,
            "E-wegen/ Europawegen",
            "Highstreets",
            "Hoofdwegen Europa",
            "A1/ A4"
        )//31
        this.geography.AddQuestion(
            "De Alpen vormen een hoog gebergte, hoe hoog zijn deze bergen?",
            4,
            "Hoger dan 1500 meter",
            "Lager dan 1500 meter",
            "Tussen de  1500 en 2000 meter",
            "Hoger dan 2000 meter"
        )//32
        this.geography.AddQuestion(
            "In het voorjaar gaat het jongvee naar de bergweiden. Dit heet:",
            4,
            "Extensive veeteelt",
            "intriensieke veeteelt",
            "Schapenhoeder",
            "verplaatsing"
        )//32
        this.geography.AddQuestion(
            "Veel goederen worden door een vrachtwagen via een pas vervoerd. Wat is een pas?",
            4,
            "Een pas is een weg van de ene naar de andere berg",
            "Een route die de vrachtwagen rijdt",
            "Een kaart om over bepaalde stukken te mogen vervoeren",
            "Een pasje om over bepaalde stukken te mogen vervoeren"
        )//34
        this.geography.AddQuestion(
            "Wat is Erosie?",
            4,
            "Het afslijten van land door wind, water of ijs",
            "Een steensoort",
            "Een andere naam voor natuurlijke verschijnselen",
            "Een diersoort"
        )//35
        this.geography.AddQuestion(
            "Welke gevolgen kunnen er komen door Erosie?",
            4,
            "Het onstaan van modderstromen en lawines",
            "Het ontstaan van orkanen",
            "Het ontstaan van orkanen en overstromingen",
            "Het ontstaan van overstromingen en modderstromen"
        )//36
        this.geography.AddQuestion(
            "Wat is een lawine?",
            4,
            "Een grote hoeveelheid sneeuw dat van een berghelling naar beneden stort",
            "Een grote hoeveelheid stenen dat van een berghelling naar beneden stort",
            "Een grote hoeveelheid aan hagelstenen dat van een berghelling naar beneden stort",
            "Een grote hoeveelheid modder dat van een berghelling naar beneden stort"
        )//37
        this.geography.AddQuestion(
            "Wat is agrotoerisme?",
            4,
            "Dit houdt in dat toeristen op boederijen of op campings overnachten",
            "Dit houdt in dat er gewassen worden verbouwdt voor de toeristen",
            "Dit houdt in dat er in grote maten toeristen naar dezelfde plek toe gaan",
            "Dit houdt in dat er niet genoeg toeristen zijn"
        )//38
        this.geography.AddQuestion(
            "Waar zorgen waterkrachtcentrales voor?",
            4,
            "Voor het aanmaken van elektricieit",
            "Voor het aanmaken van licht",
            "Voor het aanmaken van water voor de gewassen",
            "Voor het aanmaken van warmte"
        )//39
        this.geography.AddQuestion(
            "Ten noorden van de Alpen is er een:",
            4,
            "Landklimaat",
            "Zeeklimaat",
            "Poolklimaar",
            "Middelandse zeeklimaat"
        )//40
        this.geography.AddQuestion(
            "Ten zuiden van de Alpen is er een:",
            4,
            "Middellandse Zeeklimaat",
            "Landklimaat",
            "Zeeklimaat",
            "Poolklimaat"
        )//41
        this.geography.AddQuestion(
            "In welk jaar is de Europese Unie (EU) opgericht?",
            5,
            "1992",
            "1990",
            "1900",
            "2001"
        )//42
        this.geography.AddQuestion(
            "Wat houdt 'open grenzen' in de EU in?",
            5,
            "Als Nederlander mag je zonder paspoort de grens over binnen de EU",
            "Je mag zonder paspoort zowel de EU binnen als Amerika",
            "Dit zijn grenzen zonder poorten en beveiliging",
            "Je mag als Amerikaan zonder je paspoort de EU binnen"
        )//43
        this.geography.AddQuestion(
            "Wat zijn de ACS-landen?",
            5,
            "Afrika, de Cariben en de Stille Oceaan.",
            "Afrika, Canada en de Stille Oceaan",
            "Antartica, Capri en de Stillen Oceaan",
            "Antartica, Canada en Suriname"
        )//44
        this.geography.AddQuestion(
            "Wat is de NAVO?",
            5,
            "Noord-Atlantische Verdrags Organisatie",
            "Noord-Afrikaanse Verdrags Organisatie",
            "De Nederlandse en Afrikaanse Verdrags Organisatie",
            "De Nederlandse en Amerikaanse Verdrags Organisatie"
        )//45
        this.geography.AddQuestion(
            "Europa laat niet veel mensen binnen in de EU, hoe wordt de EU ook wel genoemd?",
            5,
            "Fort Europa",
            "Dicht Europa",
            "Gesloten Europa",
            "Besloten eenheid"
        )//46
        this.geography.AddQuestion(
            "De politie van de EU-landen heet:",
            5,
            "Europol",
            "Interpol",
            "S.W.A.T.",
            "Polition"
        )//47
        this.geography.AddQuestion(
            "Waarom wonen veel mensen op vlakke gebieden met een rivier?",
            5,
            "Vlakke gebieden met een rivier zijn geschikt voor landbouw",
            "Op vlakke gebieden is het gemakkelijker om huizen te bouwen",
            "Vlakke gebieden zijn stabieler voor de aardbevingen",
            "In vlakke gebieden is meer welvaart te vinden"
        )//48
        this.geography.AddQuestion(
            "Waarom trekken veel mensen naar de steden?",
            5,
            "Steeds meer mensen trekken naar de steden, omdat ze daar werk hopen te vinden",
            "Steeds meer mensen trekken naar de steden, omdat ze daar goedkoper kunnen leven",
            "Steeds meer mensen trekken naar de steden, omdat ze daar meer huizen te koop hebben",
            "Steeds meer mensen trekken naar de steden, omdat ze daar betere faciliteiten hebben"
        )//49
        this.geography.AddQuestion(
            "Mogen mensen uit Nederland zonder paspoort Frankrijk in?",
            5,
            "Ja, want beide landen zijn lid van de EU",
            "Nee, want beide landen zijn niet lid van de EU",
            "Nee, want Frankrijk is niet lid van de EU",
            "Nee, want Nederland is niet lid van de EU"
        )//50
        this.geography.AddQuestion(
            "Mogen mensen uit Amerika zonder paspoort Duitsland in?",
            5,
            "Nee, want Amerika is niet lid van de EU",
            "Nee, want beide landen zijn niet lid van de EU",
            "Ja, want beide landen zijn lid van de EU",
            "Nee, want Duitsland is niet lid van de EU"
        )
        // Topography
        //2
        this.topography.AddQuestion(
            "Wat is de hoofdstad van de provincie Noord-Holland?",
            1,
            "Haarlem",
            "Rotterdam",
            "Amsterdam",
            "Utrecht",
        )//3
        this.topography.AddQuestion(
            "Hoeveel provincies heeft Nederland?",
            1,
            "12",
            "15",
            "11",
            "14",
        )//4
        this.topography.AddQuestion(
            "Wat is de hoofdstad van de provincie Utrecht?",
            1,
            "Utrecht",
            "Amersfoort",
            "Woerden",
            "Utrecht is geen provincie, maar een stad",
        )//5
        this.topography.AddQuestion(
            "Wat is de hoofdstad van de België?",
            2,
            "Brussel",
            "Luik",
            "Antwerpen",
            "Hasselt",
        )//6
        this.topography.AddQuestion(
            "Wat is de hoofdstad van Frankrijk?",
            2,
            "Parijs",
            "Nantes",
            "Toulouse",
            "Lyon",
        )//7
        this.topography.AddQuestion(
            "Wat is de hoofdstad van Zweden?",
            3,
            "Stockholm",
            "Turku",
            "Oslo",
            "Malmö",
        )//8
        this.topography.AddQuestion(
            "Welk land ligt rechts naast Noorwegen?",
            3,
            "Zweden",
            "Finland",
            "Denemarken",
            "Letland",
        )//9
        this.topography.AddQuestion(
            "Wat is de hoofdstad van Engeland?",
            3,
            "Londen",
            "Liverpool",
            "Manchester",
            "Dublin",
        )//10
        this.topography.AddQuestion(
            "Aan welke zee grenst Belgie?",
            5,
            "Noordzee",
            "Het kanaal",
            "Noorse Zee",
            "Oostzee",
        )//11     
        this.topography.AddQuestion(
            "Hoeveel Waddeneilanden telt Nederland?",
            4,
            "8",
            "12",
            "6",
            "11",
        )//12
        this.topography.AddQuestion(
            "Wat is de naam van het grootste Wadde eiland?",
            3,
            "Texel",
            "Ameland",
            "Terschelling",
            "Vlieland",
        )//13  
        this.topography.AddQuestion(
            "Wat is de hoofdstad van Denemarken?",
            5,
            "Kopenhagen",
            "Stockholm",
            "Oslo",
            "Berlijn",
        )//14   
        this.topography.AddQuestion(
            "Wat is de hoofdstad van Duitsland?",
            5,
            "Berlijn",
            "Keulen",
            "Zürich",
            "München",
        )//15
        this.topography.AddQuestion(
            "Uit hoeveel landen bestaat de Europese Unie?",
            4,
            "28",
            "20",
            "24",
            "26",
        )//16
        this.topography.AddQuestion(
            "Aan welk meer ligt Lelystad?",
            5,
            "Markermeer",
            "Ijselmeer",
            "Gooimeer",
            "Veluwemeer",
        )
        //17
        this.topography.AddQuestion(
            "Wat is de hoofdstad van provincie Zeeland?",
            1,
            "Middelburg",
            "Goes",
            "Vlissingen",
            "Zierikzee",
        )
        //18
        this.topography.AddQuestion(
            "Wat is de hoofdstad van provincie Limburg?",
            1,
            "Maastricht",
            "Weerd",
            "Venlo",
            "Roermond",
        )
        //19
        this.topography.AddQuestion(
            "Wat is de naam van de eilanden ten noorden van Nederland?",
            1,
            "Waddeneilanden",
            "Zeeuwse eilanden",
            "Texelse eilanden",
            "Terschellingse eilanden",
        )
        //20
        this.topography.AddQuestion(
            "In welke provincie ligt de stad Breda?",
            3,
            "Noord-brabant",
            "Limburg",
            "Zuid-holland",
            "Zeeland",
        )
        //21
        this.topography.AddQuestion(
            "In welk land ligt de stad Antwerpen?",
            4,
            "België",
            "Nederland",
            "Luxemburg",
            "Frankrijk",
        )
        //22
        this.topography.AddQuestion(
            "In welk land ligt de stad London?",
            3,
            "Engeland",
            "België",
            "Ierland",
            "Frankrijk",
        )
        //23
        this.topography.AddQuestion(
            "In welk land ligt de stad Keulen?",
            3,
            "Duitsland",
            "België",
            "Ierland",
            "Frankrijk",
        )
        //24
        this.topography.AddQuestion(
            "In welk land ligt de stad Hamburg?",
            4,
            "Duitsland",
            "België",
            "Ierland",
            "Frankrijk",
        )
        //25
        this.topography.AddQuestion(
            "In welk land ligt de stad Brussel?",
            4,
            "België",
            "Duitsland",
            "Luxemburg",
            "Frankrijk",
        )
        //26
        this.topography.AddQuestion(
            "In welk land ligt de stad Stockholm?",
            5,
            "Zweden",
            "Finland",
            "Noorwegen",
            "Denemarken",
        )
        //27
        this.topography.AddQuestion(
            "In welk land ligt de stad Oslo?",
            1,
            "Noorwegen",
            "Finland",
            "Zweden",
            "Denemarken",
        )
        //28
        this.topography.AddQuestion(
            "In welk land ligt de stad Kopenhagen?",
            5,
            "Denemarken",
            "Finland",
            "Zweden",
            "Noorwegen",
        )
        //29
        this.topography.AddQuestion(
            "In welk land ligt de stad Luik?",
            4,
            "België",
            "Nederland",
            "Luxemburg",
            "Frankrijk",
        )
        //30
        this.topography.AddQuestion(
            "In welk land ligt de stad Amsterdam?",
            1,
            "Nederland",
            "België",
            "Luxemburg",
            "Frankrijk",
        )
        // Dutch | 1
        this.dutch.AddQuestion(
            "(Onze) tuin is perfect ingericht zei Buurman Mol. Wat voor woord staat tussen de haakjes?",
            3,
            "Bezittelijk voornaamwoord",
            "Lidwoord",
            "Bijvoegelijk naamwoord",
            "Zelfstandig naamwoord"
        )//2
        this.dutch.AddQuestion(
            "Een sollicitant is iemand die ...",
            3,
            "Een baan probeert te krijgen.",
            "Leiding geeft aan een afdeling.",
            "Mensen in dienst neemt.",
            "De geldzaken op orde houdt.",
        )//3
        this.dutch.AddQuestion(
            "Waar gaat het bij iemand iets verwijten vooral om?",
            1,
            "Iemand iets kwalijk nemen.",
            "Iemand iets vergeven.",
            "Iemand pijn doen.",
            "Dat de ander je niet terug hoeft te betalen.",
        )//4
        this.dutch.AddQuestion(
            "Waar gaat het bij corvee vooral om?",
            1,
            "Taak die ieder op zijn beurt moet doen.",
            "samenwerking",
            "Ergens onderuit komen.",
            "Dwang",
        )//5
        this.dutch.AddQuestion(
            "Een taboe is een ...",
            1,
            "Onderwerp waar men liever niet over praat.",
            "Discussiepunt.",
            "Fijn net waaronder men slaapt om muggen buiten te houden.",
            "Vragenronde aan het eind van een vergadering.",
        )//6
        this.dutch.AddQuestion(
            "Wat is een ander woord voor identiek?",
            1,
            "Gelijk",
            "Anders",
            "sociaal",
            "Paspoort",
        )//7
        this.dutch.AddQuestion(
            "Wat is geen tijdperk?",
            1,
            "De Slag bij Waterloo",
            "De middeleeuwen",
            "De steentijd",
            "De prehistorie",
        )//8
        this.dutch.AddQuestion(
            "Wat is een ander woord voor gehucht?",
            1,
            "Dorpje",
            "Provincie",
            "Streek",
            "Stad",
        )//9
        this.dutch.AddQuestion(
            "Waar gaat het bij een ezelsbruggetje vooral om?",
            1,
            "Iets onthouden.",
            "Iets toelichten.",
            "Iets bereiken.",
            "Iets begrijpen.",
        )//10
        this.dutch.AddQuestion(
            "Waar gaat het bij erosie vooral om?",
            1,
            "Afslijten",
            "Verstevigen",
            "Opbouwen",
            "Bevestigen",
        )//11
        this.dutch.AddQuestion(
            "Wat is het tegengestelde van tenger?",
            1,
            "Grof",
            "Tjokvol",
            "Onzeker",
            "Compact",
        )//12
        this.dutch.AddQuestion(
            "Maxima is een (slimme) meid. Wat is het woord tussen haakjes?",
            1,
            "Bijvoeglijk naamwoord",
            "Lidwoord",
            "Werkwoord",
            "Zelfstandig naamwoord",
        )//13
        this.dutch.AddQuestion(
            "De vijf (beste) kandidaten gaan door. Wat is het woord tussen haakjes?",
            1,
            "Bijvoeglijk naamwoord",
            "Werkwoord",
            "Zelfstandig naamwoord",
            "Lidwoord",
        )//14
        this.dutch.AddQuestion(
            "Je zult het ermee moeten (doen). Wat is het woord tussen haakjes?",
            1,
            "werkwoord",
            "zelfstandig naamwoord",
            "bijvoeglijk naamwoord",
            "lidwoord",
        )//15
        this.dutch.AddQuestion(
            "Bedankt voor (de) fantastische voorstelling! Wat is het woord tussen haakjes?",
            1,
            "lidwoord",
            "werkwoord",
            "bijvoeglijk naamwoord",
            "zelfstandig naamwoord",
        )//16
        this.dutch.AddQuestion(
            "Zet de (luidsprekers) maar wat harder. Wat is het woord tussen haakjes?",
            1,
            "zelfstandig naamwoord.",
            "werkwoord",
            "bijvoeglijk naamwoord",
            "lidwoord",
        )//17
        this.dutch.AddQuestion(
            "Bedankt voor (de) fantastische voorstelling! Wat is het woord tussen haakjes?",
            1,
            "lidwoord",
            "zelfstandig naamwoord",
            "bijvoeglijk naamwoord",
            "werkwoord",
        )//18
        this.dutch.AddQuestion(
            "Xiu heeft (een) flink aantal volgers op Twitter. Wat is het woord tussen haakjes?",
            1,
            "lidwoord",
            "werkwoord",
            "bijvoeglijk naamwoord",
            "zelfstandig naamwoord",
        )//19
        this.dutch.AddQuestion(
            "Heb je op je favoriete kandidaat (gestemd)? Wat is het woord tussen haakjes?",
            1,
            "werkwoord",
            "zelfstandig naamwoord",
            "lidwoord",
            "bijvoeglijk naamwoord",
        )//20
        this.dutch.AddQuestion(
            "De (excursie) naar de afvalcentrale was leuk en leerzaam. Wat is het woord tussen haakjes?",
            1,
            "zelfstandig naamwoord",
            "lidwoord",
            "bijvoeglijk naamwoord",
            "werkwoord",
        )//21
        this.dutch.AddQuestion(
            "We hebben (de) hoofdprijs gewonnen! Wat is het woord tussen haakjes?",
            1,
            "lidwoord",
            "werkwoord",
            "zelfstandig naamwoord",
            "bijvoeglijk naamwoord",
        )//22
        this.dutch.AddQuestion(
            "Vertel het (me) nou maar zei Max. Wat is het woord tussen haakjes?",
            1,
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "aanwijzend voornaamwoord",
            "vragend voornaamwoord",
        )//23
        this.dutch.AddQuestion(
            "Hij heeft (zijn) laatste oortje versnoept. Wat is het woord tussen haakjes?",
            1,
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
        )//24
        this.dutch.AddQuestion(
            "In (welke) situaties heb jij voorrang? Wat is het woord tussen haakjes?",
            1,
            "vragend voornaamwoord",
            "persoonlijk voornaamwoord",
            "aanwijzend voornaamwoord",
            "bezittelijk voornaamwoord",
        )//25
        this.dutch.AddQuestion(
            "Dat is (onze) winterpostelein zei Casper. Wat is het woord tussen haakjes?",
            1,
            "bezittelijk voornaamwoord",
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
            "vragend voornaamwoord",
        )//26
        this.dutch.AddQuestion(
            "Grijp (die) kans! Wat is het woord tussen haakjes?",
            1,
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
        )//27
        this.dutch.AddQuestion(
            "In (deze) grotten raak je snel de weg kwijt. Wat is het woord tussen haakjes?",
            1,
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
        )//28
        this.dutch.AddQuestion(
            "Met (dit) liedje kun je in de finale komen. Wat is het woord tussen haakjes?",
            1,
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
        )//29
        this.dutch.AddQuestion(
            "Waar staan (jullie) schoenen? Wat is het woord tussen haakjes?",
            1,
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
            "aanwijzend voornaamwoord",
            "persoonlijk voornaamwoord",
        )//30
        this.dutch.AddQuestion(
            "Ik geef (haar) een nieuwe tas. Wat is het woord tussen haakjes?",
            1,
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "aanwijzend voornaamwoord",
            "vragend voornaamwoord",
        )//31
        this.dutch.AddQuestion(
            "(Wat) zou jij in die situatie doen? Wat is het woord tussen haakjes?",
            1,
            "vragend voornaamwoord",
            "persoonlijk voornaamwoord",
            "bezittelijk voornaamwoord",
            "aanwijzend voornaamwoord",
        )//32
        this.dutch.AddQuestion(
            "Je hebt (dat) boek te laat ingeleverd. Wat is het woord tussen haakjes?",
            1,
            "aanwijzend voornaamwoord",
            "bezittelijk voornaamwoord",
            "vragend voornaamwoord",
            "persoonlijk voornaamwoord",
        )//33
        this.dutch.AddQuestion(
            "Wat is het onderwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?",
            1,
            "tante Toos",
            "Toos",
            "tante",
            "de plantjes",
        )//34
        this.dutch.AddQuestion(
            "Wat is het gezegde in de volgende zin: Heeft tante Toos de plantjes water gegeven?",
            1,
            "heeft gegeven",
            "heeft",
            "gegeven",
            "water",
        )//35
        this.dutch.AddQuestion(
            "Wat is het lijdend voorwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?",
            1,
            "water",
            "heeft gegeven",
            "tante Toos",
            "de plantjes",
        )//36
        this.dutch.AddQuestion(
            "Wat is het meewerkend voorwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?",
            1,
            "de plantjes",
            "tante Toos",
            "gegeven",
            "water",
        )//37
        this.dutch.AddQuestion(
            "Wat is het onderwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.",
            1,
            "ik",
            "het vleesetende plantje",
            "een paar vette vliegen",
            "vette vliegen",
        )//38
        this.dutch.AddQuestion(
            "Wat is het gezegde in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.",
            1,
            "zal vangen",
            "vangen",
            "zal",
            "ik",
        )//39
        this.dutch.AddQuestion(
            "Wat is het lijdend voorwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.",
            1,
            "een paar vette vliegen",
            "zal vangen",
            "voor het vleesetende plantje",
            "vette vliegen",
        )//40
        this.dutch.AddQuestion(
            "Wat is het meewerkend voorwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.",
            1,
            "voor het vleesetende plantje",
            "een paar vette vliegen",
            "ik",
            "zal vangen",
        )
        //history
        //1
        this.history.AddQuestion(
            "Welke ontdekkingsreiziger bereikte in 1497 Indi&#235;?",
            1,
            "Vasco da Gama",
            "Columbus",
            "Carthago",
            "Marco Polo",
        )
        //2
        this.history.AddQuestion(
            "Wie is Willem Barentsz?",
            1,
            "Een Nederlandse handelaar die in 1562 langs de Noordpool Indië probeerde te bereiken.",
            "Een Nederlandse handelaar die in 1492 als eerste Amerika ontdekte.",
            "Een Nederlandse handelaar die meerdere landen had gekoloniseerd.",
            "Een Nederlandse handelaar die een route naar Indi&#235; vond via Kaapstad",
        )
        //3
        this.history.AddQuestion(
            "Waar leven de Azteken?",
            1,
            "Midden-Amerika",
            "Zuid-Amerika",
            "Zuid-Afrika",
            "Noord-Amerika",
        )
        //4
        this.history.AddQuestion(
            "Wat betekent het woord 'Renaissance'?",
            1,
            "wedergeboorte",
            "zonneperiode",
            "rijkelijk",
            "geluk",
        )
        //5
        this.history.AddQuestion(
            "Wat vond Erasmus?",
            1,
            "Hij vond dat mensen hun eigen verstand moesten gebruiken en dingen moesten gaan ontdekken.",
            "Hij vond dat als God is vertelde dat de mensen dat moesten geloven er naar moesten luisteren.",
            "Hij vond zelf op onderzoek gaan en dingen uitzoeken een schande tegenover God.",
            "Hij vond God de beste.",
        )//6
        this.history.AddQuestion(
            "Waar is de protestanste monnik Luther onder andere boos over?",
            2,
            "De aflaathandel van de katholieke kerk.",
            "Over de democratie in het land.",
            "Over de hoeveelheid werkgelegenheid.",
            "Over de toestanden in het land.",
        )//7
        this.history.AddQuestion(
            "Welke twee groepen komen op sinds de komst van Luther?",
            2,
            "protestanten en katholieken",
            "democraten en totalitaire leiders",
            "protestanten en democraten",
            "katholieken en totalitaire leiders",
        )//8
        this.history.AddQuestion(
            "Wat wilde Koning Filips de 2e graag in zijn land?",
            2,
            "Dezelfde regels en wetten en dat iedereen katholiek is.",
            "Verschil in rijk en arm en dat iedereen protestants is.",
            "Af van de adel en dat iedereen protestants is.",
            "Protestanten en katholieken vreedzaam naast elkaar laten leven.",
        )//9
        this.history.AddQuestion(
            "Wanneer was de Beeldenstorm en wat houdt dat in?",
            2,
            "1566, boze protestanten vernielen kerken van katholieken.",
            "1555, boze protestanten vernielen kerken van katholieken.",
            "1566, boze katholieken vernielen kerken van protestanten.",
            "1555, boze katholieken vernielen kerken van protestanten.",
        )//10
        this.history.AddQuestion(
            "In 1588 begint Willem van Oranje een opstand tegen Koning Filips de 2e. Hoelang duurt de opstand.",
            2,
            "80 jaar",
            "4 jaar",
            "1 jaar",
            "30 jaar",
        )//11
        this.history.AddQuestion(
            "In welke tijd leefde Rembrandt van Rijn?",
            3,
            "de Gouden Eeuw",
            "de Renaissance",
            "de Middeleeuwen",
            "de Prehistorie",
        )//12
        this.history.AddQuestion(
            "Wat komt in de Gouden Eeuw ook wel veel op?",
            3,
            "de wetenschap, het onderzoeken van dingen.",
            "de democratie, eigen mening en keuzes van het volk.",
            "de strijdt om de macht in de wereld.",
            "de strijdt om het feminisme.",
        )//13
        this.history.AddQuestion(
            "Wat is de taak van een stadhouder?",
            3,
            "Ieder zijn eigen gewest te besturen en er toezicht op houden onder naam van de koning.",
            "Alle gewesten te besturen in een land.",
            "Het volk te helpen met keuzes te maken.",
            "De stadhouder houdt de gevangenen in de gaten.",
        )//14
        this.history.AddQuestion(
            "Welke gewesten zitten er in de Staten-Generaal?",
            3,
            "Utrecht, Gelre, Holland, Zeeland, Overijssel, Friesland en Groningen.",
            "Utrecht, Drenthe, Holland, Zeeland, Overijssel, Friesland en Groningen.",
            "Utrecht, Lelystad, Holland, Drenthe, Overijssel, Friesland en Groningen.",
            "Utrecht, Holland, Zeeland, Overijssel, Friesland en Groningen.",
        )//15
        this.history.AddQuestion(
            "Wat is het hoogte punt in het jaar 1648?",
            3,
            "De Republiek wordt een onafhankelijk land",
            "De twaalfjarige oorlog gaat weer verder onder leiding van Van Oldebarnevelt.",
            "De 80 jarige oorlog wordt in stilstand gezet.",
            "De Republiek valt onder leiding van de Spaanse koning Filips de 2e.",
        )
        //1
        this.history.AddQuestion(
            "In de Gouden Eeuw zijn er vier standen, wat is de grootste groep?",
            1,
            "gewone volk",
            "regenten",
            "gegoede burgerij",
            "kleine burgerij"
        )//2
        this.history.AddQuestion(
            "Wat werd in veel huishoudens en fabrieken gebruikt als brandstof in de 17e Eeuw?",
            2,
            "turf",
            "aardolie",
            "aardgas",
            "elektriciteit"
        )//3
        this.history.AddQuestion(
            "Hoe noemt koning Lodewijk XIV zichzelf?",
            1,
            "De Zonnekoning",
            "Lodewijk de sterke",
            "De kleine",
            "Panchu"
        )//4
        this.history.AddQuestion(
            "Wat gebeurde er in het rampjaar 1672?",
            4,
            "De republiek werd aangevallen door de legers van frankrijk, Engeland, Keulen en Munster.",
            "Lodewijk XIV overlijd.",
            "Michiel de Ruyter verliest een belangrijke zeeslag.",
            "Engeland verbiedt Hollandse handelsschepen om in Engeland te komen."
        )//5
        this.history.AddQuestion(
            "In 1672 roept het volk om een stadhouder, wie word uiteindelijk de nieuwe stadhouder?",
            3,
            "Willem III",
            "Willem V",
            "Lodewijk XIV",
            "Max verstappen"
        )//6
        this.history.AddQuestion(
            "Franse geleerden schrijven een serie boeken met allerlei onderwerpen erin. Ze noemen die serie:",
            3,
            "De Ecyclop&#233die",
            "Dictionary",
            "Windows",
            "het kennis boek."
        )//7
        this.history.AddQuestion(
            "Veel mensen in de Republiek zijn ontevreden, er ontstaan twee partijen, de partij tegen de prins terwijl de ander hem juist steunt. Welke groep was tegen de prins?",
            2,
            "De patriotten",
            "De regenten",
            "De prinsgezinden",
            "De Engelsen"
        )//8
        this.history.AddQuestion(
            "Veel mensen in de Republiek zijn ontevreden, er ontstaan twee partijen, de partij tegen de stadhouder terwijl de ander hem juist steunt. Welke groep was voor de stadhouder?",
            2,
            "De prinsgezinden",
            "De Regenten",
            "De patriotten",
            "De Engelsen"
        )//9
        this.history.AddQuestion(
            "Europese handelaren kopen slaven in Afrika, ze verkopen ze op slavenmarkten in Amerika, voor het geld kopen ze suikerriet en andere producten. Hoe word dit genoemd?",
            1,
            "Driehoekshandel",
            "Cirkelhandel",
            "VOC",
            "Suikerriethandel"
        )//10
        this.history.AddQuestion(
            "De Nederlandse _____ houdt zich ook bezig met slavenhandel. Welk woord hoort op de opengelaten plaats?",
            1,
            "WIC",
            "VOC",
            "De nederlandse Handelsbond",
            "VIC"
        )//11
        this.history.AddQuestion(
            "op welke dag verklaren de Engelse kolonisten zich onafhankelijk?",
            2,
            "4 Juli 1776",
            "4 Juni 1776",
            "12 Juni 1676",
            "12 Juli 1676"
        )//12
        this.history.AddQuestion(
            "Wie word de eerste president van Amerika?",
            1,
            "George washington",
            "George W. Bush",
            "John F. Kennedy",
            "Abraham Lincoln"
        )//13
        this.history.AddQuestion(
            "In de 17e Eeuw protesteren mensen in Parijs tegen de hoge graanprijzen, op _____ bestormen ze de Bastille, hiermee begint de Franse Revolutie.",
            2,
            "14 Juli 1789",
            "4 Juli 1789",
            "12 Augustus 1769",
            "4 Juni 1798"
        )//14
        this.history.AddQuestion(
            "In _____ wordt Napoleon alleenheerser in Frankrijk.",
            2,
            "1799",
            "1800",
            "1699",
            "1700"
        )//15
        this.history.AddQuestion(
            "Hoe heet de belangrijke veldslag die Napoleon zijn ondergang werd?",
            3,
            "De slag bij waterloo",
            "De slag in Rusland",
            "De Republieke Oorlog",
            "De slag om het Koninkrijk Holland"
        )

    }
}