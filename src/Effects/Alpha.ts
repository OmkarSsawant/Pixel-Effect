import MousePosition from '../utils/MousePosition';

import { Particle } from "../Components"
const MAX_PARTICLES = 1000
const TEMP_OFFSET = 90
const MOVE_FAR = -1
const MOVE_CLOSE = 1

var curMousePosition: MousePosition;
window.addEventListener('mousemove', ev => {
    curMousePosition = { x: (ev.x - (TEMP_OFFSET + 200)), y: (ev.y - TEMP_OFFSET), threshold: 100 }
})


const alpha = (ctx: CanvasRenderingContext2D, onIDChange: Function) => {
    ctx.fillStyle = 'white'
    ctx.font = '30px monospace'
    ctx.fillText('A', 0, 30)
    const word: ImageData = ctx.getImageData(0, 0, 100, 100)

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

        particles.forEach((par: Particle) => {
            par.size = 5
            par.move(curMousePosition, MOVE_FAR)
            par.draw(true)
        })

        let alpha = 1
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                let particle1 = particles[i]
                let particle2 = particles[j]

                //calculate distance between two particles
                let dx = particle2.x - particle1.x
                let dy = particle2.y - particle1.y
                let dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 25) {
                    alpha = 1 - (dist / 25)
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(255,255,255,${alpha})`
                    ctx.lineWidth = 2
                    ctx.moveTo(particle1.x, particle1.y)
                    ctx.lineTo(particle2.x, particle2.y)
                    ctx.closePath()
                    ctx.stroke()
                }
            }
        }

        let animId = requestAnimationFrame(animate)
        onIDChange(animId)
    }

    console.time("computing")
    console.log("started computing");

    init().then(_ => {
        animate()
        console.timeEnd("computing")
        console.log("started computing");

    })




}


export default alpha