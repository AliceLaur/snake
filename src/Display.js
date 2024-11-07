// import Game from "./Game";
export class Display {
    constructor(width, height, scale = 10, speed = 200) {
        this.score = 0;
        this.scale = scale;
        this.speed = speed;
        const canvas = document.createElement("canvas");
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        this.ctx = canvas.getContext("2d");
        let display = document.getElementById("display");
        if (display != null)
            display.appendChild(canvas);
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
    drawRectangle(x, y, color) {
        if (this.ctx != null) {
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
    }
    drawCircle(x, y, color) {
        if (this.ctx != null) {
            this.ctx.beginPath();
            this.ctx.fillStyle = color;
            this.ctx.arc(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, this.scale / 2, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
    refreshScore() {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = this.score.toString();
    }
    play(game) {
        let lastChrono;
        let done = false;
        let loop = (chrono) => {
            // console.log("hey")
            if (!lastChrono)
                lastChrono = chrono;
            const delta = chrono - lastChrono;
            if (delta >= this.speed) {
                if (this.ctx != null) {
                    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                    done = game.play(this);
                    this.score = game.getScore();
                    this.refreshScore();
                    lastChrono = chrono;
                }
            }
            if (!done)
                requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
Display.canvasWalls = [0, 0];
