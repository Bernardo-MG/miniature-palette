import React from 'react';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'domain/hooks';

import { useHistory } from 'react-router-dom';

function PaletteListing() {
   const palettes = usePalettes();

   const history = useHistory();

   function handleEdit(id) {
      history.push(`/palette/edit/${id}`);
   }

   return <PaletteList data={palettes}
      onEdit={handleEdit} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
