import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';
import PaintInput from 'palettes/components/PaintInput';

import { useSuggestions } from 'suggestions';

function PaletteEditor({ palette, addPalette }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardContent>
         <PaintInput palette={palette} addPalette={addPalette} suggestions={suggestions} />
         <PaletteEditorList palette={palette} addPalette={addPalette}/>
      </CardContent>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   addPalette: PropTypes.func.isRequired
};

export default PaletteEditor;
