import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteGroupList from 'palettes/containers/PaletteGroupList';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteListView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteGroupList />
   </Box>;
}

PaletteListView.propTypes = {};

export default PaletteListView;
