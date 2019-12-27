import React from 'react';

import { useDispatch } from 'react-redux';

import { savePalette } from 'api/actions';

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

   let form;
   if (values) {
      form = <PaletteEditor
         onSave={handleSave}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

PaletteCreateForm.propTypes = {};

export default PaletteCreateForm;
