import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PaletteEditor from 'palette/components/PaletteEditor';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteView() {

   const classes = useStyles();

   return <Paper className={classes.root}>
      <PaletteEditor />
   </Paper>;
}

PaletteView.propTypes = {};

export default PaletteView;
