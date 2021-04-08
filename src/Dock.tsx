import React from 'react'


const effects = ['Move Close', 'Move Far', 'Move Lined']
const Dock = (props: any) => {
    return (
        <div className="dock">
            {effects.map(e => (
                <button key={e} onClick={ev => props.onPixelEffectChange(ev.currentTarget.textContent)}>{e}</button>
            ))}
        </div>
    );
}

export default Dock