import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteGroupEditor from 'palettes/components/PaletteGroupEditor';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteEditorView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteGroupEditor />
   </Box>;
}

PaletteEditorView.propTypes = {};

export default PaletteEditorView;
