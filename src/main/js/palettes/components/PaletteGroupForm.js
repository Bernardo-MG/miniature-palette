import React from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import PaletteEditor from 'palettes/components/PaletteEditor';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function AddButton({ onClick }) {
   return <IconButton onClick={onClick}>
      <NoteAddIcon />
   </IconButton>;
}

AddButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

function SaveButton() {
   return <IconButton type="submit">
      <SaveIcon />
   </IconButton>;
}

SaveButton.propTypes = {};

function PaletteGroupForm({ suggestions, onSave, onPaletteNameChange, onAddColor, onDeleteColor, onChangeColor }) {
   return <Formik
      onSubmit={onSave}
      initialValues={{
         name: '',
         palettes: []
      }}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            { /* Header */ }
            <Grid container spacing={3}>
               <Grid item xs={6}>
                  <TextField name="name" label="group_name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                     helperText={(errors.name && touched.name) && errors.name} />
               </Grid>
               <Grid item xs={6}>
                  <SaveButton />
               </Grid>
            </Grid>
            { /* List of palettes */ }
            <Grid container spacing={3}>
               <FieldArray
                  name="palettes"
                  render={(arrayHelpers) => (
                     (values.palettes.length > 0) ? (
                        values.palettes.map((palette, paletteIndex) => {
                           return <Grid item xs={8} key={paletteIndex}>
                              <PaletteEditor
                                 palette={palette}
                                 suggestions={suggestions}
                                 onNameChange={(value) => onPaletteNameChange(paletteIndex, value)}
                                 onDelete={() => arrayHelpers.remove(paletteIndex)}
                                 onAddColor={() => onAddColor(paletteIndex)}
                                 onColorChange={(index, value) => onChangeColor(paletteIndex, index, value)}
                                 onColorDelete={(index) => onDeleteColor(paletteIndex, index)} />
                           </Grid>;
                        })
                     ) : (
                        <Grid item xs={6}>
                           <AddButton onClick={() => arrayHelpers.push({ name: '', paints: [] })} />
                        </Grid>
                     )
                  )}
               />
            </Grid>
         </Form>
      )}
   </Formik>;
}

PaletteGroupForm.propTypes = {
   suggestions: PropTypes.array.isRequired,
   onSave: PropTypes.func.isRequired,
   onPaletteNameChange: PropTypes.func.isRequired,
   onAddColor: PropTypes.func.isRequired,
   onDeleteColor: PropTypes.func.isRequired,
   onChangeColor: PropTypes.func.isRequired
};

export default PaletteGroupForm;
