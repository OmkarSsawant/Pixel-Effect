import MousePosition from "../../utils/MousePosition";
import { Particle } from "../../Components";
const TEMP_OFFSET = 90


enum Direction {
    MOVE_CLOSE,
    MOVE_FAR
}

var curMousePosition: MousePosition;
window.addEventListener('mousemove', ev => {
    curMousePosition = { x: (ev.x - (TEMP_OFFSET + 200)), y: (ev.y - TEMP_OFFSET), threshold: 100 }
})

const move = async (particles: Array<Particle>, dir: Direction) => {
    let mDir = dir === Direction.MOVE_FAR ? -1 : 1
    return new Promise((res, rej) => {
        particles.forEach((par: Particle) => {
            par.move(curMousePosition, mDir)
            par.draw(true)

        })
        res(null)
    })


}
const EXPORTS = { move, Direction }

export default EXPORTS