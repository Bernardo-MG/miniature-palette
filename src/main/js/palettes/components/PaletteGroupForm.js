import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import PaletteEditor from 'palettes/components/PaletteEditor';

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

function PaletteGroupForm({ name, palettes, suggestions, onSave, onNameChange, onPaletteNameChange, onAddPalette, onDeletePalette, onAddColor, onDeleteColor, onChangeColor }) {
   return <Fragment>
      <Grid container spacing={3}>
         <Grid item xs={6}>
            <TextField value={name} label="group_name" onChange={(event) => onNameChange(event.target.value)} />
         </Grid>
         <Grid item xs={6}>
            <SaveButton onClick={onSave} />
         </Grid>
      </Grid>
      <Grid container spacing={3}>
         {palettes.map((palette, paletteIndex) => {
            return <Grid item xs={8} key={paletteIndex}>
               <PaletteEditor
                  palette={palette}
                  suggestions={suggestions}
                  onNameChange={(value) => onPaletteNameChange(paletteIndex, value)}
                  onDelete={() => onDeletePalette(paletteIndex)}
                  onAddColor={() => onAddColor(paletteIndex)}
                  onColorChange={(index, value) => onChangeColor(paletteIndex, index, value)}
                  onColorDelete={(index) => onDeleteColor(paletteIndex, index)} />
            </Grid>;
         }
         )}
         <Grid item xs={6}>
            <AddButton onClick={onAddPalette} />
         </Grid>
      </Grid>
   </Fragment>;
}

PaletteGroupForm.propTypes = {
   name: PropTypes.string.isRequired,
   palettes: PropTypes.array.isRequired,
   suggestions: PropTypes.array.isRequired,
   onSave: PropTypes.func.isRequired,
   onNameChange: PropTypes.func.isRequired,
   onPaletteNameChange: PropTypes.func.isRequired,
   onAddPalette: PropTypes.func.isRequired,
   onDeletePalette: PropTypes.func.isRequired,
   onAddColor: PropTypes.func.isRequired,
   onDeleteColor: PropTypes.func.isRequired,
   onChangeColor: PropTypes.func.isRequired
};

export default PaletteGroupForm;
