import React, { useRef, useEffect } from 'react';
import snowFall from './Effects/SnowFall';
import snowIn from './Effects/SnowFall_In';
import snakkyDraw from './Effects/SnakkyDraw';
import fire from './Effects/Fire';
import gradientSnowFall from './Effects/Gradient';
function SketchPad(props: any) {

    let cvs = useRef<HTMLCanvasElement>(null)
    let animId = useRef<number>()

    useEffect(() => {
        // Each time RAF called returns new reqestId:number 
        const onReqChange = (req: number) => {
            animId.current = req
        }
        if (animId.current !== undefined) {
            cancelAnimationFrame(animId.current)
        }
        if (cvs.current != null) {
            let cnvs: HTMLCanvasElement = cvs.current!!
            let ctx = cnvs.getContext('2d')!!
            ctx.clearRect(0, 0, cnvs.width, cnvs.height)
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
                default:
                    break;
            }


        }
    }, [props.effect])



    return (
        <React.Fragment>
            <div style={{ width: "100vw", height: "100vh", background: "linear-gradient(#1a1a1c, #44444d)" }}>

                <canvas ref={cvs} width="800" height="480" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "#1a1a1c 5px 7px 10px" }} />
            </div>
        </React.Fragment>
    );
}

























export default SketchPad