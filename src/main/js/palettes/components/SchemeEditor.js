import React from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import EditorButtons from 'editor/components/EditorButtons';

const SchemeSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function SchemeEditor({ initialValues, onSave, onDelete, onReturn }) {
   return <Formik
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
               </Grid>
            </Paper>
         </Form>
      )}
   </Formik>;
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
