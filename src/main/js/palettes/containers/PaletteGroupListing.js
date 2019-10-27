import React from 'react';

import PaletteGroupList from 'palettes/components/PaletteGroupList';

import { usePaletteGroups } from 'palettes';

function PaletteGroupListing() {
   const groups = usePaletteGroups();

   return <PaletteGroupList groups={groups} />;
}

PaletteGroupListing.propTypes = {};

export default PaletteGroupListing;
