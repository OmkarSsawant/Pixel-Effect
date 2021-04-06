import _watermark from './WaterMark'
import { CYBERPUNK } from '../base-64-img'
import { Particle, Color } from '../Components'

interface Pixel {
    color: Color;
    bright: number;
}

const FIRE_COLORS = ['#821e06', '#d33903', '#e8730a', '#f5bc2d']

const FIRE = function (ctx: CanvasRenderingContext2D, onIDChange: Function) {
    _watermark(ctx)
    const MAX_PARTICLES = 1500
    const particles: Array<Particle> = []
    const modelIMG = new Image(800, 480)
    const brightness: Array<Array<Pixel>> = []
    modelIMG.src = CYBERPUNK
    modelIMG.onload = ev => {

        ctx.drawImage(modelIMG, 0, 0)



        const imgData: ImageData = ctx.getImageData(0, 0, modelIMG.width, modelIMG.height)
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(new Particle(ctx))

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

            console.timeEnd('brightness Calculation')
        }

        calcBrightness()
        var animId: number
        const animate = () => {
            ctx.globalAlpha = 0.04
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            ctx.strokeStyle = 'anti-Alias'
            particles.forEach((par: Particle) => {
                par.updateSpring(1.2)
                if (brightness[par.posY] && brightness[par.posY][par.posX]) {
                    let a = brightness[par.posY][par.posX]
                    let { bright } = a
                    const fireyColor = (): string => {
                        if (bright >= 170) {
                            par.color = FIRE_COLORS[0]
                        }
                        else if (bright >= 85) {
                            par.color = FIRE_COLORS[1]
                        } else {
                            par.color = FIRE_COLORS[2]
                        }

                        return FIRE_COLORS[Math.floor(Math.random() * (FIRE_COLORS.length - 1))]
                    }

                    par.color = fireyColor()
                    par.draw(bright > 0)
                }

            })

            animId = requestAnimationFrame(animate)
            onIDChange(animId)
        }
        animate()
    }

}


export default FIRE