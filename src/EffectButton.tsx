import React, { useEffect, useRef } from 'react'
import CSSPosition from './utils/Position'
export function EffectButton(props: any) {

    return (

        <div>
            <button className="effect-btn-sha"
                onClick={ev => props.onSelect()}
                style={{
                    position: "absolute", borderRadius: "15px",
                    boxShadow: "grey 5.2px 5.2px 2px",
                    filter: `${props.filter}`,
                    top: `${props.pos.top}`, left: `${props.pos.left}`, right: `${props.pos.right}`, bottom: `${props.pos.bottom}`
                }} >{props.effect} </button>
        </div>
    );
}