import React, { useState } from 'react';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import PaletteSelection from 'palette/components/PaletteSelection';

import api from 'api';

function PaletteEditor() {

   const [loaded, setLoaded] = useState(false);
   const [suggestions, setSuggestions] = useState([]);
   const [palettes, setPalettes] = useState([]);
   const [paletteIndex, setPaletteIndex] = useState(0);

   async function loadSuggestions() {
      const read = await api.Paints.all();
      setSuggestions(read.map((paint) => paint.name));
   }

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

   if (!loaded) {
      loadSuggestions();
      setLoaded(true);
   }

   return <Grid container spacing={3}>
      {palettes.map((palette) =>
         <Grid item xs={12} key={palette.name}>
            <PaletteSelection suggestions={suggestions} palette={palette} addPalette={addPalette} />
            <Divider />
         </Grid>
      )}
      <Grid item xs={6}>
         <IconButton onClick={createPalette}>
            <AddCircleOutlineIcon />
         </IconButton>
      </Grid>
   </Grid>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
