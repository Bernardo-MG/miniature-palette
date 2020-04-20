import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

   function handleSelect(values, data) {
      setSelecting(false);
      values.push(data);
   }

   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
      validationSchema={SchemeSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
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
                  name="palettes"
                  render={(arrayHelpers) => (
                     <Fragment>
                        <List>
                           {values.palettes.map((palette) =>
                              <ListItem button key={palette.name}>
                                 <ListItemText primary={palette.name}/>
                              </ListItem>
                           )}
                        </List>
                        <Drawer open={selecting} onClose={() => setSelecting(false)}>
                           <List>
                              {palettes.map((palette) =>
                                 <ListItem button key={palette.name} onClick={() => handleSelect(arrayHelpers, palette)}>
                                    <ListItemText primary={palette.name}/>
                                 </ListItem>
                              )}
                           </List>
                        </Drawer>
                     </Fragment>
                  )}
               />
               <Grid item align="center" xs={12}>
                  <IconButton aria-label="add" onClick={() => setSelecting(true)}>
                     <AddCircleIcon />
                  </IconButton>
               </Grid>
            </Grid>
         </Form>
      )}
   </Formik>;
}

SchemeEditor.propTypes = {
   initialValues: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
      palettes: PropTypes.array.isRequired
   }).isRequired,
   palettes: PropTypes.array.isRequired,
   onSave: PropTypes.func.isRequired,
   onDelete: PropTypes.func,
   onReturn: PropTypes.func
};

export default SchemeEditor;
