import MousePosition from './utils/MousePosition';


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
    density: number
    initX: number
    initY: number
    constructor(context: CanvasRenderingContext2D, x = Math.random() * context.canvas.width, y = Math.random() * context.canvas.height) {
        this.x = x
        this.y = y
        this.velocity = Math.random() * 3 + 1
        this.ctx = context
        this.size = Math.random() * 1.2 + 1
        this.color = 'white'
        this.posX = Math.floor(this.x)
        this.posY = Math.floor(this.y)
        this.density = Math.random() * 20 + 1
        this.speed = 0
        this.angle = 0
        this.initX = x
        this.initY = y
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
            this.ctx.arc(this.x, this.y, this.size, 1, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
        }
    }



    /* dir parameter will either be 1 or -1 to decide whether 
        the the particles should far or close
    */
    move(pos: MousePosition, dir: number = 1) {
        this.size = 3
        let dx = pos.x - this.x
        let dy = pos.y - this.y
        //hypotenuse formula
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

        let forceDirX = dx / distance;
        let forceDirY = dy / distance;
        let maxDis = pos.threshold;
        let force = (maxDis - distance) / maxDis;
        let dirX = forceDirX * force * this.density;
        let dirY = forceDirY * force * this.density;


        if (distance < maxDis) {
            this.x += dirX * dir;
            this.y += dirY * dir;
        } else {
            if (this.x !== this.initX) {
                let dx = this.x - this.initX
                this.x -= dx / 15
            }
            if (this.y !== this.initY) {
                this.y = this.initY
                this.y -= dy / 15
            }
        }

        if (this.y >= this.ctx.canvas.height) {
            this.y = this.initY
        }
        if (this.x >= this.ctx.canvas.width) {
            this.x = this.initX
        }

    }



}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Pixel {
    color: Color;
    bright: number;
}