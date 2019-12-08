import React from 'react';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'palettes';

function PaletteListing() {
   const palettes = usePalettes();

   return <PaletteList data={palettes} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
