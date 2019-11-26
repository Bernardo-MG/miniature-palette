import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteGroupRegistration from 'palettes/containers/PaletteGroupRegistration';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteRegistrationView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <PaletteGroupRegistration />
   </Box>;
}

PaletteRegistrationView.propTypes = {};

export default PaletteRegistrationView;
