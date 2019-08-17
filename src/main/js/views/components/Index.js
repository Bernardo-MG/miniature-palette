import React from 'react';

import Typography from '@material-ui/core/Typography';

import SuggestionInput from 'common/components/SuggestionInput';

function Index() {
   return <Typography variant="h6" color="inherit" noWrap>
      { 'Index' }
      <SuggestionInput />
   </Typography>;
}

Index.propTypes = {};

export default Index;
