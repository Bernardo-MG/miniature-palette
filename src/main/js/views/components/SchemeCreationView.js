import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import { useDispatch } from 'react-redux';

import { saveScheme } from 'api/actions';

import SchemeEditor from 'palettes/components/SchemeEditor';

import { usePalettes } from 'domain/hooks';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(3, 2)
   }
}));

function SchemeCreationView() {
   const palettes = usePalettes();

   const classes = useStyles();

   const dispatch = useDispatch();

   const values = {
      name: '',
      palettes: []
   };

   function handleSave(form) {
      dispatch(saveScheme(form));
   }

   return <Box className={classes.root}>
      <SchemeEditor
         palettes={palettes}
         onSave={handleSave}
         initialValues={values} />
   </Box>;
}

SchemeCreationView.propTypes = {};

export default SchemeCreationView;
