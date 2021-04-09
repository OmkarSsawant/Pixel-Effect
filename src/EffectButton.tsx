import React from 'react';
export function EffectButton(props: any) {

    return (

        <div>
            <button className="effect-btn-sha"
                onClick={ev => props.onSelect()}
                style={{
                    backgroundColor: "#E8E8E9",
                    position: "absolute",
                    padding: "2vw",
                    fontFamily: "monospace",
                    fontSize: "1.2em",
                    border: "none",
                    color: "#1A1A1D",
                    borderRadius: "4px",
                    boxShadow: "#1A1A1D 4px 7px 7px",
                    top: `${props.pos.top}`, left: `${props.pos.left}`, right: `${props.pos.right}`, bottom: `${props.pos.bottom}`
                }} >{props.effect} </button>
        </div>
    );
}