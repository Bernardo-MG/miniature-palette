import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import PaletteGroupUpdateForm from 'palettes/containers/PaletteGroupUpdateForm';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteGroupEditionView() {

   const { id } = useParams();

   const classes = useStyles();
   const intId = parseInt(id, 10);

   return <Box className={classes.root}>
      <PaletteGroupUpdateForm id={intId} />
   </Box>;
}

PaletteGroupEditionView.propTypes = {};

export default PaletteGroupEditionView;
