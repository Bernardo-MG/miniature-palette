import React from 'react';

import Typography from '@material-ui/core/Typography';

import PaintSuggestionInput from 'paints/containers/PaintSuggestionInput';

function Index() {
   return <Typography variant="h6" color="inherit" noWrap>
      { 'Index' }
      <PaintSuggestionInput />
   </Typography>;
}

Index.propTypes = {};

export default Index;
