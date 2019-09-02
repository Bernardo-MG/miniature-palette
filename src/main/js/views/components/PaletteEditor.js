import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import PaletteSelection from 'palette/components/PaletteSelection';

function PaletteEditor() {

   const [palettes, setPalettes] = useState([]);

   const [paletteIndex, setPaletteIndex] = useState(0);

   function createPalette() {
      const newPalette = { name: `palette${paletteIndex}`, colors: [] };
      setPalettes([...palettes, newPalette]);
      setPaletteIndex(paletteIndex + 1);
   }

   function addPalette(palette) {
      let index;
      palettes.find((pal, i) => {
         index = i;
         return pal.name === palette.name;
      });
      const newPalettes = [...palettes];
      newPalettes[index] = palette;

      setPalettes(newPalettes);
   }

   return <React.Fragment>
      <div>
         {palettes.map((palette) =>
            <PaletteSelection key={palette.name} palette={palette} addPalette={addPalette} />
         )}
         <IconButton onClick={createPalette}>
            <AddCircleOutlineIcon />
         </IconButton>
      </div>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
