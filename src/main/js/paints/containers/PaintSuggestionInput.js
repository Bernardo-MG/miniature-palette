import React from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

export default function PaintSuggestionInput({ suggestions, onWrite, onPressEnter }) {
   return (
      <SuggestionInput
         suggestions={suggestions}
         label={'paint'}
         placeholder={'placeholder'}
         onWrite={onWrite}
         onPressEnter={onPressEnter}
      />
   );
}

PaintSuggestionInput.propTypes = {
   suggestions: PropTypes.array.isRequired,
   onWrite: PropTypes.func.isRequired,
   onPressEnter: PropTypes.func.isRequired
};
