import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import SuggestionInput from 'common/components/SuggestionInput';

function PaintInput({ palette, addPalette, suggestions }) {

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: color }];

      addPalette(newPalette);
   }

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
   addPalette: PropTypes.func.isRequired,
   palette: PropTypes.object.isRequired,
   suggestions: PropTypes.array.isRequired
};

export default PaintInput;
