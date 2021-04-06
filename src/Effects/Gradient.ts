import { ModelImage } from '../base-64-img'
import { Particle } from '../Components'
import _watermark from './WaterMark'

const gradientSnowFall = function (ctx: CanvasRenderingContext2D, onIDChange: Function) {
    _watermark(ctx)
    const MAX_PARTICLES = 500
    const particles: Array<Particle> = []
    const modelIMG = new Image(800, 450)
    modelIMG.src = ModelImage
    modelIMG.onload = ev => {

        ctx.drawImage(modelIMG, 0, 0)

        const imgData: ImageData = ctx.getImageData(0, 0, modelIMG.width, modelIMG.height)
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle(ctx))

        }


        var animId: number
        const animate = () => {

            //make a layer
            ctx.globalAlpha = 0.02
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.drawImage(modelIMG, 0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.globalAlpha = 1.0

            let gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height)
            gradient.addColorStop(0, 'orange')
            gradient.addColorStop(.5, 'white')
            gradient.addColorStop(1.0, 'green')

            ctx.fillStyle = gradient
            //draw particles
            particles.forEach((par: Particle) => {
                par.update()
                par.draw(true, true)

            })
            animId = requestAnimationFrame(animate)
            onIDChange(animId)
        }
        animate()
    }

}


export default gradientSnowFall