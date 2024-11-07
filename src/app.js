import { Display } from "./Display.js";
import { Game } from "./Game.js";
const game = new Game(); // width, height, scale
const display = new Display(50, 50);
window.onload = () => {
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                game.getSnake().changeDirection("up");
                break;
            case "ArrowDown":
                game.getSnake().changeDirection("down");
                break;
            case "ArrowLeft":
                game.getSnake().changeDirection("left");
                break;
            case "ArrowRight":
                game.getSnake().changeDirection("right");
                break;
        }
    });
    /*
    Interactions with your game if needed
    */
    display.play(game);
};
