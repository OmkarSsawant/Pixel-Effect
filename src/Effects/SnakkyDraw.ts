import _watermark from './WaterMark'
import { CYBERPUNK } from '../base-64-img'
import { Particle, Color } from '../Components'

interface Pixel {
    color: Color;
    bright: number;
}

const snakkyDraw = function (ctx: CanvasRenderingContext2D, onIDChange: Function) {
    // _watermark(ctx)
    const MAX_PARTICLES = 500
    const particles: Array<Particle> = []
    const modelIMG = new Image(800, 480)
    const brightness: Array<Array<Pixel>> = []
    modelIMG.src = CYBERPUNK
    modelIMG.onload = ev => {

        ctx.drawImage(modelIMG, 0, 0)



        const imgData: ImageData = ctx.getImageData(0, 0, modelIMG.width, modelIMG.height)
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle(ctx))
            particles[i].size = 7

        }

        const calcBrightness = async () => {
            console.time('brightness Calculation');

            const relativeBrightness = (r: number, g: number, b: number): number => {
                return (Math.sqrt(0.299 * Math.pow(r, 2) + 0.587 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2)));
            }

            for (let y = 0; y < modelIMG.height; y++) {
                let row: Array<Pixel> = []
                for (let x = 0; x < modelIMG.width; x++) {
                    let r = imgData.data[(4 * y * ctx.canvas.width) + (4 * x)];
                    let g = imgData.data[(4 * y * ctx.canvas.width) + (4 * x) + 1];
                    let b = imgData.data[(4 * y * ctx.canvas.width) + (4 * x) + 2];
                    let alpha = relativeBrightness(r, g, b)
                    let color: Color = { r, g, b }
                    row.push({ color, "bright": alpha })


                }
                brightness.push(row)

            }

            ctx.clearRect(0, 0, modelIMG.width, modelIMG.height)
            console.timeEnd('brightness Calculation')
        }

        calcBrightness()

        var animId: number
        const animate = () => {

            ctx.globalAlpha = 1.0



            particles.forEach((par: Particle) => {
                const releaseParticle = () => {
                    par.updateSpring()
                    if (brightness[par.posY] && brightness[par.posY][par.posX]) {
                        let a = brightness[par.posY][par.posX]
                        let { bright, color: { r, g, b } } = a
                        // let grey = r + g + b / 3
                        par.color = `rgba(${r},${g},${b},100)`
                        par.draw(bright > 0)
                    }
                }
                releaseParticle()
                releaseParticle()




            })
            animId = requestAnimationFrame(animate)
            onIDChange(animId)
        }
        animate()
    }

}


export default snakkyDraw