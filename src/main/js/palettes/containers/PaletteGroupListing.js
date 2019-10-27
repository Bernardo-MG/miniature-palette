import React from 'react';

import PaletteGroupList from 'palettes/components/PaletteGroupList';

import { usePalettes } from 'palettes';

function PaletteGroupListing() {
   const palettes = usePalettes();

   return <PaletteGroupList palettes={palettes} />;
}

PaletteGroupListing.propTypes = {};

export default PaletteGroupListing;
