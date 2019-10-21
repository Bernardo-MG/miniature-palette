import React from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

function PaintInput({ onChange, suggestions, value }) {
   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      onChange={onChange}
      initial={value}
   />;
}

PaintInput.propTypes = {
   onChange: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired,
   value: PropTypes.string.isRequired
};

export default PaintInput;
