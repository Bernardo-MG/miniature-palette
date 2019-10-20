import React from 'react';

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import PaintInput from 'palettes/components/PaintInput';

function PaletteEditorList({ palette, addPalette, suggestions, handleColorChangeAt }) {

   function addColor() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: '' }];

      addPalette(newPalette);
   }

   function deleteColor(color) {
      const newPalette = { ...palette };
      newPalette.paints = newPalette.paints.filter((item) => item !== color);

      addPalette(newPalette);
   }

   return <List>
      <IconButton onClick={addColor}>
         <AddCircleIcon />
      </IconButton>
      {palette.paints.map((color, index) =>
         <ListItem key={color.name}>
            <ListItemText>
               <PaintInput onChange={(value) => handleColorChangeAt(index, value)} addPalette={addPalette} suggestions={suggestions} />
            </ListItemText>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => deleteColor(color)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
      )}
   </List>;
}

PaletteEditorList.propTypes = {
   addPalette: PropTypes.func.isRequired,
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   suggestions: PropTypes.array.isRequired,
   handleColorChangeAt: PropTypes.func.isRequired
};

export default PaletteEditorList;
