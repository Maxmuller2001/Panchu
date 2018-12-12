namespace GameEngine {

    export class TextBox extends StaticEntity {

        private text: string;
        private textColor: string;
        private fontSize: number;
        private lineWidth: number;
        private strokeColor: string;
        private fillColor: string;

        constructor(
            text: string,
            x: number,
            y: number,
            width: number,
            height: number,
            canvas: Canvas,
            textColor?: string,
            fontSize?: number,
            lineWidth?: number,
            strokeColor?: string,
            fillColor?: string
        ) {
            const position: Vector2 = new Vector2(x, y);
            const size: Vector2 = new Vector2(width, height);
            super(position, size, canvas);

            this.text = text;
            this.textColor = textColor;
            this.fontSize = fontSize;
            this.lineWidth = lineWidth;
            this.strokeColor = strokeColor;
            this.fillColor = fillColor;
        }

        /**
         * Draw
         */
        public Draw() {
            const position: Vector2 = this.GetPosition();
            const size: Vector2 = this.GetSize();

            // Draw the box
            this.canvas.DrawStrokedRectangle(
                position.x,
                position.y,
                size.x,
                size.y,
                this.lineWidth,
                this.strokeColor,
                this.fillColor
            );

            // Write the text
            this.canvas.WriteText(
                this.text,
                this.fontSize,
                position.x,
                position.y,
                this.fontSize,
                this.textColor
            );
        }


        public SetText(text: string) {
            this.text = text;
        }
    }

}