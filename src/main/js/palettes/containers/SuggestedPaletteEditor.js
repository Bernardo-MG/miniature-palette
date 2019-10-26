import React from 'react';

import PaletteEditor from 'palettes/components/PaletteEditor';

import { useSuggestions } from 'suggestions';

function SuggestedPaletteEditor(props) {

   const suggestions = useSuggestions();

   return <PaletteEditor {...props} suggestions={suggestions} />;
}

SuggestedPaletteEditor.propTypes = {};

export default SuggestedPaletteEditor;
