import React, { useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form } from 'formik';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import PaletteList from 'palettes/components/PaletteList';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteGroupEditor({ initialValues, onSave, palettes }) {
   const [choosingPalette, setChoosingPalette] = useState(false);
   let view;

   if (choosingPalette) {
      view = <PaletteList data={palettes} onEdit={() => 'placeholder'} />;
   } else {
      view = <Formik
         onSubmit={onSave}
         initialValues={initialValues}
         validationSchema={PaletteSchema}>
         {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
               <Paper>
                  <Grid container spacing={3}>
                     <Grid item xs={10}>
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
                        <Fab aria-label="save" type="submit">
                           <SaveIcon />
                        </Fab>
                     </Grid>
                     <Grid item align="center" xs={1}>
                        <Fab aria-label="save">
                           <DeleteIcon />
                        </Fab>
                     </Grid>
                     <Grid item align="center" xs={12}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                           <Button aria-label="add" onClick={() => setChoosingPalette(true)}>add_existing</Button>
                           <Button aria-label="add" onClick={() => setChoosingPalette(true)}>add_new</Button>
                        </ButtonGroup>
                     </Grid>
                  </Grid>
               </Paper>
            </Form>
         )}
      </Formik>;
   }

   return view;
}

PaletteGroupEditor.propTypes = {
   initialValues: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired
   }),
   onSave: PropTypes.func.isRequired,
   palettes: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         name: PropTypes.string.isRequired,
         paints: PropTypes.arrayOf(
            PropTypes.shape({
               id: PropTypes.number.isRequired,
               name: PropTypes.string.isRequired
            })
         ).isRequired
      })
   ).isRequired
};

export default PaletteGroupEditor;
