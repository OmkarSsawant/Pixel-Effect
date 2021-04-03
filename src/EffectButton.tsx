import React from 'react'


export function EffectButton(props: any) {

    return (
        <div>
            <img className="effect-btn-sha" src={props.src} onClick={ev => props.onSelect()} width="180" height="120" style={{ transform: "translate(20%,20%)", borderRadius: "15px", boxShadow: "grey 5.2px 5.2px 2px" }} />
            <h4>{props.text}</h4>

        </div>
    );
}