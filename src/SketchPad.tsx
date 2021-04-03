import React, { useRef, useEffect } from 'react';
import Logo from './logo.svg';
import { snowFall } from './Effects';
function SketchPad(props: any) {

    let cvs = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (cvs.current != null) {
            let ctx: HTMLCanvasElement = cvs.current!!
            start(ctx.getContext('2d')!!)
        }
    }, [props.effect])


    const start = (ctx: CanvasRenderingContext2D) => {
        switch (props.effect) {
            case 'snow':
                snowFall(ctx)
                break;

            default:
                break;
        }

    }


    return (
        <React.Fragment>
            <canvas ref={cvs} width="800" height="480" style={{ backgroundColor: "royalblue", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", boxShadow: "grey 5px 7px 10px" }} />
        </React.Fragment>
    );
}

























export default SketchPad