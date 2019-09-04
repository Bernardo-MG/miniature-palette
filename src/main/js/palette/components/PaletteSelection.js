import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Palette from 'palette/components/Palette';
import SuggestionInput from 'common/components/SuggestionInput';

function PaletteSelection({ suggestions, palette, addPalette }) {

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.colors = [...newPalette.colors, color];

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

PaletteSelection.propTypes = {
   suggestions: PropTypes.array.isRequired,
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteSelection;
