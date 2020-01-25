import React from 'react';

import { useDispatch } from 'react-redux';

import SchemeList from 'palettes/components/SchemeList';

import { useSchemes } from 'domain/hooks';

import { deleteScheme, updateScheme, paletteReport } from 'api/actions';

function SchemeListing() {
   const palettes = useSchemes();

   const dispatch = useDispatch();

   function handleReport(id) {
      dispatch(paletteReport(id));
   }

   function handleSave(form) {
      dispatch(updateScheme(form));
   }

   function handleDelete(form) {
      dispatch(deleteScheme(form.id));
   }

   return <SchemeList data={palettes}
      onReport={handleReport}
      onSave={handleSave}
      onDelete={handleDelete} />;
}

SchemeListing.propTypes = {};

export default SchemeListing;
