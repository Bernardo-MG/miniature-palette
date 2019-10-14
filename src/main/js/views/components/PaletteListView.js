import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PaletteGroupList from 'palette/components/PaletteGroupList';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function PaletteListView() {

   const classes = useStyles();

   return <Paper className={classes.root}>
      <PaletteGroupList />
   </Paper>;
}

PaletteListView.propTypes = {};

export default PaletteListView;
