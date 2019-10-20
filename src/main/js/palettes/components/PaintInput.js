import React from 'react';

import PropTypes from 'prop-types';

import SuggestionInput from 'common/components/SuggestionInput';

function PaintInput({ onChange, suggestions }) {
   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      onChange={onChange}
   />;
}

PaintInput.propTypes = {
   onChange: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired
};

export default PaintInput;
