import React, { useState } from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

import api from 'api';

export default function PaintSuggestionInput({ onChoose }) {

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
         onChoose={onChoose}
      />
   );
}

PaintSuggestionInput.propTypes = {
   onChoose: PropTypes.func.isRequired
};
