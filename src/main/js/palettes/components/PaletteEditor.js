import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';
import PaintInput from 'palettes/containers/PaintInput';

function PaletteEditor({ palette, addPalette }) {
   return <Card>
      <CardContent>
         <PaintInput palette={palette} addPalette={addPalette} />
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
