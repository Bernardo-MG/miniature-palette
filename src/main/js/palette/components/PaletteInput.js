import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Palette from 'palette/components/Palette';
import SuggestionInput from 'common/components/SuggestionInput';

function PaletteInput({ suggestions, palette, addPalette }) {

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: color }];

      addPalette(newPalette);
   }

   return <React.Fragment>
      <SuggestionInput
         suggestions={suggestions}
         label={'paint'}
         placeholder={'write_paint'}
         onChange={setColor}
         onPressEnter={addColorToCurrent}
      />
      <Palette palette={palette} addPalette={addPalette}/>
   </React.Fragment>;
}

PaletteInput.propTypes = {
   suggestions: PropTypes.array.isRequired,
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteInput;
