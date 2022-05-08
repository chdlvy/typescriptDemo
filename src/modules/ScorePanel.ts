// 记分牌类
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    // 最大等级
    maxLevel:number
    upScore:number
    constructor(maxLevel:number=10,upScore:number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 加分
    addScore() {
        this.score++
        this.scoreEle.innerHTML = this.score+''
        if (this.score%this.upScore===0) {
            this.levelUp();
        }
    }

    // 升级
    levelUp(){
        if (this.level<=this.maxLevel) {
            this.level++
            this.levelEle.innerHTML = this.level+''
        }

    }
}

export default ScorePanel