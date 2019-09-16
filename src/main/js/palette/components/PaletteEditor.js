import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';

import PaletteSelection from 'palette/components/PaletteSelection';

import api from 'api';

function AddButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <AddCircleOutlineIcon />
   </IconButton>;
}

AddButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

function SaveButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <SaveIcon />
   </IconButton>;
}

SaveButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

function PaletteEditor() {

   const [loaded, setLoaded] = useState(false);
   const [suggestions, setSuggestions] = useState([]);
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

   function savePalette() {
      api.Palettes.save(palettes);
   }

   useEffect(() => {
      if (!loaded) {
         api.Paints.all().then((paints) => setSuggestions(paints.map((paint) => paint.name)));
         setLoaded(true);
      }
   });

   return <React.Fragment>
      <SaveButton onClick={savePalette} />
      <Grid container spacing={3}>
         {palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <PaletteSelection suggestions={suggestions} palette={palette} addPalette={addPalette} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={createPalette} />
         </Grid>
      </Grid>
   </React.Fragment>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
