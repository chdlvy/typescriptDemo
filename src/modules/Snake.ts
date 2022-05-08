class Snake {
    // 蛇头元素
    head:HTMLElement;
    // 蛇身
    bodies: HTMLCollection

    element: HTMLElement
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div');

    }

    // 获取蛇坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }
    
    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇坐标（蛇头坐标）
    set X(value:number){
        if (this.X===value) {
            return
        }
        if(value<0||value>290) {
            throw new Error('撞墙')
        }
        this.head.style.left = value+'px'
        this.moveBody();
        this.checkHeadBody()
    }
    set Y(value:number){
        if (this.Y===value) {
            return
        }
        if(value<0||value>290) {
            throw new Error('撞墙')
       }
        this.head.style.top = value+'px'
        this.moveBody();
        this.checkHeadBody()
    }

    addBody() {
        // 向element中添加一个div
        this.element.appendChild(document.createElement('div'))
    }

    moveBody() {
       for(let i = this.bodies.length-1;i>0;i--) {
           let x = (this.bodies[i-1] as HTMLElement).offsetLeft;
           let y = (this.bodies[i-1] as HTMLElement).offsetTop;

           (this.bodies[i] as HTMLElement).style.left = x+'px';
           (this.bodies[i] as HTMLElement).style.top = y+'px';
           
       }
    }
    checkHeadBody() {
        for(let i =1;i<this.bodies.length;i++) {
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y===bd.offsetTop) {
                throw new Error('撞到自己')
            }
        }
    }
}
export default Snake