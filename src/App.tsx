import './App.css';
import React, { useState } from 'react';
import SketchPad from './SketchPad';
import { snowFallImage } from './base-64-img';
import { EffectButton } from './EffectButton';

function App() {

  const [effect, setEffect] = useState<string>()


  return (
    <React.Fragment>
      <EffectButton src={snowFallImage} onSelect={() => { setEffect('snow') }} />
      <SketchPad effect={effect} />
    </React.Fragment>


  );
}

export default App;
