import React from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteGroupNameForm({ onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={{
         name: ''
      }}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Grid container spacing={3}>
               <Grid item xs={6}>
                  <TextField name="name" label="group_name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                     helperText={(errors.name && touched.name) && errors.name} />
               </Grid>
               <Grid item xs={6}>
                  <IconButton type="submit">
                     <SaveIcon />
                  </IconButton>
               </Grid>
            </Grid>
         </Form>
      )}
   </Formik>;
}

PaletteGroupNameForm.propTypes = {
   onSave: PropTypes.func.isRequired
};

export default PaletteGroupNameForm;
