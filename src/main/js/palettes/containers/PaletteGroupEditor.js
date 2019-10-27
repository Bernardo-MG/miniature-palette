import React from 'react';

import PaletteGroupForm from 'palettes/components/PaletteGroupForm';

import { useSuggestions } from 'suggestions';

function PaletteGroupEditor() {

   const suggestions = useSuggestions();

   return <PaletteGroupForm suggestions={suggestions}/>;
}

PaletteGroupEditor.propTypes = {};

export default PaletteGroupEditor;
