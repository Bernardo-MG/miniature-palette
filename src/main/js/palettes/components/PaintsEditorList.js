import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

function PaintsEditorList({ data, onAdd, onRemove, onChange, onBlur, errors, touched }) {
   let list;

   if (data && data.length > 0) {
      list = <Fragment>
         <Grid item xs={12}>
            <List>
               {data.map((paint, index) =>
                  <ListItem key={index}>
                     <ListItemText>
                        <TextField
                           fullWidth
                           id={`paints[${index}].name`}
                           name={`paints[${index}].name`}
                           label="paint_name"
                           value={paint.name}
                           onChange={onChange}
                           onBlur={onBlur}
                           helperText={(errors.name && touched.name) && errors.name}
                        />
                     </ListItemText>
                     <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => onRemove(index)}>
                           <RemoveCircleOutlineIcon />
                        </IconButton>
                     </ListItemSecondaryAction>
                  </ListItem>
               )}
            </List>
         </Grid>
         <Grid item align="center" xs={12}>
            <IconButton aria-label="add" onClick={onAdd}>
               <AddCircleIcon />
            </IconButton>
         </Grid>
      </Fragment>;
   } else {
      list = <Grid item align="center" xs={12}>
         <IconButton aria-label="add" onClick={onAdd}>
            <AddCircleIcon />
         </IconButton>
      </Grid>;
   }

   return list;
}

PaintsEditorList.propTypes = {
   data: PropTypes.array.isRequired,
   onAdd: PropTypes.func.isRequired,
   onRemove: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur: PropTypes.func.isRequired,
   errors: PropTypes.array.isRequired
};

export default PaintsEditorList;
