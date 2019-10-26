import React from 'react';

import PaletteGroupEditor from 'palettes/components/PaletteGroupEditor';

import { useSuggestions } from 'suggestions';

function SuggestedPaletteGroupEditor() {

   const suggestions = useSuggestions();

   return <PaletteGroupEditor suggestions={suggestions}/>;
}

SuggestedPaletteGroupEditor.propTypes = {};

export default SuggestedPaletteGroupEditor;
