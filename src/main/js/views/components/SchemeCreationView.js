import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import PaintsEditorList from 'palettes/components/PaintsEditorList';

import { Formik, Form, FieldArray } from 'formik';

import { useDispatch } from 'react-redux';

import { saveScheme } from 'api/actions';

import { usePalettes } from 'domain/hooks';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

const SchemeSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteSelectionList({ onSelect }) {

   const palettes = usePalettes();

   return <List>
      {palettes.map((palette) =>
         <ListItem button key={palette.name} onClick={() => onSelect(palette)}>
            <ListItemText primary={palette.name}/>
         </ListItem>
      )}
   </List>;
}

PaletteSelectionList.propTypes = {
   onSelect: PropTypes.func
};

function PaletteCreationDialog({ open, onClose, onSelect }) {
   const initialValues = {
      name: '',
      paints: []
   };

   return <Formik
      onSubmit={(form) => onSelect(form)}
      initialValues={initialValues}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">add_palette</DialogTitle>
            <DialogContent>
               <Form>
                  <Grid container spacing={3}>
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
                           <PaintsEditorList data={values.paints}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errors={errors}
                              touched={touched}
                              onAdd={() => arrayHelpers.push({ name: '' })}
                              onRemove={(index) => arrayHelpers.remove(index)} />
                        )}
                     />
                  </Grid>
               </Form>
            </DialogContent>
            <DialogActions>
               <Button onClick={onClose} color="primary">
                  cancel
               </Button>
               <Button onClick={onSelect} color="primary">
                  add
               </Button>
            </DialogActions>
         </Dialog>
      )}
   </Formik>;
}

PaletteCreationDialog.propTypes = {
   open: PropTypes.boolean,
   onClose: PropTypes.func,
   onSelect: PropTypes.func
};

function SchemeCreationView() {
   const [creating, setCreating] = useState(false);

   const classes = useStyles();

   const dispatch = useDispatch();

   const initialValues = {
      name: '',
      palettes: []
   };

   function handleSave(form) {
      dispatch(saveScheme(form));
   }

   function handleFinishPaletteCreation(values, data) {
      setCreating(false);
      values.push(data);
   }

   function handleShowPaletteCreation() {
      setCreating(true);
   }

   return <Box className={classes.root} width={1}>
      <Formik onSubmit={handleSave} initialValues={initialValues} validationSchema={SchemeSchema}>
         {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
               <Grid container>
                  <Grid item xs={2}>
                     <MenuList>
                        <MenuItem>
                           <ListItemIcon>
                              <SaveIcon />
                           </ListItemIcon>
                        </MenuItem>
                     </MenuList>
                  </ Grid>
                  <Grid item xs={8}>
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
                  </ Grid>
                  <Grid item xs={2}>
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
                              <Divider />
                              <List>
                                 <ListItem button aria-label="create" onClick={handleShowPaletteCreation}>
                                    <ListItemIcon>
                                       <AddIcon />
                                    </ListItemIcon>
                                 </ListItem>
                              </List>
                              <PaletteCreationDialog open={creating} onClose={() => setCreating(false)} onSelect={(palette) => handleFinishPaletteCreation(arrayHelpers, palette)} />
                           </Fragment>
                        )}
                     />
                  </ Grid>
               </ Grid>
            </Form>
         )}
      </Formik>
   </Box>;
}

SchemeCreationView.propTypes = {};

export default SchemeCreationView;
