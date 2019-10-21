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

function PaletteEditor({ palette, handleNameChange, handleAddColor, handleColorChangeAt, handleColorDeleteAt }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardHeader
         title={
            <TextField value={palette.name} label="palette_name" onChange={handleNameChange} />
         }
      />
      <CardContent>
         <PaletteEditorList palette={palette} suggestions={suggestions}
            handleColorChangeAt={handleColorChangeAt}
            handleColorDeleteAt={handleColorDeleteAt} />
      </CardContent>
      <CardActions>
         <IconButton aria-label="add" onClick={handleAddColor}>
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
   handleNameChange: PropTypes.func.isRequired,
   handleAddColor: PropTypes.func.isRequired,
   handleColorChangeAt: PropTypes.func.isRequired,
   handleColorDeleteAt: PropTypes.func.isRequired
};

export default PaletteEditor;
