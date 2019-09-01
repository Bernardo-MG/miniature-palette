import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import PaletteSelection from 'palette/components/PaletteSelection';

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
         <Button onClick={addPalette}>
            { 'add_palette' }
         </Button>
         {palettes.map((palette) =>
            <PaletteSelection key={palette.name} palette={palette} onClick={addColorToCurrent} onChoose={setColor} />
         )}
      </div>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
