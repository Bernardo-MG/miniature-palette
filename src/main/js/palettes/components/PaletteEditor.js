import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import PaletteEditorList from 'palettes/components/PaletteEditorList';
import PaletteInput from 'palettes/containers/PaletteInput';

function PaletteEditor({ palette, addPalette }) {
   return <Card>
      <CardContent>
         <PaletteInput palette={palette} addPalette={addPalette} />
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
