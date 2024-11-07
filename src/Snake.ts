import { Point } from "./Point.js";

export class Snake extends Point {
    private body: Point[];
    private direction: string;
    private color: string;

    constructor(x: number, y: number, color: string = "green") {
        super(x, y);
        this.body = [new Point(x, y)];
        this.direction = "right";
        this.color = color;
    }

    public getBody(): Point[] {
        return this.body;
    }

    public getColor(): string {
        return this.color;
    }

    public move(): void {
        // Create a new head based on the current direction
        let head = this.body[0];
        let newHead: Point;
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

    public changeDirection(newDirection: string): void {
        // Update direction with some checks to prevent reversing directly
        const opposites: { [key: string]: string } = {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
        };
        if (opposites[this.direction] !== newDirection) {
        this.direction = newDirection;
        }
    }

    public grow(): void {
        // Add a new segment at the end of the snake's body
        let tail = this.body[this.body.length - 1];
        this.body.push(new Point(tail.x, tail.y));
    }

    public detectCollision(): boolean {
        // Check if the snake's head collides with its body
        let head = this.body[0];
        for (let i = 1; i < this.body.length; i++) {
        if (head.hasSamePosition(this.body[i])) {
            return true;
        }
        }
        return false;
    }
}
