import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';

import { useSuggestions } from 'suggestions';

function PaletteEditor({ palette, addPalette, handleColorChangeAt }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardContent>
         <PaletteEditorList palette={palette} addPalette={addPalette} suggestions={suggestions} handleColorChangeAt={handleColorChangeAt}/>
      </CardContent>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   addPalette: PropTypes.func.isRequired,
   handleColorChangeAt: PropTypes.func.isRequired
};

export default PaletteEditor;
