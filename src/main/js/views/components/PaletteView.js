import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PaletteGroup from 'palette/components/PaletteGroup';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteView() {

   const classes = useStyles();

   return <Paper className={classes.root}>
      <PaletteGroup />
   </Paper>;
}

PaletteView.propTypes = {};

export default PaletteView;
