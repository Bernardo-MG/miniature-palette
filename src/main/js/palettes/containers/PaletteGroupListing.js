import React from 'react';

import PaletteGroupList from 'palettes/components/PaletteGroupList';

import { usePalettes } from 'palettes';

function PaletteGroupListing() {
   const groups = usePalettes();

   return <PaletteGroupList groups={groups} />;
}

PaletteGroupListing.propTypes = {};

export default PaletteGroupListing;
