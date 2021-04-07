import './App.css';
import React, { useState } from 'react';
import SketchPad from './SketchPad';
import { snowFallImage, WATER, FIRE } from './base-64-img';
import { EffectButton } from './EffectButton';
import CSSPosition from './utils/Position'
import Filter from './Filter'

function App() {

  const [effect, setEffect] = useState<string>()

  //TODO:create Filter Context and Acces from Childs

  let snowPos: CSSPosition = {
    "top": "20%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }


  let waterPos: CSSPosition = {
    "top": "40%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }

  let springPos: CSSPosition = {
    "top": "20%",
    "left": "82%",
    "bottom": "",
    "right": "",
  }

  let firePos: CSSPosition = {
    "top": "60%",
    "left": "5%",
    "bottom": "",
    "right": "",
  }


  let gradPos: CSSPosition = {
    "top": "40%",
    "left": "82%",
    "bottom": "",
    "right": "",
  }
  let colorSnowPos: CSSPosition = {
    "top": "60%",
    "left": "82%",
    "bottom": "",
    "right": "",
  }
  return (
    <div className="content">

      <Filter onFilterChange={(type: any) => { console.log('clicked', type) }} />

      <EffectButton pos={snowPos} effect={'snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('snow') }} />
      <EffectButton pos={waterPos} effect={'snow-in'} filter="none" src={WATER} onSelect={() => { setEffect('snow-in') }} />
      <EffectButton pos={firePos} effect={'fire'} filter="none" src={FIRE} onSelect={() => { setEffect('fire') }} />

      <SketchPad effect={effect} />
      <EffectButton pos={springPos} effect={'spring-snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('spring-snow') }} />
      <EffectButton pos={gradPos} effect={'gradient'} filter="none" src={snowFallImage} onSelect={() => { setEffect('gradient') }} />
      <EffectButton pos={colorSnowPos} effect={'color-snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('color-snow') }} />

    </div>


  );
}

export default App;
