

export class Particle {

    velocity: number
    y: number
    x: number
    size: number
    ctx: CanvasRenderingContext2D
    color: string
    posX: number
    posY: number
    constructor(context: CanvasRenderingContext2D) {
        this.x = Math.random() * context.canvas.width
        this.y = 0
        this.velocity = Math.random() * 3 + 7.2
        this.ctx = context
        this.size = Math.random() * 3 + 1.5
        this.color = 'white'
        this.posX = Math.floor(this.x)
        this.posY = Math.floor(this.y)
    }


    update() {
        this.y += Math.random() * this.velocity + 2;
        if (this.y >= this.ctx.canvas.height) {
            this.y = 0
            this.x = Math.random() * this.ctx.canvas.width
        }

        this.__invalidiate()
    }

    __invalidiate() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
    }
}

export interface Color {
    r: number;
    g: number;
    b: number;
}