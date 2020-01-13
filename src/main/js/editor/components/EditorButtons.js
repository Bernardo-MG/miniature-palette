import React from 'react';

import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

function EditorButtons({ onDelete, onReturn }) {
   let deleteButton;
   let returnButton;

   if (onDelete) {
      deleteButton = <Grid item xs={1}>
         <Fab aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
         </Fab>
      </Grid>;
   } else {
      deleteButton = null;
   }

   if (onDelete) {
      returnButton = <Grid item xs={1}>
         <Fab aria-label="delete" onClick={onReturn}>
            <ArrowBackIcon />
         </Fab>
      </Grid>;
   } else {
      returnButton = null;
   }

   return <Grid container justify="flex-end">
      {returnButton}
      <Grid item xs={1}>
         <Fab aria-label="save" type="submit">
            <SaveIcon />
         </Fab>
      </Grid>
      {deleteButton}
   </Grid>;
}

EditorButtons.propTypes = {
   onDelete: PropTypes.func,
   onReturn: PropTypes.func
};

export default EditorButtons;
