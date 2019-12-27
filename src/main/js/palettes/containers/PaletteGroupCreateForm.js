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

   return <PaletteGroupEditor
      onSave={handleSave}
      initialValues={values} />;
}

PaletteGroupCreateForm.propTypes = {};

export default PaletteGroupCreateForm;
