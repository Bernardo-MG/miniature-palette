import React from 'react';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'palettes';

import { useHistory } from 'react-router-dom';

function PaletteListing() {
   const palettes = usePalettes();

   const history = useHistory();

   function toEdit(form) {
      history.push(`/palette/edit/${form.id}`);
   }

   return <PaletteList data={palettes}
      onEdit={toEdit} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
