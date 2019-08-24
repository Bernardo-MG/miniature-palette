import React, { useState } from 'react';

import SuggestionInput from 'common/components/SuggestionInput';

import api from 'api';

export default function PaintSuggestionInput() {

   const [suggestions, setSuggestions] = useState([]);
   const [loaded, setLoaded] = useState(false);

   async function loadSuggestions() {
      const read = await api.Paints.all();
      setSuggestions(read.map((paint) => paint.name));
   }

   if (!loaded) {
      loadSuggestions();
      setLoaded(true);
   }

   return (
      <SuggestionInput
         suggestions={suggestions}
         label={'paint'}
         placeholder={'placeholder'}
      />
   );
}

PaintSuggestionInput.propTypes = {};
