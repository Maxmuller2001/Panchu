class Timer {
    // Is both used as a timer and a display of itsself 

    // Contains the current time properties
    private minutes: number;
    private seconds: number;

    // Is used for the interval function
    private intervalID: number;

    // Callback
    public OnFinished: () => void = (): void => {};

    // The display
    public box: TextBox;

    constructor(minutes: number, seconds: number, canvas: Canvas) {
        // Makes the display

        const canvasSize: Vector2 = canvas.GetSize();
        const width: number = canvasSize.x / 20;
        const height: number = width / 2;

        this.box = new TextBox(0, 0, width, height, canvas);
        this.seconds = seconds;
        this.minutes = minutes;
    }


    // Start the timer
    public Start(): void {
        this.updateText();
        // Set the interval callback
        this.intervalID = setInterval(
            () => {
                this.updateTime();
                this.updateText();
            },
            1e3 // Makes it run every second (1000ms = 1e3ms = 1s)
        );
    }

    // Stop the timer
    public Stop(): void {
        this.Pauze();

        this.seconds = 0;
        this.minutes = 0;

        this.updateText();
    }

    // Pauze the timer
    public Pauze(): void {
        clearInterval(this.intervalID);
    }

    // Update the timer display
    private updateText(): void {
        const paddedSeconds: string = pad(this.seconds);

        this.box.text = `${this.minutes}:${paddedSeconds}`;
    }

    // Make the seconds and minutes work together like a real timer
    private updateTime(): void {
        if (this.minutes === 0 && this.seconds === 1) {
            this.OnFinished();
            this.Stop();
        }
        else {
            this.seconds--;
            if (this.seconds === -1) {
                this.seconds = 59
                this.minutes--;
            }
        }
    }

}