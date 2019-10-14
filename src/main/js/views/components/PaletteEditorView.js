import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PaletteGroupEditor from 'palette/components/PaletteGroupEditor';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteEditorView() {

   const classes = useStyles();

   return <Paper className={classes.root}>
      <PaletteGroupEditor />
   </Paper>;
}

PaletteEditorView.propTypes = {};

export default PaletteEditorView;
