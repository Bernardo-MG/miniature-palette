import React from 'react';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';
import Palette from 'palette/components/Palette';

function PaletteSelection({ palette, onChoose, onClick }) {
   return <React.Fragment>
      <PaintSuggestionInput onChoose={onChoose} />
      <Button onClick={onClick}>
         { 'add_color' }
      </Button>
      <Palette palette={palette.colors}/>
   </React.Fragment>;
}

PaletteSelection.propTypes = {
   palette: PropTypes.array.isRequired,
   onChoose: PropTypes.func.isRequired,
   onClick: PropTypes.func.isRequired
};

export default PaletteSelection;
