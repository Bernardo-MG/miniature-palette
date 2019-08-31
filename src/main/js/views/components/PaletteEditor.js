import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';
import Palette from 'paints/components/Palette';

function PaletteEditor() {

   const [palettes, setPalettes] = useState([{ colors: [] }]);

   // const [paletteIndex, setPaletteIndex] = useState(-1);

   const [color, setColor] = useState('');

   // function addPalette() {
   //    const original = palettes[index];
   //    const palette = { name: 'palette'+paletteIndex, colors: [] };
   //    setPalettes([...palettes, palette]);
   //    setPaletteIndex(paletteIndex + 1);
   // }

   function addColorToCurrent() {
      const index = 0;
      const newPalette = palettes[0];
      newPalette.colors = [color, ...newPalette.colors];
      // const palette = { name: 'name', ...original, colors: [color, ...original.colors] };
      const newPalettes = [...palettes];
      newPalettes[index] = newPalette;
      setPalettes(newPalettes);
   }

   return <React.Fragment>
      <div>
         <PaintSuggestionInput
            onChoose={setColor} />
         <Button onClick={addColorToCurrent}>
            { 'add' }
         </Button>
      </div>
      {palettes.map((palette) =>
         <Palette key={palette.name} palette={palette.colors}/>
      )}
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
