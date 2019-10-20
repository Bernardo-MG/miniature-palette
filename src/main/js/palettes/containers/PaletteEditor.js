import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';

import { useSuggestions } from 'suggestions';

function PaletteEditor({ palette, handleAddColor, handleColorChangeAt, handleColorDeleteAt }) {

   const suggestions = useSuggestions();

   return <Card>
      <CardContent>
         <PaletteEditorList palette={palette} suggestions={suggestions}
            handleAddColor={handleAddColor}
            handleColorChangeAt={handleColorChangeAt}
            handleColorDeleteAt={handleColorDeleteAt} />
      </CardContent>
   </Card>;
}

PaletteEditor.propTypes = {
   palette: PropTypes.shape({
      paints: PropTypes.array.isRequired
   }).isRequired,
   handleAddColor: PropTypes.func.isRequired,
   handleColorChangeAt: PropTypes.func.isRequired,
   handleColorDeleteAt: PropTypes.func.isRequired
};

export default PaletteEditor;
