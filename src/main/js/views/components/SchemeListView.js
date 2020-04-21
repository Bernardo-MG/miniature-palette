import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';

import { useSchemes } from 'domain/hooks';

import Box from '@material-ui/core/Box';

import SchemeList from 'palettes/components/SchemeList';

import { deleteScheme, updateScheme, paletteReport } from 'api/actions';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function SchemeListView() {
   const classes = useStyles();

   const data = useSchemes();

   const dispatch = useDispatch();

   function handleReport(id) {
      dispatch(paletteReport(id));
   }

   function handleSave(form) {
      dispatch(updateScheme(form));
   }

   function handleDelete(form) {
      dispatch(deleteScheme(form.id));
   }

   return <Box className={classes.root}>
      <SchemeList data={data}
         onReport={handleReport}
         onSave={handleSave}
         onDelete={handleDelete} />
   </Box>;
}

SchemeListView.propTypes = {};

export default SchemeListView;
