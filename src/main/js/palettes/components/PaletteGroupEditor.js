import React from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteGroupEditor({ initialValues, onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Paper>
               <Grid container spacing={3} xs={11}>
                  <Grid item xs={9}>
                     <Box m={2}>
                        <TextField
                           fullWidth
                           name="name"
                           label="palette_group_name"
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
               </Grid>
            </Paper>
         </Form>
      )}
   </Formik>;
}

PaletteGroupEditor.propTypes = {
   initialValues: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired
   }),
   onSave: PropTypes.func.isRequired
};

export default PaletteGroupEditor;
