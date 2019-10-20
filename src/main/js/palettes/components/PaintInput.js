import React, { useState } from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

function PaintInput({ palette, addPalette, suggestions }) {

   const [color, setColor] = useState('');

   function addColor() {
      const newPalette = { ...palette };
      newPalette.paints = [...newPalette.paints, { name: color }];

      addPalette(newPalette);
   }

   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      onChange={setColor}
      onPressEnter={addColor}
   />;
}

PaintInput.propTypes = {
   addPalette: PropTypes.func.isRequired,
   palette: PropTypes.object.isRequired,
   suggestions: PropTypes.array.isRequired
};

export default PaintInput;
