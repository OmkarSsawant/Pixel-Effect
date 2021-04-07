

export class Particle {

    velocity: number
    y: number
    x: number
    size: number
    ctx: CanvasRenderingContext2D
    color: string
    posX: number
    posY: number
    speed: number
    angle: number
    constructor(context: CanvasRenderingContext2D, x = Math.random() * context.canvas.width, y = Math.random() * context.canvas.height) {
        this.x = x
        this.y = y
        this.velocity = Math.random() * 3
        this.ctx = context
        this.size = Math.random() * 1.2
        this.color = 'white'
        this.posX = Math.floor(this.x)
        this.posY = Math.floor(this.y)
        this.speed = 0
        this.angle = 0
    }


    update() {
        this.y += (Math.random() * this.velocity) + this.speed;
        if (this.y >= this.ctx.canvas.height) {
            this.y = 0
        }
        this.posY = Math.floor(this.y)
    }

    updateSpring() {
        this.angle++;
        let movement = (this.velocity) + this.speed
        this.y += Math.sin(this.angle) * 2 + movement;
        this.x += Math.cos(this.angle) * 2.5 + movement;

        if (this.y >= this.ctx.canvas.height) {
            this.y = 0
        }
        if (this.x >= this.ctx.canvas.width) {
            this.x = 0
        }
        this.posY = Math.floor(this.y)
        this.posX = Math.floor(this.x)
    }

    draw(shouldDraw: boolean, noColor = false) {
        if (shouldDraw) {


            this.ctx.beginPath()
            if (!noColor)
                this.ctx.fillStyle = this.color

            this.ctx.strokeStyle = 'cap'
            this.ctx.arc(this.x, this.y, 2, 1, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
        }
    }


    debug(obj: any) {
        this.ctx.save()
        this.ctx.translate(this.x, this.y)
        this.ctx.fillStyle = 'white'
        let str = `${obj}`
        this.ctx.fillText(str.substr(0, Math.min(str.length, 3)), 10, 10)
    }

}

export interface Color {
    r: number;
    g: number;
    b: number;
}