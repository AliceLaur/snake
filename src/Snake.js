import { Point } from "./Point.js";
import { Display } from "./Display.js";
export class Snake extends Point {
    constructor(x, y, color = "green") {
        super(x, y);
        this.body = [new Point(x, y), new Point(x, y), new Point(x, y)];
        this.direction = "right";
        this.color = color;
    }
    getBody() {
        return this.body;
    }
    getColor() {
        return this.color;
    }
    move() {
        // Create a new head based on the current direction
        let head = this.body[0];
        let newHead;
        switch (this.direction) {
            case "up":
                newHead = new Point(head.x, head.y - 1);
                break;
            case "down":
                newHead = new Point(head.x, head.y + 1);
                break;
            case "left":
                newHead = new Point(head.x - 1, head.y);
                break;
            case "right":
                newHead = new Point(head.x + 1, head.y);
                break;
            default:
                newHead = new Point(head.x, head.y);
        }
        // Add the new head to the body
        this.body.unshift(newHead);
        // Remove the last segment to maintain the length
        this.body.pop();
    }
    changeDirection(newDirection) {
        // Update direction if it's not the opposite
        const opposites = {
            up: "down",
            down: "up",
            left: "right",
            right: "left",
        };
        if (opposites[this.direction] !== newDirection) {
            this.direction = newDirection;
        }
    }
    grow() {
        // Add a new segment at the end of the snake's body
        let tail = this.body[this.body.length - 1];
        this.body.push(new Point(tail.x, tail.y));
    }
    detectCollision() {
        // Check if the snake's head collides with its body
        let head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
            if (head.hasSamePosition(this.body[i])) {
                console.log("Collision :", true);
                return true;
            }
        }
        console.log("Collision :", false);
        return false;
    }
    detecteWallCollision() {
        let head = this.body[0];
        if (head.x < 0 || head.x >= Display.canvasWalls[0] || head.y < 0 || head.y >= Display.canvasWalls[1]) {
            return true;
        }
        return false;
    }
}
