import React, { useState } from 'react';

import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';
import Palette from 'palette/components/Palette';

function PaletteSelection({ palette, addPalette }) {

   const [color, setColor] = useState('');

   function addColorToCurrent() {
      const newPalette = { ...palette };
      newPalette.colors = [...newPalette.colors, color];

      addPalette(newPalette);
   }

   return <React.Fragment>
      <PaintSuggestionInput onWrite={setColor} onPressEnter={addColorToCurrent} />
      <IconButton onClick={addColorToCurrent}>
         <AddCircleOutlineIcon />
      </IconButton>
      <Palette palette={palette.colors}/>
   </React.Fragment>;
}

PaletteSelection.propTypes = {
   palette: PropTypes.object.isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteSelection;
