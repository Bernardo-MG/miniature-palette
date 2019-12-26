import React from 'react';

import { useDispatch } from 'react-redux';

import { savePalette } from 'domain/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteCreateForm() {

   const dispatch = useDispatch();

   const values = {
      name: '',
      paints: []
   };

   function handleSave(form) {
      dispatch(savePalette(form));
   }

   return <PaletteEditor
      onSave={handleSave}
      initialValues={values} />;
}

PaletteCreateForm.propTypes = {};

export default PaletteCreateForm;
