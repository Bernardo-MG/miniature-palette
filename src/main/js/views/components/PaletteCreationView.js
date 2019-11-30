import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteForm from 'palettes/containers/PaletteForm';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteCreationView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteForm />
   </Box>;
}

PaletteCreationView.propTypes = {};

export default PaletteCreationView;
