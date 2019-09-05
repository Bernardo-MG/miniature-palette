import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveIcon from '@material-ui/icons/Save';

import PaletteSelection from 'palette/components/PaletteSelection';

import api from 'api';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteEditor() {

   const classes = useStyles();

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

   async function savePalette() {
      await api.Palettes.save(palettes);
   }

   if (!loaded) {
      loadSuggestions();
      setLoaded(true);
   }

   return <Paper className={classes.root}>
      <IconButton onClick={savePalette}>
         <SaveIcon />
      </IconButton>
      <Grid container spacing={3}>
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
      </Grid>
   </Paper>;
}

PaletteEditor.propTypes = {};

export default PaletteEditor;
