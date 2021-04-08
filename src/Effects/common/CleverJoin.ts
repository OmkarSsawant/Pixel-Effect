import { Particle } from "../../Components"

const cleverJoin = (ctx: CanvasRenderingContext2D, particles: Array<Particle>) => {
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

}

export default cleverJoin