class Vector2 {

    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // With another vector
    public Add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }

    public Minus(vector: Vector2): Vector2 {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    public Multiply(vector: Vector2): Vector2 {
        return new Vector2(this.x * vector.x, this.y * vector.y);
    }

    public Divide(vector: Vector2): Vector2 {
        return new Vector2(this.x / vector.x, this.y / vector.y);
    }


    // With a number
    public DivideBy(num: number): Vector2 {
        return new Vector2(this.x / num, this.y / num);
    }

    public MultiplyBy(num: number): Vector2 {
        return new Vector2(this.x * num, this.y * num);
    }


    // Vector math
    public Negative(): Vector2 {
        return new Vector2(this.x * -1, this.y * -1);
    }

    public Magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public Normal(): Vector2 {
        const a: number = Math.max(this.x, this.y);
        return new Vector2(this.x / a, this.y / a);
    }

    public Dot(vector: Vector2): number {
        const dot: number = this.x * vector.x + this.y * vector.y
        return dot;
    }

}