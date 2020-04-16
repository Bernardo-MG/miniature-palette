import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

import PaletteCreateForm from 'palettes/containers/PaletteCreateForm';

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

function SchemeCreationView() {
   const [selecting, setSelecting] = useState(false);
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

   function handleSelect(values, data) {
      setSelecting(false);
      values.push(data);
   }

   function handleFinishPaletteCreation() {
      setCreating(false);
   }

   function handleShowPaletteCreation() {
      setCreating(true);
   }

   function handleShowPaletteSelection() {
      setSelecting(true);
   }

   let component;

   if (creating) {
      component = <PaletteCreateForm onReturn={handleFinishPaletteCreation} />;
   } else {
      component = <Box className={classes.root} width={1}>
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
                                    <ListItem button aria-label="copy" onClick={handleShowPaletteSelection}>
                                       <ListItemIcon>
                                          <FileCopyIcon />
                                       </ListItemIcon>
                                    </ListItem>
                                 </List>
                                 <Drawer open={selecting} onClose={() => setSelecting(false)}>
                                    <PaletteSelectionList onSelect={(palette) => handleSelect(arrayHelpers, palette)} />
                                 </Drawer>
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

   return component;
}

SchemeCreationView.propTypes = {};

export default SchemeCreationView;
