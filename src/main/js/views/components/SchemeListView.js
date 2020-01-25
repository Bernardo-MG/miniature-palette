import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import SchemeListing from 'palettes/containers/SchemeListing';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function SchemeListView() {

   const classes = useStyles();

   return <Box className={classes.root}>
      <SchemeListing />
   </Box>;
}

SchemeListView.propTypes = {};

export default SchemeListView;
