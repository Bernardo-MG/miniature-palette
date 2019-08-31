import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';
import Palette from 'paints/components/Palette';

function PaletteEditor() {

   const [palettes, setPalettes] = useState([]);

   const [color, setColor] = useState('');

   function addPalette() {
      setPalettes([color, ...palettes]);
   }

   return <React.Fragment>
      <div>
         <PaintSuggestionInput
            onChoose={setColor} />
         <Button onClick={addPalette}>
            { 'add' }
         </Button>
      </div>
      <Palette palette={palettes}/>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
