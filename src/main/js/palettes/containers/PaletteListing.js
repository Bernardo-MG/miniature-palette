import React from 'react';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'domain';

import { useHistory } from 'react-router-dom';

function PaletteListing() {
   const palettes = usePalettes();

   const history = useHistory();

   function toEdit(id) {
      history.push(`/palette/edit/${id}`);
   }

   return <PaletteList data={palettes}
      onEdit={toEdit} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
