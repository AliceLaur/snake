import { Point } from "./Point.js";
export class Apple extends Point {
    constructor(x, y, color = "red") {
        super(x, y);
        this.color = color;
    }
    generateNewPosition() {
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);
    }
}
