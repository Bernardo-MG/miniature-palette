import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaintsList({ data, onAdd, onRemove, onChange, onBlur, errors, touched }) {
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

function PaletteEditor({ initialValues, onSave, onDelete }) {
   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Paper>
               <Grid container spacing={3}>
                  <Grid item xs={12}>
                     <Grid container justify="flex-end" spacing={3}>
                        <Fab aria-label="save" type="submit">
                           <SaveIcon />
                        </Fab>
                        <Fab aria-label="delete" onClick={() => onDelete(values)}>
                           <DeleteIcon />
                        </Fab>
                     </Grid>
                  </Grid>
                  <Grid item xs={12}>
                     <Box m={2}>
                        <TextField
                           fullWidth
                           name="name"
                           label="palette_name"
                           value={values.name}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           helperText={(errors.name && touched.name) && errors.name}
                           margin="normal"
                        />
                     </Box>
                  </Grid>
                  <FieldArray
                     name="paints"
                     render={(arrayHelpers) => (
                        <PaintsList data={values.paints}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           errors={errors}
                           touched={touched}
                           onAdd={() => arrayHelpers.push({ name: '' })}
                           onRemove={(index) => arrayHelpers.remove(index)} />
                     )}
                  />
               </Grid>
            </Paper>
         </Form>
      )}
   </Formik>;
}

PaletteEditor.propTypes = {
   initialValues: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      paints: PropTypes.array.isRequired
   }),
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func
};

export default PaletteEditor;
