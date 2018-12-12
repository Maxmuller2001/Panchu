namespace GameEngine {

    export abstract class Entity {

        protected position: Vector2;
        protected size: Vector2;

        protected canvas: Canvas;

        protected constructor(position: Vector2, size: Vector2, canvas: Canvas) {
            this.size = size;
            this.position = position;
            this.canvas = canvas;
        }


        /**
         * GetSize
         */
        public GetSize(): Vector2 {
            return this.size;
        }

        /**
         * GetPosition
         */
        public GetPosition(): Vector2 {
            return this.position;
        }


        abstract Draw(deltaTime: number): void;

    }

}