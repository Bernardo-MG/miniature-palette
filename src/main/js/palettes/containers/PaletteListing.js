import React from 'react';

import { useDispatch } from 'react-redux';

import PaletteList from 'palettes/components/PaletteList';

import { usePalettes } from 'domain/hooks';

import { useHistory } from 'react-router-dom';

import { paletteReport } from 'api/actions';

function PaletteListing() {
   const palettes = usePalettes();

   const history = useHistory();

   const dispatch = useDispatch();

   function handleEdit(id) {
      history.push(`/palette/edit/${id}`);
   }

   function handleReport(id) {
      dispatch(paletteReport(id));
   }

   return <PaletteList data={palettes}
      onEdit={handleEdit}
      onReport={handleReport} />;
}

PaletteListing.propTypes = {};

export default PaletteListing;
