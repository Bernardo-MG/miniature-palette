import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';

import SchemeEditor from 'palettes/components/SchemeEditor';

import { useDispatch } from 'react-redux';

import { saveScheme } from 'api/actions';

import { usePalettes } from 'domain/hooks';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function SchemeCreationView() {
   const palettes = usePalettes();

   const classes = useStyles();

   const dispatch = useDispatch();

   const values = {
      name: '',
      palettes: []
   };

   function handleSave(form) {
      dispatch(saveScheme(form));
   }

   return <Box className={classes.root} width={1}>
      <Grid container>
         <Grid item xs={1}>
            <MenuList>
               <MenuItem>
                  <ListItemIcon>
                     <SaveIcon />
                  </ListItemIcon>
               </MenuItem>
            </MenuList>
         </ Grid>
         <Grid item xs={9}>
            <SchemeEditor
               palettes={palettes}
               onSave={handleSave}
               initialValues={values} />
         </ Grid>
         <Grid item xs={2}>
            <List>
               <ListItem button>
                  <ListItemText primary="Palette 1" />
               </ListItem>
               <ListItem button>
                  <ListItemText primary="Palette 2" />
               </ListItem>
               <ListItem button>
                  <ListItemText primary="Palette 3" />
               </ListItem>
            </List>
            <Divider />
            <List>
               <ListItem button>
                  <ListItemIcon>
                     <AddCircleIcon />
                  </ListItemIcon>
               </ListItem>
            </List>
         </ Grid>
      </ Grid>
   </Box>;
}

SchemeCreationView.propTypes = {};

export default SchemeCreationView;
