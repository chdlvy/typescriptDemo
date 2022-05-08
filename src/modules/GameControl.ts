import Snake from "./Snake";
import Food from "./food";
import ScorePanel from "./ScorePanel";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 存储蛇的移动方向
    direction: string = ''

    // 游戏是否结束
    isLive: boolean = true
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }

    // 键盘按下
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }


    // 控制蛇移动
    run() {
        let x = this.snake.X;
        let y = this.snake.Y;

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                x -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                x += 10;
                break;
            default:
                break;
        }
        // 如果蛇吃到食物
        this.checkEat(x,y)
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (e) {
            console.log('撞墙');
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }


    // 检查蛇是否会吃到食物
    checkEat(x:number,y:number) {
        if(x===this.food.X && y === this.food.Y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}
export default GameControl