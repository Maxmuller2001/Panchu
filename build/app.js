function onLoad() {
    let canvasElement = document.getElementById("canvas");
    let game = new Game(canvasElement);
    game.Run();
}
window.onload = onLoad;
class Game {
    constructor(canvasElement) {
        this.lastTimeStamp = 0;
        this.questions = new Questions();
        this.BeforeFrame = () => { };
        this.Run = (timeStamp = 0) => {
            const deltaTime = (timeStamp - this.lastTimeStamp) / 1e3;
            this.lastTimeStamp = timeStamp;
            this.canvas.Clear();
            this.BeforeFrame();
            if (this.BeforeFrame)
                this.BeforeFrame = () => { };
            this.currentView.Draw(deltaTime);
            requestAnimationFrame(this.Run);
        };
        this.canvas = new Canvas(canvasElement);
        this.mouse = new Mouse(canvasElement);
        this.keyBoard = new KeyBoard();
        this.startView = new StartView(this.canvas, this, this.mouse);
        this.questionView = new QuestionView(this.canvas, this, this.mouse);
        this.scoreView = new ScoreView(this.canvas, this, this.mouse);
        this.currentView = this.startView;
        this.changeView(this.currentView);
    }
    GoToQuestionView(choice) {
        switch (choice) {
            case "Math":
                this.subject = this.questions.math;
                break;
            case "Geography":
                this.subject = this.questions.geography;
                break;
            case "Dutch":
                this.subject = this.questions.dutch;
                break;
            case "Topography":
                this.subject = this.questions.topography;
                break;
            case "History":
                this.subject = this.questions.history;
                break;
        }
        this.changeView(this.questionView);
    }
    GoToScoreView() {
        this.changeView(this.scoreView);
    }
    GoToStartView() {
        this.changeView(this.startView);
    }
    changeView(view) {
        this.BeforeFrame = () => {
            this.currentView.BeforeExit();
            this.currentView.ClearView();
            view.LoadEntities();
            this.currentView = view;
        };
    }
    GetSubject() {
        return this.subject;
    }
}
class Questions {
    constructor() {
        this.Subject = class Subject {
            constructor() {
                this.questions = [];
            }
            AddQuestion(_question, toughness, _correctAnswer, ...args) {
                const question = {
                    question: _question,
                    correctAnswer: _correctAnswer,
                    otherAnswers: args,
                    toughness: toughness
                };
                this.questions.push(question);
            }
            GetAnswers(question, amountOfAnswers) {
                let answers = [];
                const correctAnswer = question.correctAnswer;
                const otherAnswers = Object.assign([], question.otherAnswers);
                answers.push(correctAnswer);
                for (let i = 0; i < amountOfAnswers - 1; i++) {
                    const index = randomNumber(0, otherAnswers.length);
                    const answer = otherAnswers[index];
                    otherAnswers.splice(index, 1);
                    answers.push(answer);
                }
                answers = this.shuffleAnswers(answers);
                return answers;
            }
            GetQuestion() {
                const index = randomNumber(0, this.questions.length);
                const question = this.questions[index];
                return question;
            }
            shuffleAnswers(answers) {
                for (let i = answers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [answers[i], answers[j]] = [answers[j], answers[i]];
                }
                return answers;
            }
        };
        this.dutch = new this.Subject();
        this.math = new this.Subject();
        this.geography = new this.Subject();
        this.topography = new this.Subject();
        this.history = new this.Subject();
        for (let i = 0; i < 50; i++) {
            const a = randomNumber(1, 1000);
            const b = randomNumber(1, 1000);
            const correctAnswer = a + b;
            const c = randomNumber(-10, 10);
            const d = randomNumber(-10, 10);
            const e = randomNumber(-10, 10);
            const toughness = correctAnswer / 2e3 * 4 + 1;
            this.math.AddQuestion(`Wat is ${a} + ${b}?`, toughness, correctAnswer.toString(), (correctAnswer + c).toString(), (correctAnswer + d).toString(), (correctAnswer + e).toString());
        }
        for (let i = 0; i < 50; i++) {
            const a = randomNumber(1, 20);
            const b = randomNumber(1, 20);
            const correctAnswer = a * b;
            const c = randomNumber(-10, 10);
            const d = randomNumber(-10, 10);
            const e = randomNumber(-10, 10);
            const toughness = correctAnswer / 400 * 4 + 1;
            this.math.AddQuestion(`Wat is ${a} x ${b}?`, toughness, correctAnswer.toString(), (correctAnswer + c).toString(), (correctAnswer + d).toString(), (correctAnswer + e).toString());
        }
        for (let i = 0; i < 50; i++) {
            const a = randomNumber(1, 50);
            const b = randomNumber(1, 50);
            const f = Math.max(a, b);
            const g = Math.min(a, b);
            const correctAnswer = f % g;
            const c = randomNumber(-10, 10);
            const d = randomNumber(-10, 10);
            const e = randomNumber(-10, 10);
            const toughness = f / 24 * 4 + 1;
            this.math.AddQuestion(`Wat is de rest van ${f} : ${g}?`, toughness, correctAnswer.toString(), (correctAnswer + c).toString(), (correctAnswer + d).toString(), (correctAnswer + e).toString());
        }
        this.geography.AddQuestion("Uit welke steden bestaat de Randstad?", 1, "Rotterdam, Den Haag, Amsterdam en Utrecht", "Rotterdam, Den Bosch, Amsterdam en Utrecht", "Delft, Den Haag, Amsterdam en  Utrecht", "Groningen, Drenthe, Amsterdam en Friesland");
        this.geography.AddQuestion("Midden in de Randstand ligt een gebied met grasland, namelijk:", 1, "Het Groene Hart", "Het Blauwe Hart", "Het Groene Hert", "Het Blauwe Hart");
        this.geography.AddQuestion("Wereldsteden, metropolen en stedelijk gebieden zijn dichtbevolkt.", 1, "Deze stelling is juist", "Alleen wereldsteden en stedelijk gebieden zijn dichtbevolkt", "Alleen wereldsteden zijn dichtbevolkt", "Deze stelling is onjuist");
        this.geography.AddQuestion("West-Europa heeft veel landbouw, dit komt door...", 1, "Het zeeklimaat", "Het poolklimaat", "Het landklimaat", "Het Middelandse zeeklimaat");
        this.geography.AddQuestion("Laagland ligt gelijk of net boven de zeespiegel.", 1, "Deze stelling is juist", "Laagland ligt alleen onder de zeespiegel", "Laagland ligt alleen boven de zeespiegel", "Deze stelling is onjuist");
        this.geography.AddQuestion("Uit welke landen bestaat Scandinavië?", 1, "Denemarken, Finland, Zweden, Noorwegen en Ijsland", "Finland, Zweden, Duitsland, Noorwegen en Ijsland", "Schotland, Luxemburg, Denemarken, Finland en Zweden", "Denemarken, Finland, Zwitserland, Noorwegen en Ijsland");
        this.geography.AddQuestion("Wat zijn fjorden?", 1, "Diepe inhammen met hele steile rotswanden", "Rivieren die vanuit de bergen naar de zee stromen", "Een paard", "Scheuren die in de bergen zijn onstaat in de loop van de jaren");
        this.geography.AddQuestion("Aquafarming houdt in dat:", 1, "vissoorten in fjorden geweekt worden om ervoor te zorgen dat vissen niet uitsterven", "vissoorten uit de fjorden gevangen worden voor het bereiden van maaltijden", "waterbakken met daarin vissoorten worden geweekt", "vissoorten in waterbakken gesorteerd worden op grote");
        this.geography.AddQuestion("Hoe onstaat een geiser?", 1, "Door een dunne aardkorst waardoor het grondwater wordt verwarmd en gaat koken", "Door een verschuivingen van platen", "Door de beweging van de aardkorst", "Door een dikke aardkost waardoor het grondwater wordt verwarmd en gaat koken");
        this.geography.AddQuestion("Wat zijn toendra's?", 1, "Vlaktes met alleen mos, gras en kleine struiken", "Vlaktes met alleen met naaldbomen", "Boomsoorten", "Vlaktes met alleen struiken");
        this.geography.AddQuestion("Welke klimaten zijn er in Europa?", 2, "Zeeklimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat", "Grasklimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat", "Zuidpool klimaat, landklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat", "Zeeklimaat, sneeuwklimaat, Middelandse zeeklimaat, hooggebergte klimaat en een poolklimaat");
        this.geography.AddQuestion("Wat is irrigatie?", 2, "Boeren die water of grondwater over het land heen sproeien", "Een watersysteem om water te vervoeren", "Een manier die boeren gebruiken om de oogst te oogsten", "Een ander woord voor mest");
        this.geography.AddQuestion("Een berg van top naar dal ziet er als volgt uit:", 2, "Rotsen, gras, naaldbomen, loofbomen en akkerbouw", "Rotsen, akkerbouw, naaldbomen, loofbomen en gras", "Rotsen, gras, naaldbomen, loofbomen", "Naaldbomen, rosten, loofbomen en akkerbouw");
        this.geography.AddQuestion("De loefzijde van een berg is de kant waar de wind vandaan komt.", 2, "Deze stelling is juist", "De loefzijde van een berg is de kant waar de zon vandaag komt", "De loefzijde van een berg is de kant waar de wolken stijgen", "Deze stelling is niet juist");
        this.geography.AddQuestion("De natuurlijke omstandigheden bestaat uit:", 2, "De temperatuur, de hoeveeheid neerslag en de grondsoort", "De temperatuur, de zon, wind en hagel", "De temperatuur, de zon, wind, hagel en sneeuw", "De temperatuur, de zond, de wind, hagel, sneeuw en regen");
        this.geography.AddQuestion("Het Oeralgebergte vormt de grens tussen:", 2, "Europees Rusland en Aziatisch Rusland", "Aziatisch Rusland en China", "Frankrijk en Italië", "België, Nederland en Luxemburg");
        this.geography.AddQuestion("Rusland heeft meerdere klimaten, welke zijn dit?", 2, "Toendraklimaat, poolklimaat, landklimaat en een subtropisch klimaat", "Zeeklimaat, poolklimaat, landklimaat en een subtropisch klimaat", "Toendraklimaat, poolklimaat, landklimaat en een hooggebergte klimaat", "Zeeklimaat, poolklimaat, landklimaat en een hooggebergte klimaat");
        this.geography.AddQuestion("Wat is de belangrijkste rivier van Polen?", 2, "Wisla", "Oder", "Warta", "Neisse");
        this.geography.AddQuestion("Hoeveel keer groter is Polen in vergelijking met Nederland?", 2, "7,5 keer", "9,5 keer", "9 keer", "7 keer");
        this.geography.AddQuestion("Het Ijzeren Gordijn verdeelde:", 2, "Duitsland in Oost-Duitsland en West-Duitsland", "Duitsland in Noord-Duitsland en Zuid-Duistland", "Polen in Oost-Polen en West-Polen", "Polen in Noord-Polen en Zuid-Polen");
        this.geography.AddQuestion("Wat houdt massatoerisme in?", 3, "Dit houdt in dat veel mensen naar dezelfde gebieden op vakantie gaan", "Dit houdt in dat er veel toerisme is", "Dit houdt in dat er meer toerisme nodig is in een stad", "Dit houdt in dat er minder mensen naar hetzelfde gebied op vakantie gaan");
        this.geography.AddQuestion("Veel jongeren gaan in de stad werken en de ouderen blijven op het platteland is:", 3, "vergrijzing van het platteland", "vernieuwing van de stad", "vergrijzing van de stad", "vernieuwing van het platteland");
        this.geography.AddQuestion("Smog komt vaak voor in grotere steden. Wat is Smog?", 3, "Rook van fabrieken dat in de stad blijft hangen", "Dichte regendruppels wat in de lucht hangt", "Een bepaalde stof", "Een reactie van de natuur");
        this.geography.AddQuestion("Hoe kan de overheid voor meer werkgelegenheid zorgen?", 3, "Bijvoorbeeld door het aanleggen van beter snelwegen en spoorlijnen, waardoor meer bedrijven zichzelf daar vestigen", "Bijvoorbeeld door meer banen aanbieden", "Bijvoorbeeld door meer mensen te laten soliciteren bij verschillende bedrijven", "Bijvoorbeeld door hogere uitkereingen te geven aan de werkeloze mensen");
        this.geography.AddQuestion("Uit hoeveel vulkanen bestaat de Eolische Eilanden?", 3, "7", "8", "5", "4");
        this.geography.AddQuestion("Een fossiele brandstof is:", 3, "een brandstof die in miljoenen jaren onstaat uit hele oude plantenresten", "een aantal botten die diep in de grond zijn gevonden van miljoenen jaren geleden", "een brandstof wat in fabrieken gemaakt wordt", "een brandstof voor fossielen");
        this.geography.AddQuestion("Het afgraven van bruinkool aan de oppervlakte is:", 3, "Dagbouw", "Schachtbouw", "Nachtbouw", "Landbouw");
        this.geography.AddQuestion("Het afgraven van steenkool in lange gangen diep in de grond is:", 3, "Schachtbouw", "Dagbouw", "Landbouw", "Nachtbouw");
        this.geography.AddQuestion("Wat is de snelste manier van vervoer?", 3, "Een vliegtuig", "Een auto", "Een trein", "Een boot");
        this.geography.AddQuestion("Hoe worden de hoofdwegen in Europa ook wel genoemd?", 3, "E-wegen/ Europawegen", "Highstreets", "Hoofdwegen Europa", "A1/ A4");
        this.geography.AddQuestion("De Alpen vormen een hoog gebergte, hoe hoog zijn deze bergen?", 4, "Hoger dan 1500 meter", "Lager dan 1500 meter", "Tussen de  1500 en 2000 meter", "Hoger dan 2000 meter");
        this.geography.AddQuestion("In het voorjaar gaat het jongvee naar de bergweiden. Dit heet:", 4, "Extensive veeteelt", "intriensieke veeteelt", "Schapenhoeder", "verplaatsing");
        this.geography.AddQuestion("Veel goederen worden door een vrachtwagen via een pas vervoerd. Wat is een pas?", 4, "Een pas is een weg van de ene naar de andere berg", "Een route die de vrachtwagen rijdt", "Een kaart om over bepaalde stukken te mogen vervoeren", "Een pasje om over bepaalde stukken te mogen vervoeren");
        this.geography.AddQuestion("Wat is Erosie?", 4, "Het afslijten van land door wind, water of ijs", "Een steensoort", "Een andere naam voor natuurlijke verschijnselen", "Een diersoort");
        this.geography.AddQuestion("Welke gevolgen kunnen er komen door Erosie?", 4, "Het onstaan van modderstromen en lawines", "Het ontstaan van orkanen", "Het ontstaan van orkanen en overstromingen", "Het ontstaan van overstromingen en modderstromen");
        this.geography.AddQuestion("Wat is een lawine?", 4, "Een grote hoeveelheid sneeuw dat van een berghelling naar beneden stort", "Een grote hoeveelheid stenen dat van een berghelling naar beneden stort", "Een grote hoeveelheid aan hagelstenen dat van een berghelling naar beneden stort", "Een grote hoeveelheid modder dat van een berghelling naar beneden stort");
        this.geography.AddQuestion("Wat is agrotoerisme?", 4, "Dit houdt in dat toeristen op boederijen of op campings overnachten", "Dit houdt in dat er gewassen worden verbouwdt voor de toeristen", "Dit houdt in dat er in grote maten toeristen naar dezelfde plek toe gaan", "Dit houdt in dat er niet genoeg toeristen zijn");
        this.geography.AddQuestion("Waar zorgen waterkrachtcentrales voor?", 4, "Voor het aanmaken van elektricieit", "Voor het aanmaken van licht", "Voor het aanmaken van water voor de gewassen", "Voor het aanmaken van warmte");
        this.geography.AddQuestion("Ten noorden van de Alpen is er een:", 4, "Landklimaat", "Zeeklimaat", "Poolklimaar", "Middelandse zeeklimaat");
        this.geography.AddQuestion("Ten zuiden van de Alpen is er een:", 4, "Middellandse Zeeklimaat", "Landklimaat", "Zeeklimaat", "Poolklimaat");
        this.geography.AddQuestion("In welk jaar is de Europese Unie (EU) opgericht?", 5, "1992", "1990", "1900", "2001");
        this.geography.AddQuestion("Wat houdt 'open grenzen' in de EU in?", 5, "Als Nederlander mag je zonder paspoort de grens over binnen de EU", "Je mag zonder paspoort zowel de EU binnen als Amerika", "Dit zijn grenzen zonder poorten en beveiliging", "Je mag als Amerikaan zonder je paspoort de EU binnen");
        this.geography.AddQuestion("Wat zijn de ACS-landen?", 5, "Afrika, de Cariben en de Stille Oceaan.", "Afrika, Canada en de Stille Oceaan", "Antartica, Capri en de Stillen Oceaan", "Antartica, Canada en Suriname");
        this.geography.AddQuestion("Wat is de NAVO?", 5, "Noord-Atlantische Verdrags Organisatie", "Noord-Afrikaanse Verdrags Organisatie", "De Nederlandse en Afrikaanse Verdrags Organisatie", "De Nederlandse en Amerikaanse Verdrags Organisatie");
        this.geography.AddQuestion("Europa laat niet veel mensen binnen in de EU, hoe wordt de EU ook wel genoemd?", 5, "Fort Europa", "Dicht Europa", "Gesloten Europa", "Besloten eenheid");
        this.geography.AddQuestion("De politie van de EU-landen heet:", 5, "Europol", "Interpol", "S.W.A.T.", "Polition");
        this.geography.AddQuestion("Waarom wonen veel mensen op vlakke gebieden met een rivier?", 5, "Vlakke gebieden met een rivier zijn geschikt voor landbouw", "Op vlakke gebieden is het gemakkelijker om huizen te bouwen", "Vlakke gebieden zijn stabieler voor de aardbevingen", "In vlakke gebieden is meer welvaart te vinden");
        this.geography.AddQuestion("Waarom trekken veel mensen naar de steden?", 5, "Steeds meer mensen trekken naar de steden, omdat ze daar werk hopen te vinden", "Steeds meer mensen trekken naar de steden, omdat ze daar goedkoper kunnen leven", "Steeds meer mensen trekken naar de steden, omdat ze daar meer huizen te koop hebben", "Steeds meer mensen trekken naar de steden, omdat ze daar betere faciliteiten hebben");
        this.geography.AddQuestion("Mogen mensen uit Nederland zonder paspoort Frankrijk in?", 5, "Ja, want beide landen zijn lid van de EU", "Nee, want beide landen zijn niet lid van de EU", "Nee, want Frankrijk is niet lid van de EU", "Nee, want Nederland is niet lid van de EU");
        this.geography.AddQuestion("Mogen mensen uit Amerika zonder paspoort Duitsland in?", 5, "Nee, want Amerika is niet lid van de EU", "Nee, want beide landen zijn niet lid van de EU", "Ja, want beide landen zijn lid van de EU", "Nee, want Duitsland is niet lid van de EU");
        this.topography.AddQuestion("Wat is de hoofdstad van de provincie Noord-Holland?", 1, "Haarlem", "Rotterdam", "Amsterdam", "Utrecht");
        this.topography.AddQuestion("Hoeveel provincies heeft Nederland?", 1, "12", "15", "11", "14");
        this.topography.AddQuestion("Wat is de hoofdstad van de provincie Utrecht?", 1, "Utrecht", "Amersfoort", "Woerden", "Utrecht is geen provincie, maar een stad");
        this.topography.AddQuestion("Wat is de hoofdstad van de België?", 2, "Brussel", "Luik", "Antwerpen", "Hasselt");
        this.topography.AddQuestion("Wat is de hoofdstad van Frankrijk?", 2, "Parijs", "Nantes", "Toulouse", "Lyon");
        this.topography.AddQuestion("Wat is de hoofdstad van Zweden?", 3, "Stockholm", "Turku", "Oslo", "Malmö");
        this.topography.AddQuestion("Welk land ligt rechts naast Noorwegen?", 3, "Zweden", "Finland", "Denemarken", "Letland");
        this.topography.AddQuestion("Wat is de hoofdstad van Engeland?", 3, "Londen", "Liverpool", "Manchester", "Dublin");
        this.topography.AddQuestion("Aan welke zee grenst Belgie?", 5, "Noordzee", "Het kanaal", "Noorse Zee", "Oostzee");
        this.topography.AddQuestion("Hoeveel Waddeneilanden telt Nederland?", 4, "8", "12", "6", "11");
        this.topography.AddQuestion("Wat is de naam van het grootste Wadde eiland?", 3, "Texel", "Ameland", "Terschelling", "Vlieland");
        this.topography.AddQuestion("Wat is de hoofdstad van Denemarken?", 5, "Kopenhagen", "Stockholm", "Oslo", "Berlijn");
        this.topography.AddQuestion("Wat is de hoofdstad van Duitsland?", 5, "Berlijn", "Keulen", "Zürich", "München");
        this.topography.AddQuestion("Uit hoeveel landen bestaat de Europese Unie?", 4, "28", "20", "24", "26");
        this.topography.AddQuestion("Aan welk meer ligt Lelystad?", 5, "Markermeer", "Ijselmeer", "Gooimeer", "Veluwemeer");
        this.topography.AddQuestion("Wat is de hoofdstad van provincie Zeeland?", 1, "Middelburg", "Goes", "Vlissingen", "Zierikzee");
        this.topography.AddQuestion("Wat is de hoofdstad van provincie Limburg?", 1, "Maastricht", "Weerd", "Venlo", "Roermond");
        this.topography.AddQuestion("Wat is de naam van de eilanden ten noorden van Nederland?", 1, "Waddeneilanden", "Zeeuwse eilanden", "Texelse eilanden", "Terschellingse eilanden");
        this.topography.AddQuestion("In welke provincie ligt de stad Breda?", 3, "Noord-brabant", "Limburg", "Zuid-holland", "Zeeland");
        this.topography.AddQuestion("In welk land ligt de stad Antwerpen?", 4, "België", "Nederland", "Luxemburg", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad London?", 3, "Engeland", "België", "Ierland", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad Keulen?", 3, "Duitsland", "België", "Ierland", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad Hamburg?", 4, "Duitsland", "België", "Ierland", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad Brussel?", 4, "België", "Duitsland", "Luxemburg", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad Stockholm?", 5, "Zweden", "Finland", "Noorwegen", "Denemarken");
        this.topography.AddQuestion("In welk land ligt de stad Oslo?", 1, "Noorwegen", "Finland", "Zweden", "Denemarken");
        this.topography.AddQuestion("In welk land ligt de stad Kopenhagen?", 5, "Denemarken", "Finland", "Zweden", "Noorwegen");
        this.topography.AddQuestion("In welk land ligt de stad Luik?", 4, "België", "Nederland", "Luxemburg", "Frankrijk");
        this.topography.AddQuestion("In welk land ligt de stad Amsterdam?", 1, "Nederland", "België", "Luxemburg", "Frankrijk");
        this.dutch.AddQuestion("(Onze) tuin is perfect ingericht zei Buurman Mol. Wat voor woord staat tussen de haakjes?", 3, "Bezittelijk voornaamwoord", "Lidwoord", "Bijvoegelijk naamwoord", "Zelfstandig naamwoord");
        this.dutch.AddQuestion("Een sollicitant is iemand die ...", 3, "Een baan probeert te krijgen.", "Leiding geeft aan een afdeling.", "Mensen in dienst neemt.", "De geldzaken op orde houdt.");
        this.dutch.AddQuestion("Waar gaat het bij iemand iets verwijten vooral om?", 1, "Iemand iets kwalijk nemen.", "Iemand iets vergeven.", "Iemand pijn doen.", "Dat de ander je niet terug hoeft te betalen.");
        this.dutch.AddQuestion("Waar gaat het bij corvee vooral om?", 1, "Taak die ieder op zijn beurt moet doen.", "samenwerking", "Ergens onderuit komen.", "Dwang");
        this.dutch.AddQuestion("Een taboe is een ...", 1, "Onderwerp waar men liever niet over praat.", "Discussiepunt.", "Fijn net waaronder men slaapt om muggen buiten te houden.", "Vragenronde aan het eind van een vergadering.");
        this.dutch.AddQuestion("Wat is een ander woord voor identiek?", 1, "Gelijk", "Anders", "sociaal", "Paspoort");
        this.dutch.AddQuestion("Wat is geen tijdperk?", 1, "De Slag bij Waterloo", "De middeleeuwen", "De steentijd", "De prehistorie");
        this.dutch.AddQuestion("Wat is een ander woord voor gehucht?", 1, "Dorpje", "Provincie", "Streek", "Stad");
        this.dutch.AddQuestion("Waar gaat het bij een ezelsbruggetje vooral om?", 1, "Iets onthouden.", "Iets toelichten.", "Iets bereiken.", "Iets begrijpen.");
        this.dutch.AddQuestion("Waar gaat het bij erosie vooral om?", 1, "Afslijten", "Verstevigen", "Opbouwen", "Bevestigen");
        this.dutch.AddQuestion("Wat is het tegengestelde van tenger?", 1, "Grof", "Tjokvol", "Onzeker", "Compact");
        this.dutch.AddQuestion("Maxima is een (slimme) meid. Wat is het woord tussen haakjes?", 1, "Bijvoeglijk naamwoord", "Lidwoord", "Werkwoord", "Zelfstandig naamwoord");
        this.dutch.AddQuestion("De vijf (beste) kandidaten gaan door. Wat is het woord tussen haakjes?", 1, "Bijvoeglijk naamwoord", "Werkwoord", "Zelfstandig naamwoord", "Lidwoord");
        this.dutch.AddQuestion("Je zult het ermee moeten (doen). Wat is het woord tussen haakjes?", 1, "werkwoord", "zelfstandig naamwoord", "bijvoeglijk naamwoord", "lidwoord");
        this.dutch.AddQuestion("Bedankt voor (de) fantastische voorstelling! Wat is het woord tussen haakjes?", 1, "lidwoord", "werkwoord", "bijvoeglijk naamwoord", "zelfstandig naamwoord");
        this.dutch.AddQuestion("Zet de (luidsprekers) maar wat harder. Wat is het woord tussen haakjes?", 1, "zelfstandig naamwoord.", "werkwoord", "bijvoeglijk naamwoord", "lidwoord");
        this.dutch.AddQuestion("Bedankt voor (de) fantastische voorstelling! Wat is het woord tussen haakjes?", 1, "lidwoord", "zelfstandig naamwoord", "bijvoeglijk naamwoord", "werkwoord");
        this.dutch.AddQuestion("Xiu heeft (een) flink aantal volgers op Twitter. Wat is het woord tussen haakjes?", 1, "lidwoord", "werkwoord", "bijvoeglijk naamwoord", "zelfstandig naamwoord");
        this.dutch.AddQuestion("Heb je op je favoriete kandidaat (gestemd)? Wat is het woord tussen haakjes?", 1, "werkwoord", "zelfstandig naamwoord", "lidwoord", "bijvoeglijk naamwoord");
        this.dutch.AddQuestion("De (excursie) naar de afvalcentrale was leuk en leerzaam. Wat is het woord tussen haakjes?", 1, "zelfstandig naamwoord", "lidwoord", "bijvoeglijk naamwoord", "werkwoord");
        this.dutch.AddQuestion("We hebben (de) hoofdprijs gewonnen! Wat is het woord tussen haakjes?", 1, "lidwoord", "werkwoord", "zelfstandig naamwoord", "bijvoeglijk naamwoord");
        this.dutch.AddQuestion("Vertel het (me) nou maar zei Max. Wat is het woord tussen haakjes?", 1, "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "aanwijzend voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("Hij heeft (zijn) laatste oortje versnoept. Wat is het woord tussen haakjes?", 1, "bezittelijk voornaamwoord", "vragend voornaamwoord", "aanwijzend voornaamwoord", "persoonlijk voornaamwoord");
        this.dutch.AddQuestion("In (welke) situaties heb jij voorrang? Wat is het woord tussen haakjes?", 1, "vragend voornaamwoord", "persoonlijk voornaamwoord", "aanwijzend voornaamwoord", "bezittelijk voornaamwoord");
        this.dutch.AddQuestion("Dat is (onze) winterpostelein zei Casper. Wat is het woord tussen haakjes?", 1, "bezittelijk voornaamwoord", "aanwijzend voornaamwoord", "persoonlijk voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("Grijp (die) kans! Wat is het woord tussen haakjes?", 1, "aanwijzend voornaamwoord", "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("In (deze) grotten raak je snel de weg kwijt. Wat is het woord tussen haakjes?", 1, "aanwijzend voornaamwoord", "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("Met (dit) liedje kun je in de finale komen. Wat is het woord tussen haakjes?", 1, "aanwijzend voornaamwoord", "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("Waar staan (jullie) schoenen? Wat is het woord tussen haakjes?", 1, "bezittelijk voornaamwoord", "vragend voornaamwoord", "aanwijzend voornaamwoord", "persoonlijk voornaamwoord");
        this.dutch.AddQuestion("Ik geef (haar) een nieuwe tas. Wat is het woord tussen haakjes?", 1, "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "aanwijzend voornaamwoord", "vragend voornaamwoord");
        this.dutch.AddQuestion("(Wat) zou jij in die situatie doen? Wat is het woord tussen haakjes?", 1, "vragend voornaamwoord", "persoonlijk voornaamwoord", "bezittelijk voornaamwoord", "aanwijzend voornaamwoord");
        this.dutch.AddQuestion("Je hebt (dat) boek te laat ingeleverd. Wat is het woord tussen haakjes?", 1, "aanwijzend voornaamwoord", "bezittelijk voornaamwoord", "vragend voornaamwoord", "persoonlijk voornaamwoord");
        this.dutch.AddQuestion("Wat is het onderwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?", 1, "tante Toos", "Toos", "tante", "de plantjes");
        this.dutch.AddQuestion("Wat is het gezegde in de volgende zin: Heeft tante Toos de plantjes water gegeven?", 1, "heeft gegeven", "heeft", "gegeven", "water");
        this.dutch.AddQuestion("Wat is het lijdend voorwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?", 1, "water", "heeft gegeven", "tante Toos", "de plantjes");
        this.dutch.AddQuestion("Wat is het meewerkend voorwerp in de volgende zin: Heeft tante Toos de plantjes water gegeven?", 1, "de plantjes", "tante Toos", "gegeven", "water");
        this.dutch.AddQuestion("Wat is het onderwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.", 1, "ik", "het vleesetende plantje", "een paar vette vliegen", "vette vliegen");
        this.dutch.AddQuestion("Wat is het gezegde in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.", 1, "zal vangen", "vangen", "zal", "ik");
        this.dutch.AddQuestion("Wat is het lijdend voorwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.", 1, "een paar vette vliegen", "zal vangen", "voor het vleesetende plantje", "vette vliegen");
        this.dutch.AddQuestion("Wat is het meewerkend voorwerp in de volgende zin: Voor het vleesetende plantje zal ik een paar vette vliegen vangen.", 1, "voor het vleesetende plantje", "een paar vette vliegen", "ik", "zal vangen");
        this.history.AddQuestion("Welke ontdekkingsreiziger bereikte in 1497 Indi&#235;?", 1, "Vasco da Gama", "Columbus", "Carthago", "Marco Polo");
        this.history.AddQuestion("Wie is Willem Barentsz?", 1, "Een Nederlandse handelaar die in 1562 langs de Noordpool Indië probeerde te bereiken.", "Een Nederlandse handelaar die in 1492 als eerste Amerika ontdekte.", "Een Nederlandse handelaar die meerdere landen had gekoloniseerd.", "Een Nederlandse handelaar die een route naar Indi&#235; vond via Kaapstad");
        this.history.AddQuestion("Waar leven de Azteken?", 1, "Midden-Amerika", "Zuid-Amerika", "Zuid-Afrika", "Noord-Amerika");
        this.history.AddQuestion("Wat betekent het woord 'Renaissance'?", 1, "wedergeboorte", "zonneperiode", "rijkelijk", "geluk");
        this.history.AddQuestion("Wat vond Erasmus?", 1, "Hij vond dat mensen hun eigen verstand moesten gebruiken en dingen moesten gaan ontdekken.", "Hij vond dat als God is vertelde dat de mensen dat moesten geloven er naar moesten luisteren.", "Hij vond zelf op onderzoek gaan en dingen uitzoeken een schande tegenover God.", "Hij vond God de beste.");
        this.history.AddQuestion("Waar is de protestanste monnik Luther onder andere boos over?", 2, "De aflaathandel van de katholieke kerk.", "Over de democratie in het land.", "Over de hoeveelheid werkgelegenheid.", "Over de toestanden in het land.");
        this.history.AddQuestion("Welke twee groepen komen op sinds de komst van Luther?", 2, "protestanten en katholieken", "democraten en totalitaire leiders", "protestanten en democraten", "katholieken en totalitaire leiders");
        this.history.AddQuestion("Wat wilde Koning Filips de 2e graag in zijn land?", 2, "Dezelfde regels en wetten en dat iedereen katholiek is.", "Verschil in rijk en arm en dat iedereen protestants is.", "Af van de adel en dat iedereen protestants is.", "Protestanten en katholieken vreedzaam naast elkaar laten leven.");
        this.history.AddQuestion("Wanneer was de Beeldenstorm en wat houdt dat in?", 2, "1566, boze protestanten vernielen kerken van katholieken.", "1555, boze protestanten vernielen kerken van katholieken.", "1566, boze katholieken vernielen kerken van protestanten.", "1555, boze katholieken vernielen kerken van protestanten.");
        this.history.AddQuestion("In 1588 begint Willem van Oranje een opstand tegen Koning Filips de 2e. Hoelang duurt de opstand.", 2, "80 jaar", "4 jaar", "1 jaar", "30 jaar");
        this.history.AddQuestion("In welke tijd leefde Rembrandt van Rijn?", 3, "de Gouden Eeuw", "de Renaissance", "de Middeleeuwen", "de Prehistorie");
        this.history.AddQuestion("Wat komt in de Gouden Eeuw ook wel veel op?", 3, "de wetenschap, het onderzoeken van dingen.", "de democratie, eigen mening en keuzes van het volk.", "de strijdt om de macht in de wereld.", "de strijdt om het feminisme.");
        this.history.AddQuestion("Wat is de taak van een stadhouder?", 3, "Ieder zijn eigen gewest te besturen en er toezicht op houden onder naam van de koning.", "Alle gewesten te besturen in een land.", "Het volk te helpen met keuzes te maken.", "De stadhouder houdt de gevangenen in de gaten.");
        this.history.AddQuestion("Welke gewesten zitten er in de Staten-Generaal?", 3, "Utrecht, Gelre, Holland, Zeeland, Overijssel, Friesland en Groningen.", "Utrecht, Drenthe, Holland, Zeeland, Overijssel, Friesland en Groningen.", "Utrecht, Lelystad, Holland, Drenthe, Overijssel, Friesland en Groningen.", "Utrecht, Holland, Zeeland, Overijssel, Friesland en Groningen.");
        this.history.AddQuestion("Wat is het hoogte punt in het jaar 1648?", 3, "De Republiek wordt een onafhankelijk land", "De twaalfjarige oorlog gaat weer verder onder leiding van Van Oldebarnevelt.", "De 80 jarige oorlog wordt in stilstand gezet.", "De Republiek valt onder leiding van de Spaanse koning Filips de 2e.");
        this.history.AddQuestion("In de Gouden Eeuw zijn er vier standen, wat is de grootste groep?", 1, "gewone volk", "regenten", "gegoede burgerij", "kleine burgerij");
        this.history.AddQuestion("Wat werd in veel huishoudens en fabrieken gebruikt als brandstof in de 17e Eeuw?", 2, "turf", "aardolie", "aardgas", "elektriciteit");
        this.history.AddQuestion("Hoe noemt koning Lodewijk XIV zichzelf?", 1, "De Zonnekoning", "Lodewijk de sterke", "De kleine", "Panchu");
        this.history.AddQuestion("Wat gebeurde er in het rampjaar 1672?", 4, "De republiek werd aangevallen door de legers van frankrijk, Engeland, Keulen en Munster.", "Lodewijk XIV overlijd.", "Michiel de Ruyter verliest een belangrijke zeeslag.", "Engeland verbiedt Hollandse handelsschepen om in Engeland te komen.");
        this.history.AddQuestion("In 1672 roept het volk om een stadhouder, wie word uiteindelijk de nieuwe stadhouder?", 3, "Willem III", "Willem V", "Lodewijk XIV", "Max verstappen");
        this.history.AddQuestion("Franse geleerden schrijven een serie boeken met allerlei onderwerpen erin. Ze noemen die serie:", 3, "De Ecyclop&#233die", "Dictionary", "Windows", "het kennis boek.");
        this.history.AddQuestion("Veel mensen in de Republiek zijn ontevreden, er ontstaan twee partijen, de partij tegen de prins terwijl de ander hem juist steunt. Welke groep was tegen de prins?", 2, "De patriotten", "De regenten", "De prinsgezinden", "De Engelsen");
        this.history.AddQuestion("Veel mensen in de Republiek zijn ontevreden, er ontstaan twee partijen, de partij tegen de stadhouder terwijl de ander hem juist steunt. Welke groep was voor de stadhouder?", 2, "De prinsgezinden", "De Regenten", "De patriotten", "De Engelsen");
        this.history.AddQuestion("Europese handelaren kopen slaven in Afrika, ze verkopen ze op slavenmarkten in Amerika, voor het geld kopen ze suikerriet en andere producten. Hoe word dit genoemd?", 1, "Driehoekshandel", "Cirkelhandel", "VOC", "Suikerriethandel");
        this.history.AddQuestion("De Nederlandse _____ houdt zich ook bezig met slavenhandel. Welk woord hoort op de opengelaten plaats?", 1, "WIC", "VOC", "De nederlandse Handelsbond", "VIC");
        this.history.AddQuestion("op welke dag verklaren de Engelse kolonisten zich onafhankelijk?", 2, "4 Juli 1776", "4 Juni 1776", "12 Juni 1676", "12 Juli 1676");
        this.history.AddQuestion("Wie word de eerste president van Amerika?", 1, "George washington", "George W. Bush", "John F. Kennedy", "Abraham Lincoln");
        this.history.AddQuestion("In de 17e Eeuw protesteren mensen in Parijs tegen de hoge graanprijzen, op _____ bestormen ze de Bastille, hiermee begint de Franse Revolutie.", 2, "14 Juli 1789", "4 Juli 1789", "12 Augustus 1769", "4 Juni 1798");
        this.history.AddQuestion("In _____ wordt Napoleon alleenheerser in Frankrijk.", 2, "1799", "1800", "1699", "1700");
        this.history.AddQuestion("Hoe heet de belangrijke veldslag die Napoleon zijn ondergang werd?", 3, "De slag bij waterloo", "De slag in Rusland", "De Republieke Oorlog", "De slag om het Koninkrijk Holland");
    }
}
class Score {
    constructor(canvas) {
        this.score = 0;
        const canvasSize = canvas.GetSize();
        const width = canvasSize.x / 20;
        const height = width / 2;
        this.box = new TextBox(0, 0, width, height, canvas);
        this.box.text = this.score.toString();
    }
    Add(x) {
        x = Math.floor(x);
        this.score += x;
        if (this.score < 0) {
            this.score = 0;
        }
        this.updateText();
    }
    Reset() {
        this.score = 0;
        this.updateText();
    }
    GetScore() {
        return this.score;
    }
    static AddScore(score) {
        Score.scores.push(score);
        Score.scores.sort((a, b) => { return b - a; });
    }
    updateText() {
        this.box.text = this.score.toString();
    }
}
Score.scoreScale = 1e1;
Score.scores = [];
class Timer {
    constructor(minutes, seconds, canvas) {
        this.OnFinished = () => { };
        const canvasSize = canvas.GetSize();
        const width = canvasSize.x / 20;
        const height = width / 2;
        this.box = new TextBox(0, 0, width, height, canvas);
        this.seconds = seconds;
        this.minutes = minutes;
    }
    Start() {
        this.updateText();
        this.intervalID = setInterval(() => {
            this.updateTime();
            this.updateText();
        }, 1e3);
    }
    Stop() {
        this.Pauze();
        this.seconds = 0;
        this.minutes = 0;
        this.updateText();
    }
    Pauze() {
        clearInterval(this.intervalID);
    }
    updateText() {
        const paddedSeconds = pad(this.seconds);
        this.box.text = `${this.minutes}:${paddedSeconds}`;
    }
    updateTime() {
        if (this.minutes === 0 && this.seconds === 1) {
            this.OnFinished();
            this.Stop();
        }
        else {
            this.seconds--;
            if (this.seconds === -1) {
                this.seconds = 59;
                this.minutes--;
            }
        }
    }
}
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
    DrawStrokedRectangle(x, y, width, height, lineWidth, strokeColor = "black", fillColor = "white") {
        this.DrawRectangle(x + lineWidth / 2, y + lineWidth / 2, width - lineWidth, height - lineWidth, fillColor);
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
function pad(n) {
    return (n < 10) ? (`0${n.toString()}`) : n.toString();
}
class Entity {
    constructor(position, size, canvas) {
        this.OnHover = () => { };
        this.OnClick = () => { };
        this.BeforePhysicsUpdate = () => { };
        this.size = size;
        this.position = position;
        this.canvas = canvas;
    }
    Update(deltaTime) { }
    ;
}
class View {
    constructor(canvas, game, mouse) {
        this.entities = [];
        this.click = false;
        this.BeforeExit = () => { };
        this.game = game;
        this.canvas = canvas;
        this.mouse = mouse;
        this.canvasElement = canvas.canvas;
        mouse.BindCallback("click", () => { this.click = true; });
    }
    Draw(deltaTime) {
        this.mouseUpdate();
        this.entities.forEach((entity) => { entity.Draw(); });
    }
    ClearView() {
        this.entities = [];
    }
    mouseUpdate() {
        for (let i = this.entities.length; i > 0; i--) {
            let entity = this.entities[i - 1];
            let mousePosition = this.mouse.GetPosition();
            let entityPosition = entity.position;
            let entitySize = entity.size;
            if (mousePosition.x >= entityPosition.x &&
                mousePosition.x <= entityPosition.x + entitySize.x &&
                mousePosition.y >= entityPosition.y &&
                mousePosition.y <= entityPosition.y + entitySize.y) {
                entity.OnHover();
                if (this.click)
                    entity.OnClick();
            }
        }
        this.click = false;
    }
}
class Box extends Entity {
    constructor(x, y, width, height, canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.text = "";
        this.fontSize = 30;
    }
    Draw() {
        this.canvas.DrawRectangle(this.position.x, this.position.y, this.size.x, this.size.y, this.fillColor);
        this.canvas.WriteText(this.text, this.position.x + this.size.x / 2, this.position.y + this.fontSize / 2 + this.size.y / 2 - 5, this.fontSize, this.textColor);
    }
}
class ImageBox extends Entity {
    constructor(source, x, y, width, height, canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.loaded = false;
        this.scale = 1;
        this.image = new Image(width, height);
        this.image.onload = () => { this.loaded = true; };
        this.image.src = source;
    }
    Draw() {
        if (this.loaded === true) {
            this.canvas.DrawImageFromFile(this.image, this.position.x, this.position.y, this.size.x * this.scale, this.size.y * this.scale);
        }
    }
}
class TextBox extends Entity {
    constructor(x, y, width, height, canvas) {
        super(new Vector2(x, y), new Vector2(width, height), canvas);
        this.text = "";
        this.fontSize = 30;
    }
    Draw() {
        this.canvas.WriteText(this.text, this.position.x + this.size.x / 2, this.position.y + this.fontSize / 2 + this.size.y / 2 - 5, this.fontSize, this.textColor);
    }
}
class KeyBoard {
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
    GetLeftPressed() {
        return this.leftPressed;
    }
    GetUpPressed() {
        return this.upPressed;
    }
    GetRightPressed() {
        return this.rightPressed;
    }
    GetDownPressed() {
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
    GetPosition() {
        return this.position;
    }
}
function randomNumber(a, b) {
    const n = Math.random();
    const c = Math.floor(n * (b - a) + a);
    return c;
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
    Minus(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }
    Multiply(vector) {
        return new Vector2(this.x * vector.x, this.y * vector.y);
    }
    Divide(vector) {
        return new Vector2(this.x / vector.x, this.y / vector.y);
    }
    DivideBy(num) {
        return new Vector2(this.x / num, this.y / num);
    }
    MultiplyBy(num) {
        return new Vector2(this.x * num, this.y * num);
    }
    Negative() {
        return new Vector2(this.x * -1, this.y * -1);
    }
    Magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    Normal() {
        const a = Math.max(this.x, this.y);
        return new Vector2(this.x / a, this.y / a);
    }
    Dot(vector) {
        const dot = this.x * vector.x + this.y * vector.y;
        return dot;
    }
}
class QuestionView extends View {
    constructor(canvas, game, mouse) {
        super(canvas, game, mouse);
        this.boxColor = "#00b4db";
        this.correctColor = "#00b16a";
        this.incorrectColor = "#e74c3c";
        this.fontSize = 30;
        this.answerDelay = 0.2;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.BeforeExit = () => {
            this.correctCount = 0;
            this.wrongCount = 0;
        };
    }
    LoadEntities() {
        this.subject = this.game.GetSubject();
        const offset = 10;
        const canvasSize = this.canvas.GetSize();
        this.timer = new Timer(0, 59, this.canvas);
        this.timer.box.position.x += offset;
        this.timer.box.position.y += offset;
        this.score = new Score(this.canvas);
        this.score.box.position.x = canvasSize.x - this.score.box.size.x - offset;
        this.score.box.position.y = offset;
        this.entities.push(this.timer.box, this.score.box);
        this.loadQuestion();
        this.timer.Start();
        this.timer.OnFinished = () => {
            const score = this.score.GetScore();
            Score.AddScore(score);
            this.game.GoToScoreView();
        };
    }
    getCorrectCount() {
        return this.correctCount;
    }
    getWrongCount() {
        return this.wrongCount;
    }
    shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    }
    loadQuestion() {
        const canvasSize = this.canvas.GetSize();
        const question = this.subject.GetQuestion();
        const correctAnswer = question.correctAnswer;
        let answers = this.subject.GetAnswers(question, 4);
        answers = this.shuffleAnswers(answers);
        let questionBox = new Box(0, canvasSize.y / 4, canvasSize.x / 6 * 5, canvasSize.y / 10, this.canvas);
        questionBox.position.x = canvasSize.x / 2 - questionBox.size.x / 2;
        questionBox.fillColor = this.boxColor;
        questionBox.fontSize = this.fontSize;
        questionBox.text = question.question;
        answers.forEach((answer, index) => {
            const yPositionStart = questionBox.position.y + questionBox.size.y;
            const questionMargin = questionBox.size.y / 4;
            const padding = questionBox.size.y / 8;
            const height = questionBox.size.y / 4 * 3;
            const yPosition = yPositionStart + questionMargin + height * index + padding * index;
            const box = new Box(questionBox.position.x, yPosition, questionBox.size.x, height, this.canvas);
            box.text = answer;
            box.fontSize = this.fontSize - 4;
            box.fillColor = this.boxColor;
            box.OnClick = () => {
                const points = question.toughness * Score.scoreScale;
                if (box.text === correctAnswer) {
                    box.fillColor = this.correctColor;
                    this.score.Add(points);
                    this.correctCount++;
                }
                else {
                    box.fillColor = this.incorrectColor;
                    this.score.Add(-points);
                    this.wrongCount++;
                }
                this.nextQuestion();
            };
            this.entities.push(box);
        });
        this.entities.push(questionBox);
        document.getElementById("canvas").style.backgroundColor = "#99ccff";
    }
    nextQuestion() {
        setTimeout(() => {
            this.ClearView();
            this.loadQuestion();
            this.entities.push(this.timer.box, this.score.box);
        }, this.answerDelay * 1e3);
    }
}
class ScoreView extends View {
    constructor(canvas, game, mouse) {
        super(canvas, game, mouse);
    }
    LoadEntities() {
        const canvasSize = this.canvas.GetSize();
        let title = new Box(0, 0, canvasSize.x / 4, canvasSize.y / 8, this.canvas);
        title.position.x = canvasSize.x / 2 - title.size.x / 2;
        title.position.y = canvasSize.y / 6;
        title.fillColor = "#00b4db";
        title.fontSize = 35;
        title.text = "Scores";
        let backButton = new Box(0, 0, title.size.x, title.size.y / 4 * 3, this.canvas);
        backButton.position.x = canvasSize.x / 2 - backButton.size.x / 2;
        backButton.position.y = canvasSize.y - canvasSize.y / 20 - backButton.size.y;
        backButton.text = "Ga terug";
        backButton.fillColor = "gray";
        backButton.OnClick = () => {
            this.game.GoToStartView();
        };
        const padding = 10;
        const _scores = Math.min(ScoreView.amountOfScores, Score.scores.length);
        for (let i = 0; i < _scores; i++) {
            const score = Score.scores[i];
            const n = i + 1;
            let scoreBox = new Box(title.position.x, 0, title.size.x, title.size.y / 4 * 3, this.canvas);
            scoreBox.position.y = title.position.y + title.size.y + padding * n + scoreBox.size.y * i;
            scoreBox.text = `${score}`;
            scoreBox.fillColor = "#00b4db";
            let numberBox = new TextBox(0, scoreBox.position.y, scoreBox.size.y, scoreBox.size.y, this.canvas);
            numberBox.position.x = scoreBox.position.x;
            numberBox.text = `${n}.`;
            this.entities.push(scoreBox, numberBox);
        }
        this.entities.push(title, backButton);
    }
}
ScoreView.amountOfScores = 5;
class StartView extends View {
    constructor(canvas, game, mouse) {
        super(canvas, game, mouse);
        this.OnChoice = (choice) => { };
        this.choice = "None";
    }
    LoadEntities() {
        const writeTtile = this.canvas.WriteText("Title!", innerWidth / 2, 100, 50, "#FFF", "center");
        const canvasWidth = innerWidth;
        const canvasHeight = innerHeight;
        const boxMiddelLeft = (canvasWidth / 2) - ((canvasWidth / 2) / 2) - 50;
        const boxMiddelRight = (canvasWidth / 2) - ((((((canvasWidth / 2) / 2) / 2) / 2) / 2) / 2) + 15;
        let choiceDutch = new Box(boxMiddelLeft, 120, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceDutch.text = "Nederlands";
        choiceDutch.fillColor = "#00b4db";
        choiceDutch.OnClick = () => {
            this.choice = "Dutch";
            choiceDutch.fillColor = "#f5d76e";
            choiceHistory.fillColor = "#fad859";
            choiceMath.fillColor = "#fad859";
            choiceGeography.fillColor = "#fad859";
            choiceTopography.fillColor = "#fad859";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#f5d76e";
            document.getElementById("canvas").style.backgroundColor = "#f4d03f";
            let iconDutch = new ImageBox("./assets/images/subjects/icon_nl2.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconDutch);
        };
        let choiceHistory = new Box(boxMiddelLeft, 230, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceHistory.text = "Geschiedenis";
        choiceHistory.fillColor = "#00b4db";
        choiceHistory.OnClick = () => {
            this.choice = "History";
            choiceDutch.fillColor = "#c0392b";
            choiceHistory.fillColor = "#e74c3c";
            choiceMath.fillColor = "#c0392b";
            choiceGeography.fillColor = "#c0392b";
            choiceTopography.fillColor = "#c0392b";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#e74c3c";
            document.getElementById("canvas").style.backgroundColor = "#96281b";
            let iconHistory = new ImageBox("./assets/images/subjects/icon_gs2.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconHistory);
        };
        let choiceMath = new Box(boxMiddelLeft, 340, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceMath.fillColor = "#00b4db";
        choiceMath.text = "Rekenen";
        choiceMath.OnClick = () => {
            this.choice = "Math";
            choiceDutch.fillColor = "#446cb3";
            choiceHistory.fillColor = "#446cb3";
            choiceMath.fillColor = "#4b77be";
            choiceGeography.fillColor = "#446cb3";
            choiceTopography.fillColor = "#446cb3";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#4b77be";
            document.getElementById("canvas").style.backgroundColor = "#3a539b";
            let iconMath = new ImageBox("./assets/images/subjects/Rekenen.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconMath);
        };
        let choiceGeography = new Box(boxMiddelLeft, 450, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceGeography.text = "Aardrijkskunde";
        choiceGeography.fillColor = "#00b4db";
        choiceGeography.OnClick = () => {
            this.choice = "Geography";
            choiceDutch.fillColor = "#e74c3c";
            choiceHistory.fillColor = "#e74c3c";
            choiceMath.fillColor = "#e74c3c";
            choiceGeography.fillColor = "#e07267";
            choiceTopography.fillColor = "#e74c3c";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#e74c3c";
            document.getElementById("canvas").style.backgroundColor = "#c0392b";
            let iconGeograpy = new ImageBox("./assets/images/subjects/Aardrijkskunde.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconGeograpy);
        };
        let choiceTopography = new Box(boxMiddelLeft, 560, (canvasWidth / 2) / 2, 80, this.canvas);
        choiceTopography.text = "Topografie";
        choiceTopography.fillColor = "#00b4db";
        choiceTopography.OnClick = () => {
            this.choice = "Topography";
            choiceDutch.fillColor = "#00b16a";
            choiceHistory.fillColor = "#00b16a";
            choiceMath.fillColor = "#00b16a";
            choiceGeography.fillColor = "#00b16a";
            choiceTopography.fillColor = "#87d37c";
            playButton.fillColor = "#0083b0";
            imageChoice.fillColor = "#87d37c";
            document.getElementById("canvas").style.backgroundColor = "#26a65b";
            let iconTopograpy = new ImageBox("./assets/images/subjects/icon_tg2.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
            this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconTopograpy);
        };
        let imageChoice = new Box(boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
        imageChoice.fillColor = "#c4d1d3";
        let playButton = new Box(boxMiddelRight, 560, (canvasWidth / 2) / 2, 80, this.canvas);
        playButton.text = "Starten";
        playButton.fillColor = "#c4d1d3";
        playButton.OnClick = () => {
            if (this.choice)
                this.game.GoToQuestionView(this.choice);
        };
        let iconChoice = new ImageBox("./assets/images/subjects/Choice.png", boxMiddelRight, 120, (canvasWidth / 2) / 2, 300, this.canvas);
        this.entities.push(choiceDutch, choiceHistory, choiceMath, choiceGeography, imageChoice, playButton, choiceTopography, iconChoice);
    }
    getChoice() {
        return this.choice;
    }
}
//# sourceMappingURL=app.js.map