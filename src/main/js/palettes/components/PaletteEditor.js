import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Box from '@material-ui/core/Box';
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
import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteEditor({ initialValues, onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Grid item xs={6}>
               <Paper>
                  <Grid container spacing={3} xs={11}>
                     <Grid item xs={9}>
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
                     <Grid item align="center" xs={1}>
                        <IconButton aria-label="save" type="submit">
                           <SaveIcon />
                        </IconButton>
                     </Grid>
                     <FieldArray
                        name="paints"
                        render={(arrayHelpers) => (
                           <Fragment>
                              <Grid item xs={12}>
                                 <List>
                                    {values.paints.map((paint, index) =>
                                       <ListItem key={index}>
                                          <ListItemText>
                                             <TextField
                                                fullWidth
                                                id={`paints[${index}].name`}
                                                name={`paints[${index}].name`}
                                                label="paint_name"
                                                value={paint.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
                                             />
                                          </ListItemText>
                                          <ListItemSecondaryAction>
                                             <IconButton edge="end" aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                                                <DeleteIcon />
                                             </IconButton>
                                          </ListItemSecondaryAction>
                                       </ListItem>
                                    )}
                                 </List>
                              </Grid>
                              <Grid item align="center" xs={12}>
                                 <IconButton aria-label="add" onClick={() => arrayHelpers.push({ name: '' })}>
                                    <AddCircleIcon />
                                 </IconButton>
                              </Grid>
                           </Fragment>
                        )}
                     />
                  </Grid>
               </Paper>
            </Grid>
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
   onSave: PropTypes.func.isRequired
};

export default PaletteEditor;
