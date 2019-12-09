import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteListing from 'palettes/containers/PaletteListing';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteListView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteListing />
   </Box>;
}

PaletteListView.propTypes = {};

export default PaletteListView;
