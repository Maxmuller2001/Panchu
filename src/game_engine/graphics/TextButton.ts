class TextButton extends Entity {

        public text: string;

        private textBox: TextBox;

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
            super(new Vector2(x, y), new Vector2(width, height), canvas);
            this.text = text;
            this.textBox = new TextBox(
                text,
                x,
                y,
                width,
                height,
                canvas,
                textColor,
                fontSize,
                lineWidth,
                strokeColor,
                fillColor
            )
        }

        public Draw() {
           this.textBox.Draw();
        }

}