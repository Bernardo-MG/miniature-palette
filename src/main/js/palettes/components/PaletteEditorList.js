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

function PaletteEditorList({ palette, suggestions, handleAddColor, handleColorChangeAt, handleColorDeleteAt }) {
   return <List>
      <IconButton onClick={handleAddColor}>
         <AddCircleIcon />
      </IconButton>
      {palette.paints.map((color, index) =>
         <ListItem key={index}>
            <ListItemText>
               <PaintInput onChange={(value) => handleColorChangeAt(index, value)} suggestions={suggestions} value={color.name} />
            </ListItemText>
            <ListItemSecondaryAction>
               <IconButton edge="end" aria-label="delete" onClick={() => handleColorDeleteAt(index)}>
                  <DeleteIcon />
               </IconButton>
            </ListItemSecondaryAction>
         </ListItem>
      )}
   </List>;
}

PaletteEditorList.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   suggestions: PropTypes.array.isRequired,
   handleAddColor: PropTypes.func.isRequired,
   handleColorChangeAt: PropTypes.func.isRequired,
   handleColorDeleteAt: PropTypes.func.isRequired
};

export default PaletteEditorList;
