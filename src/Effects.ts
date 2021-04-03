import { ModelImage } from './base-64-img'
import { Particle, Color } from './Particle'
const _watermark = (ctx: CanvasRenderingContext2D) => {
    //watermark
    ctx.save()
    ctx.fillStyle = 'rgb(200,200,200)'
    ctx.lineCap = 'butt'
    ctx.font = '12px Courier New'
    ctx.globalAlpha = 0.6
    ctx.translate(ctx.canvas.width * .72, ctx.canvas.height * .85)
    ctx.fillText('Made By Omkar Sawant', 50, 50)
    ctx.restore()
}

export const snowFall = function (ctx: CanvasRenderingContext2D) {
    _watermark(ctx)

    const MAX_PARTICLES = 1500
    const particles: Array<Particle> = []

    const modelIMG = new Image(800, 450)
    modelIMG.src = ModelImage
    modelIMG.onload = ev => {
        ctx.drawImage(modelIMG, 0, 0)
        const imgData: ImageData = ctx.getImageData(0, 0, modelIMG.width, modelIMG.height)
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle(ctx))
        }


        const animate = () => {
            ctx.drawImage(modelIMG, 0, 0)
            ctx.globalAlpha = 0.4
            particles.forEach((par: Particle) => {
                par.update()
            })

            requestAnimationFrame(animate)
        }

        animate()
    }


}