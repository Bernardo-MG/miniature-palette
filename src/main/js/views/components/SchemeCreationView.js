import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import SchemeCreateForm from 'palettes/containers/SchemeCreateForm';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function SchemeCreationView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <SchemeCreateForm />
   </Box>;
}

SchemeCreationView.propTypes = {};

export default SchemeCreationView;
