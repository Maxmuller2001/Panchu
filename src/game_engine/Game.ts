namespace GameEngine {

    export class Game {
        private canvas: Canvas;

        private entities: Array<Entity> = [];

        // In miliseconds
        private lastTimeStamp: number = 0;


        constructor(canvasElement: HTMLCanvasElement) {
            this.canvas = new Canvas(canvasElement);
        }


        /**
         * Run
         */
        public Run = (timeStamp: number = 0) => {
            // Calculate the time between the current and last frame from miliseconds to seconds
            const deltaTime: number = (timeStamp - this.lastTimeStamp) / 1000;
            this.lastTimeStamp = timeStamp;

            // Clear the canvas
            this.canvas.Clear();
            // Draw all the entities
            this.entities.forEach((entity: Entity) => {
                entity.Draw(deltaTime);
            })

            requestAnimationFrame(this.Run);
        }
        

    }

}