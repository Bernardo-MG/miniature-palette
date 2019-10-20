import React from 'react';

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import DeleteIcon from '@material-ui/icons/Delete';

function PaletteEditor({ palette, addPalette }) {

   function deleteColor(color) {
      const newPalette = { ...palette };
      newPalette.paints = newPalette.paints.filter((item) => item !== color);

      addPalette(newPalette);
   }

   return <List>
      {palette.paints.map((color) =>
         <ListItem key={color.name}>
            <ListItemText primary={color.name} secondary={color.code} />
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => deleteColor(color)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
      )}
   </List>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteEditor;
