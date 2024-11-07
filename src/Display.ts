// import Game from "./Game";

import { Game } from "./Game.js";

export class Display {
    private ctx: CanvasRenderingContext2D | null;
    private scale: number;
    public speed: number;
    public score: number = 0;
    public static canvasWalls: number[] = [0, 0];

    constructor(width: number, height: number, scale: number = 10, speed: number = 200) {
        this.scale = scale;
        this.speed = speed;
        const canvas = document.createElement("canvas");
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        this.ctx = canvas.getContext("2d");
        let display: HTMLElement | null = document.getElementById("display");
        if (display != null) display.appendChild(canvas);
        Display.canvasWalls = [width, height];
    }

    // public getCanvasWalls(): number[] {
    //     if (this.ctx != null) {
    //     return [
    //         this.canvasWalls[0] = this.ctx.canvas.width / this.scale,
    //         this.canvasWalls[1] = this.ctx.canvas.height / this.scale,
    //     ];
    //     }
    //     return [0, 0];
    // }

    public drawRectangle(x: number, y: number, color: string): void {
        if (this.ctx != null) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
    }

    public drawCircle(x: number, y: number, color: string): void {
        if (this.ctx != null) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(
            x * this.scale + this.scale / 2,
            y * this.scale + this.scale / 2,
            this.scale / 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
        }
    }

    public refreshScore() {
        let score: HTMLElement | null = document.getElementById("score");
        if (score != null) score.innerHTML = this.score.toString();
    }

    public play(game: Game) {
        let lastChrono: number;
        let done: boolean = false;
        let loop = (chrono: number) => {
        // console.log("hey")
        if (!lastChrono) lastChrono = chrono;
        const delta = chrono - lastChrono;

        if (delta >= this.speed) {
            if (this.ctx != null) {
            this.ctx.clearRect(
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );
            done = game.play(this);
            this.score = game.getScore();
            this.refreshScore();
            lastChrono = chrono;
            }
        }
        if (!done) requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}
