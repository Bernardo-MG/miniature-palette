import React from 'react';

import { useDispatch } from 'react-redux';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'domain/hooks';

import { deletePalette, updatePalette, paletteReport } from 'api/actions';

function PaletteListing() {
   const palettes = usePalettes();

   const dispatch = useDispatch();

   function handleReport(id) {
      dispatch(paletteReport(id));
   }

   function handleSave(form) {
      dispatch(updatePalette(form));
   }

   function handleDelete(form) {
      dispatch(deletePalette(form.id));
   }

   return <PaletteList data={palettes}
      onReport={handleReport}
      onSave={handleSave}
      onDelete={handleDelete} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
