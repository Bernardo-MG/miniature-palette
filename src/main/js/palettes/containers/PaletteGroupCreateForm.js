import React from 'react';

import { useDispatch } from 'react-redux';

import { savePaletteGroup } from 'api/actions';

import PaletteGroupEditor from 'palettes/components/PaletteGroupEditor';

function PaletteGroupCreateForm() {

   const dispatch = useDispatch();

   const values = {
      name: ''
   };

   function handleSave(form) {
      dispatch(savePaletteGroup(form));
   }

   let form;
   if (values) {
      form = <PaletteGroupEditor
         onSave={handleSave}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

PaletteGroupCreateForm.propTypes = {};

export default PaletteGroupCreateForm;
