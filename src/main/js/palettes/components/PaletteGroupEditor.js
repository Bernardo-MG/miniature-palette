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

   const [name, setName] = useState('');
   const [palettes, setPalettes] = useState([]);

   function clean() {
      setName('');
      setPalettes([]);
   }

   function handleSavePalette() {
      api.Palettes.save({ name, palettes });
      enqueueSnackbar('saved_message', { variant: 'success' });
      clean();
   }

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function handleCreatePalette() {
      const newPalettes = JSON.parse(JSON.stringify(palettes));
      const newPalette = { name: '', paints: [] };
      newPalettes.push(newPalette);

      setPalettes(newPalettes);
   }

   function handleAddColor(i) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));
      newPalettes[i].paints.push({ name: '' });

      setPalettes(newPalettes);
   }

   function handleColorChangeAt(i, index, color) {
      palettes[i].paints[index].name = color;
   }

   function handleColorDeleteAt(i, index) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));
      newPalettes[i].paints.splice(index, 1);

      setPalettes(newPalettes);
   }

   function handleGroupNameChange(i, event) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));
      newPalettes[i].name = event.target.value;

      setPalettes(newPalettes);
   }

   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={name} label="palette_name" onChange={handleNameChange} />
         </Grid>
         <Grid item xs={6}>
            <SaveButton onClick={handleSavePalette} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {palettes.map((palette, index) => {
            return <Grid item xs={8} key={index}>
               <PaletteEditor palette={palette}
                  onNameChange={(e) => handleGroupNameChange(index, e)}
                  onAddColor={() => handleAddColor(index)}
                  onColorChange={(i, c) => handleColorChangeAt(index, i, c)}
                  onColorDelete={(i) => handleColorDeleteAt(index, i)} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={handleCreatePalette} />
         </Grid>
      </Grid>
   </Fragment>;
}

PaletteGroupEditor.propTypes = {};

export default PaletteGroupEditor;
