import React, { useEffect, useRef } from 'react'
import CSSPosition from './utils/Position'
export function EffectButton(props: any) {

    return (

        <div>
            <img className="effect-btn-sha" src={props.src}
                onClick={ev => props.onSelect()} width="180" height="120"
                style={{
                    position: "absolute", borderRadius: "15px",
                    boxShadow: "grey 5.2px 5.2px 2px",
                    filter: `${props.filter}`,
                    top: `${props.pos.top}`, left: `${props.pos.left}`, right: `${props.pos.right}`, bottom: `${props.pos.bottom}`
                }} />
        </div>
    );
}