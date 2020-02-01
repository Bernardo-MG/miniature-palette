import React, { useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import EditorButtons from 'editor/components/EditorButtons';

const SchemeSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function SchemeEditor({ initialValues, palettes, onSave, onDelete, onReturn }) {
   const [selecting, setSelecting] = useState(false);
   let view;

   function handleSelect(data) {
      setSelecting(false);
      initialValues.palettes.push(data);
   }

   if (selecting) {
      // List of palettes
      view = <List>
         {palettes.map((palette) =>
            <ListItem button key={palette.name} onClick={() => handleSelect(palette)}>
               <ListItemText primary={palette.name}/>
            </ListItem>
         )}
      </List>;
   } else {
      view = <Formik
         onSubmit={onSave}
         initialValues={initialValues}
         validationSchema={SchemeSchema}>
         {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
               <Paper>
                  <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <EditorButtons onDelete={onDelete} onReturn={onReturn} />
                     </Grid>
                     <Grid item xs={12}>
                        <Box m={2}>
                           <TextField
                              fullWidth
                              name="name"
                              label="scheme_name"
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
                           <List>
                              {values.palettes.map((palette) =>
                                 <ListItem button key={palette.name}>
                                    <ListItemText primary={palette.name}/>
                                 </ListItem>
                              )}
                           </List>
                        )}
                     />
                     <Grid item align="center" xs={12}>
                        <IconButton aria-label="add" onClick={() => setSelecting(true)}>
                           <AddCircleIcon />
                        </IconButton>
                     </Grid>
                  </Grid>
               </Paper>
            </Form>
         )}
      </Formik>;
   }

   return view;
}

SchemeEditor.propTypes = {
   initialValues: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired
   }),
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func,
   onReturn: PropTypes.func
};

export default SchemeEditor;
