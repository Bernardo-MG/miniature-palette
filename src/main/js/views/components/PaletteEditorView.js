import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import SuggestedPaletteGroupEditor from 'palettes/containers/SuggestedPaletteGroupEditor';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteEditorView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <SuggestedPaletteGroupEditor />
   </Box>;
}

PaletteEditorView.propTypes = {};

export default PaletteEditorView;
