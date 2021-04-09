import MousePosition from '../utils/MousePosition';

import { Particle } from "../Components"
import cleverJoin from './common/CleverJoin'
import m from './common/Move'





const alpha = (ctx: CanvasRenderingContext2D, onIDChange: Function, text: string) => {

    //make canvas fullscreen 
    let { canvas } = ctx
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    window.addEventListener('keydown', ev => {
        if (ev.key === "Escape" || "Esc") {
            canvas.width = 800
            canvas.height = 480

        }
    })

    ctx.fillStyle = 'white'
    ctx.font = '30px monospace'
    ctx.fillText(text, 0, 30)
    let word: ImageData = ctx.getImageData(0, 0, 100, 100)

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const particles: Array<Particle> = []

    const init = () => new Promise((res, rej) => {
        for (let y = 0; y < word.height; y++) {

            for (let x = 0; x < word.width; x++) {

                let alpha = word.data[(y * 4 * word.width) + (x * 4) + 3]
                if (alpha > 128) {
                    particles.push(new Particle(ctx, x * 12, y * 12))
                }
            }
        }

        res(particles)

    })


    const animate = () => {


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        m.move(particles, m.Direction.MOVE_FAR)

        cleverJoin(ctx, particles)

        let animId = requestAnimationFrame(animate)
        onIDChange(animId)
    }

    console.time("computing")

    init().then(_ => {
        animate()
        console.timeEnd("computing")
    })




}


export default alpha