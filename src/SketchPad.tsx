import React, { useRef, useEffect, useContext, useState } from 'react';
import snowFall from './Effects/SnowFall';
import snowIn from './Effects/SnowFall_In';
import snakkyDraw from './Effects/SnakkyDraw';
import fire from './Effects/Fire';
import gradientSnowFall from './Effects/Gradient';
import coloredSnow from './Effects/SnowColor';
import FilterContext from './utils/FilterContext';
import alpha from './Effects/Alpha';
import imageMoveable from "./Effects/ImageMovable";
import Dock from './Dock'
function SketchPad(props: any) {

    const cvs = useRef<HTMLCanvasElement>(null)
    const animId = useRef<number>()
    const filter = useContext<string>(FilterContext)
    const [pixEffect, setPixEffect] = useState("Move Far")


    useEffect(() => {
        //Note: Each time RAF called returns new reqestId:number 
        const onReqChange = (req: number) => {
            animId.current = req
        }
        if (animId.current !== undefined) {
            cancelAnimationFrame(animId.current)
        }
        if (cvs.current != null) {
            let cnvs: HTMLCanvasElement = cvs.current!!
            let ctx = cnvs.getContext('2d')!!

            ctx.restore()
            ctx.save()





            ctx.clearRect(0, 0, cnvs.width, cnvs.height)

            ctx.globalCompositeOperation = filter

            if (props.effect !== "alpha") {
                ctx.canvas.width = 800
                ctx.canvas.height = 480
            }
            switch (props.effect) {
                case 'snow':
                    snowFall(ctx, onReqChange);
                    break;
                case 'snow-in':
                    snowIn(ctx, onReqChange)
                    break;
                case 'spring-snow':
                    snakkyDraw(ctx, onReqChange)
                    break;
                case 'fire':
                    fire(ctx, onReqChange)
                    break;
                case 'gradient':
                    gradientSnowFall(ctx, onReqChange)
                    break;
                case 'color-snow':
                    coloredSnow(ctx, onReqChange)
                    break;
                case 'alpha':
                    const name = window.prompt('Enter Text Max [Max Char 5]', 'OMKAR') ?? 'Omkar'
                    alpha(ctx, onReqChange, name)
                    break;
                case 'img-mov':
                    imageMoveable(ctx, onReqChange, pixEffect, pixEffect === "Move Lined" ? 16 : 8)
                    break;
                default:
                    break;
            }




        }
    }, [props.effect, filter, pixEffect])



    return (
        <React.Fragment>
            <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(360deg,#1a1a1c, #44444d)" }}>

                <canvas ref={cvs} width="800" height="480" style={{ backgroundColor: "black", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "#1a1a1c 5px 7px 10px" }} />
            </div>
            <Dock onPixelEffectChange={(pe: any) => {
                setPixEffect(pe as string)
            }} />
        </React.Fragment>
    );
}



























export default SketchPad