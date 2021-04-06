import './App.css';
import React, { useState } from 'react';
import SketchPad from './SketchPad';
import { snowFallImage, WATER, FIRE } from './base-64-img';
import { EffectButton } from './EffectButton';
import CSSPosition from './utils/Position'


function App() {

  const [effect, setEffect] = useState<string>()

  let snowPos: CSSPosition = {
    "top": "10%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }


  let waterPos: CSSPosition = {
    "top": "30%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }

  let springPos: CSSPosition = {
    "top": "10%",
    "left": "82%",
    "bottom": "",
    "right": "",
  }

  let firePos: CSSPosition = {
    "top": "50%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }


  let gradPos: CSSPosition = {
    "top": "30%",
    "left": "82%",
    "bottom": "",
    "right": "",
  }
  return (
    <div className="content">
      <EffectButton pos={snowPos} filter="none" src={snowFallImage} onSelect={() => { setEffect('snow') }} />
      <EffectButton pos={waterPos} filter="none" src={WATER} onSelect={() => { setEffect('snow-in') }} />
      <EffectButton pos={firePos} filter="none" src={FIRE} onSelect={() => { setEffect('fire') }} />

      <SketchPad effect={effect} />
      <EffectButton pos={springPos} filter="none" src={snowFallImage} onSelect={() => { setEffect('spring-snow') }} />
      <EffectButton pos={gradPos} filter="none" src={snowFallImage} onSelect={() => { setEffect('gradient') }} />

    </div>


  );
}

export default App;
