import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';
import Palette from 'paints/components/Palette';

function PaletteEditor() {

   const [palettes, setPalettes] = useState([]);

   const [paletteIndex, setPaletteIndex] = useState(-1);

   const [color, setColor] = useState('');

   function addPalette() {
      const newPalette = { name: `palette${paletteIndex}`, colors: [] };
      setPalettes([...palettes, newPalette]);
      setPaletteIndex(paletteIndex + 1);
   }

   function addColorToCurrent() {
      const newPalette = palettes[paletteIndex];
      newPalette.colors = [color, ...newPalette.colors];

      const newPalettes = [...palettes];
      newPalettes[paletteIndex] = newPalette;

      setPalettes(newPalettes);
   }

   return <React.Fragment>
      <div>
         <PaintSuggestionInput
            onChoose={setColor} />
         <Button onClick={addColorToCurrent}>
            { 'add_color' }
         </Button>
      </div>
      <div>
         <Button onClick={addPalette}>
            { 'add_palette' }
         </Button>
         {palettes.map((palette) =>
            <Palette key={palette.name} palette={palette.colors}/>
         )}
      </div>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
