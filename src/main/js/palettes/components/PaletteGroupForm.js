import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import { useSnackbar } from 'notistack';

import PaletteEditor from 'palettes/components/PaletteEditor';

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

function PaletteGroupForm({ suggestions }) {

   const { enqueueSnackbar } = useSnackbar();

   const [name, setName] = useState('');
   const [palettes, setPalettes] = useState([]);

   function clean() {
      setName('');
      setPalettes([]);
   }

   function handleSave() {
      api.Palettes.save({ name, palettes });
      enqueueSnackbar('saved_message', { variant: 'success' });
      clean();
   }

   function handleNameChange(value) {
      setName(value);
   }

   function updatePalettes(func) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));

      func(newPalettes);

      setPalettes(newPalettes);
   }

   function handleAddPalette() {
      updatePalettes((newPalettes) => {
         const newPalette = { name: '', paints: [] };
         newPalettes.push(newPalette);
      });
   }

   function handleDeletePalette(index) {
      updatePalettes((newPalettes) => {
         newPalettes.splice(index, 1);
      });
   }

   function handleAddColor(i) {
      updatePalettes((newPalettes) => {
         newPalettes[i].paints.push({ name: '' });
      });
   }

   function handleColorChangeAt(i, index, color) {
      palettes[i].paints[index].name = color;
   }

   function handleColorDeleteAt(i, index) {
      updatePalettes((newPalettes) => {
         newPalettes[i].paints.splice(index, 1);
      });
   }

   function handlePaletteNameChange(i, value) {
      const newPalettes = JSON.parse(JSON.stringify(palettes));

      newPalettes[i].name = value;

      setPalettes(newPalettes);
   }

   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={name} label="group_name" onChange={(event) => handleNameChange(event.target.value)} />
         </Grid>
         <Grid item xs={6}>
            <SaveButton onClick={handleSave} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {palettes.map((palette, paletteIndex) => {
            return <Grid item xs={8} key={paletteIndex}>
               <PaletteEditor
                  palette={palette}
                  suggestions={suggestions}
                  onNameChange={(value) => handlePaletteNameChange(paletteIndex, value)}
                  onDelete={() => handleDeletePalette(paletteIndex)}
                  onAddColor={() => handleAddColor(paletteIndex)}
                  onColorChange={(index, value) => handleColorChangeAt(paletteIndex, index, value)}
                  onColorDelete={(index) => handleColorDeleteAt(paletteIndex, index)} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={handleAddPalette} />
         </Grid>
      </Grid>
   </Fragment>;
}

PaletteGroupForm.propTypes = {
   suggestions: PropTypes.array.isRequired
};

export default PaletteGroupForm;
