import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteGroupCreateForm from 'palettes/containers/PaletteGroupCreateForm';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteGroupCreationView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteGroupCreateForm />
   </Box>;
}

PaletteGroupCreationView.propTypes = {};

export default PaletteGroupCreationView;
