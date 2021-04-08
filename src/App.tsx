import './App.css';
import React, { useState } from 'react';
import SketchPad from './SketchPad';
import { snowFallImage, WATER, FIRE } from './base-64-img';
import { EffectButton } from './EffectButton';
import CSSPosition from './utils/Position'
import Filter from './Filter'
import FilterContext from './utils/FilterContext'
import alpha from './alpha.svg'
function App() {

  const [effect, setEffect] = useState<string>()
  const [filter, setFilter] = useState('source-over')



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
      <FilterContext.Provider value={filter}>
        <Filter onFilterChange={(type: string) => { setFilter(type) }} />
        <img src={alpha} style={{ position: "absolute", right: "4%", top: "5%", padding: "5px", borderRadius: "4px", backgroundColor: "rgb(50, 50, 50)" }} onClick={() => { setEffect('alpha') }} />
        <EffectButton pos={snowPos} effect={'snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('snow') }} />
        <EffectButton pos={waterPos} effect={'snow-in'} filter="none" src={WATER} onSelect={() => { setEffect('snow-in') }} />
        <EffectButton pos={firePos} effect={'fire'} filter="none" src={FIRE} onSelect={() => { setEffect('fire') }} />

        <SketchPad effect={effect} />
        <EffectButton pos={springPos} effect={'spring-snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('spring-snow') }} />
        <EffectButton pos={gradPos} effect={'gradient'} filter="none" src={snowFallImage} onSelect={() => { setEffect('gradient') }} />
        <EffectButton pos={colorSnowPos} effect={'color-snow'} filter="none" src={snowFallImage} onSelect={() => { setEffect('color-snow') }} />

      </FilterContext.Provider>

    </div>


  );
}

export default App;
