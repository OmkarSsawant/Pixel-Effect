import { Particle, Color } from '../Components'
import { SPIDEY } from '../base-64-img'
import m from './common/Move'
import cleverJoin from './common/CleverJoin'

const imageMoveable = (ctx: CanvasRenderingContext2D, onIDChange: Function, pixelType: string, step = 8) => {
    const { canvas: { width, height } } = ctx
    const spi = new Image(800, 480)
    spi.src = SPIDEY
    const pixels: Color[][] = []
    const particles: Particle[] = []
    spi.onload = function (ev) {

        ctx.drawImage(spi, 0, 0, width, height)
        const spiImg = ctx.getImageData(0, 0, width, height)
        let { data } = spiImg

        const init = () => new Promise((res, rej) => {
            for (let y = 0; y < spiImg.height; y += step) {
                let row: Array<Color> = []
                for (let x = 0; x < spiImg.width; x += step) {
                    let r = data[(4 * y * ctx.canvas.width) + (4 * x)];
                    let g = data[(4 * y * ctx.canvas.width) + (4 * x) + 1];
                    let b = data[(4 * y * ctx.canvas.width) + (4 * x) + 2];
                    let a = data[(4 * y * ctx.canvas.width) + (4 * x) + 3];
                    let color: Color = { r, g, b, a }
                    row.push(color)

                    //also push particle
                    let par = new Particle(ctx, x, y)
                    par.color = `rgb(${r},${g},${b})`
                    par.size = 4
                    particles.push(par)
                }
                pixels.push(row)
            }
            res(particles)

        })
        //here operation is sepreated because it is assigned to be once
        var op = () => { };
        const animate = () => {
            ctx.clearRect(0, 0, width, height)

            op()
            let animId = requestAnimationFrame(animate)
            onIDChange(animId)
        }

        init().then(_ => {
            console.log(pixelType);

            switch (pixelType) {
                case 'Move Far':
                    op = () => {
                        m.move(particles, m.Direction.MOVE_FAR)
                    }
                    break;
                case 'Move Close':
                    op = () => {
                        m.move(particles, m.Direction.MOVE_CLOSE)
                    }
                    break;
                case 'Move Lined':
                    op = () => {
                        m.move(particles, m.Direction.MOVE_FAR)
                        cleverJoin(ctx, particles)
                    }
                    break;
                default:
                    break;
            }
            animate()
        })




    }

}

export default imageMoveable