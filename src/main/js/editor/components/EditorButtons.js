import React from 'react';

import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

function EditorButtons({ onDelete }) {
   let deleteButton;

   if (onDelete) {
      deleteButton = <Grid item xs={1}>
         <Fab aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
         </Fab>
      </Grid>;
   } else {
      deleteButton = null;
   }

   return <Grid container justify="flex-end">
      <Grid item xs={1}>
         <Fab aria-label="save" type="submit">
            <SaveIcon />
         </Fab>
      </Grid>
      {deleteButton}
   </Grid>;
}

EditorButtons.propTypes = {
   onDelete: PropTypes.func
};

export default EditorButtons;
