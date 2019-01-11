// Used as a mathematical expansion

function randomNumber(a: number, b: number): number {
    const n: number = Math.random();
    const c: number = Math.floor(n * (b - a) + a);
    return c;
}