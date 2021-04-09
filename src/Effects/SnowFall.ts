import { ModelImage } from '../base-64-img'
import { Particle } from '../Components'

const snowFall = function (ctx: CanvasRenderingContext2D, onIDChange: Function) {
    // _watermark(ctx)
    const MAX_PARTICLES = 1000
    const particles: Array<Particle> = []
    const modelIMG = new Image(800, 450)
    modelIMG.src = ModelImage
    modelIMG.onload = ev => {
        ctx.drawImage(modelIMG, 0, 0)
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle(ctx))
        }

        var animId: number
        const animate = () => {

            //make a layer
            ctx.globalAlpha = 0.1
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.drawImage(modelIMG, 0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.globalAlpha = 1.0

            //draw particles
            particles.forEach((par: Particle) => {
                par.update()
                par.draw(true)

            })


            animId = requestAnimationFrame(animate)
            onIDChange(animId)
        }
        animate()
    }

}


export default snowFall