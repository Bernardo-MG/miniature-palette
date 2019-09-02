import React, { useState } from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

import api from 'api';

export default function PaintSuggestionInput({ onWrite, onPressEnter }) {

   const [suggestions, setSuggestions] = useState([]);
   const [loaded, setLoaded] = useState(false);

   async function loadSuggestions() {
      const read = await api.Paints.all();
      setSuggestions(read.map((paint) => paint.name));
   }

   function handleKeyPress(event) {
      if ((event) && (event.key === 'Enter')) {
         onPressEnter();
      }
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
         onWrite={onWrite}
         onPressEnter={handleKeyPress}
      />
   );
}

PaintSuggestionInput.propTypes = {
   onWrite: PropTypes.func.isRequired,
   onPressEnter: PropTypes.func.isRequired
};
