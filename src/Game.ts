import { Snake } from './Snake.js';
import { Apple } from './Apple.js';
import { Display } from './Display.js';

export class Game {
    private snake: Snake;
    private apple: Apple;
    private score: number;
    private isGameOver: boolean;

    constructor() {
        this.snake = new Snake(10, 10);
        this.apple = new Apple(5, 5);
        this.score = 0;
        this.isGameOver = false;

        // Ajouter un écouteur d'événements pour les touches du clavier
        document.addEventListener('keydown', (event) => this.changeDirection(event));
    }

    public getSnake(): Snake {
        return this.snake;
    }

    private changeDirection(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                this.snake.changeDirection('up');
                break;
            case 'ArrowDown':
                this.snake.changeDirection('down');
                break;
            case 'ArrowLeft':
                this.snake.changeDirection('left');
                break;
            case 'ArrowRight':
                this.snake.changeDirection('right');
                break;
        }
    }

    public play(display: Display): boolean {
        if (this.isGameOver === false ) {
            // Update the snake's position
            this.snake.move();
        
            // Check if the snake eats the apple
            if (this.snake.getBody()[0].x === this.apple.x && this.snake.getBody()[0].y === this.apple.y) {
                this.snake.grow();
                this.apple.generateNewPosition();
                this.score++;
            }

            // Display the apple and the snake
            display.drawRectangle(this.apple.x, this.apple.y, 'red');
            this.snake.getBody().forEach(segment => {
                display.drawRectangle(segment.x, segment.y, this.snake.getColor());
            });
            
            // Check if the snake collides with walls
            if (this.snake.detecteWallCollision() === true) {
                this.isGameOver = true;
                if (this.isGameOver === true) {
                    console.log("coucou");
                let buttonPlaceholder: HTMLElement | null = document.getElementById("playAgain");
                let button: HTMLElement = document.createElement("button");
                button.innerHTML = "Play again";
                button.onclick = () => {
                    this.snake = new Snake(10, 10);
                    this.apple = new Apple(5, 5);
                    this.score = 0;
                    this.isGameOver = false;
                    button.remove();
                    display.play(this);
                }
                if (buttonPlaceholder != null) buttonPlaceholder.appendChild(button);
            }
        }
    }
    console.log("Game over ?",this.isGameOver);
    return this.isGameOver;
}

    public getScore(): number {
        return this.score;
    }
}