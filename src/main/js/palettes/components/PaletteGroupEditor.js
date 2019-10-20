import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import { useSnackbar } from 'notistack';

import PaletteEditor from 'palettes/containers/PaletteEditor';

import api from 'api';

function AddButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <NoteAddIcon />
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

function PaletteGroupEditor() {

   const { enqueueSnackbar } = useSnackbar();

   const [name, setName] = useState('palette');
   const [palettes, setPalettes] = useState([]);
   const [paletteIndex, setPaletteIndex] = useState(0);

   function clean() {
      setName('');
      setPalettes([]);
      setPaletteIndex(0);
   }

   function createPalette() {
      const newPalette = { name: `palette${paletteIndex}`, paints: [] };
      setPalettes([...palettes, newPalette]);
      setPaletteIndex(paletteIndex + 1);
   }

   function handleAddPalette(palette) {
      let index;
      palettes.find((pal, i) => {
         index = i;
         return pal.name === palette.name;
      });
      const newPalettes = [...palettes];
      newPalettes[index] = palette;

      setPalettes(newPalettes);
   }

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function handleSavePalette() {
      api.Palettes.save({ name, palettes });
      enqueueSnackbar('saved_message', { variant: 'success' });
      clean();
   }

   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={name} onChange={handleNameChange} />
         </Grid>
         <Grid item xs={6}>
            <SaveButton onClick={handleSavePalette} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {palettes.map((palette) => {
            return <Grid item xs={12} key={palette.name}>
               <PaletteEditor palette={palette} addPalette={handleAddPalette} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={createPalette} />
         </Grid>
      </Grid>
   </Fragment>;
}

PaletteGroupEditor.propTypes = {};

export default PaletteGroupEditor;
