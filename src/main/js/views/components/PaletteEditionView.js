import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteEditionView() {

   const { id } = useParams();

   const classes = useStyles();

   return <Box className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
         { id }
      </Typography>
   </Box>;
}

PaletteEditionView.propTypes = {};

export default PaletteEditionView;
