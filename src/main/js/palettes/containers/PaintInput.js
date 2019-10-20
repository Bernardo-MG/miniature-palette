import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import SuggestionInput from 'common/components/SuggestionInput';

import { selectSuggestions, selectLoaded } from 'products/selectors';

import { read, setLoaded } from 'products/actions';

function PaintInput({ palette, addPalette }) {

   const suggestions = useSelector(selectSuggestions);
   const loaded = useSelector(selectLoaded);

   const dispatch = useDispatch();
   const load = () => dispatch(read());
   const setLoad = (input) => dispatch(setLoaded(input));

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: color }];

      addPalette(newPalette);
   }

   useEffect(() => {
      if (!loaded) {
         setLoad(true);
         load();
      }
   });

   return <Grid container spacing={3}>
      <Grid item xs={6}>
         <SuggestionInput
            suggestions={suggestions}
            label={'paint'}
            placeholder={'write_paint'}
            onChange={setColor}
            onPressEnter={addColorToCurrent}
         />
      </Grid>
      <Grid item xs={6}>
         <IconButton onClick={addColorToCurrent}>
            <NoteAddIcon />
         </IconButton>
      </Grid>
   </Grid>;
}

PaintInput.propTypes = {
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaintInput;
