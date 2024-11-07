export class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public hasSamePosition(otherPoint: Point): boolean {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    }
}
