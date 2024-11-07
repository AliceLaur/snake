import { Point } from "./Point.js";

export class Apple extends Point {
    private color: string;

    constructor(x: number, y: number, color: string = "red") {
        super(x, y);
        this.color = color;
    }

    public generateNewPosition(): void {
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);
    }
}
