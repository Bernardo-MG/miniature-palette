import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import PaletteEditorList from 'palettes/components/PaletteEditorList';

import { useSuggestions } from 'suggestions';

function PaletteEditor({ palette, onNameChange, onAddColor, onColorChange, onColorDelete }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardHeader
         title={
            <TextField value={palette.name} label="palette_name" onChange={onNameChange} />
         }
      />
      <CardContent>
         <PaletteEditorList palette={palette} suggestions={suggestions}
            onColorChange={onColorChange}
            onColorDelete={onColorDelete} />
      </CardContent>
      <CardActions>
         <IconButton aria-label="add" onClick={onAddColor}>
            <AddCircleIcon />
         </IconButton>
      </CardActions>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      name: PropTypes.string.isRequired,
      paints: PropTypes.array.isRequired
   }).isRequired,
   onNameChange: PropTypes.func.isRequired,
   onAddColor: PropTypes.func.isRequired,
   onColorChange: PropTypes.func.isRequired,
   onColorDelete: PropTypes.func.isRequired
};

export default PaletteEditor;
