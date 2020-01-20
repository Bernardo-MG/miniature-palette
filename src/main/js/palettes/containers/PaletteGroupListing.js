import React from 'react';

import PaletteGroupList from 'palettes/components/PaletteGroupList';

import { usePaletteGroups } from 'domain/hooks';

import { useHistory } from 'react-router-dom';

function PaletteGroupListing() {
   const palettes = usePaletteGroups();

   const history = useHistory();

   function handleEdit(id) {
      history.push(`/palette/group/edit/${id}`);
   }

   return <PaletteGroupList data={palettes}
      onEdit={handleEdit} />;
}

PaletteGroupListing.propTypes = {};

export default PaletteGroupListing;
