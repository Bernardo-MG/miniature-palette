import React from 'react';

import { useDispatch } from 'react-redux';
import { usePalettes } from 'domain/hooks';

import { savePaletteGroup } from 'api/actions';

import PaletteGroupEditor from 'palettes/components/PaletteGroupEditor';

function PaletteGroupCreateForm() {
   const palettes = usePalettes();

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
         palettes={palettes}
         onSave={handleSave}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

PaletteGroupCreateForm.propTypes = {};

export default PaletteGroupCreateForm;
