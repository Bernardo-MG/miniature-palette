import React from 'react';

import { useDispatch } from 'react-redux';

import { saveScheme } from 'api/actions';

import SchemeEditor from 'palettes/components/SchemeEditor';

import { usePalettes } from 'domain/hooks';

function SchemeCreateForm() {
   const palettes = usePalettes();

   const dispatch = useDispatch();

   const values = {
      name: '',
      palettes: []
   };

   function handleSave(form) {
      dispatch(saveScheme(form));
   }

   let form;
   if (values) {
      form = <SchemeEditor
         palettes={palettes}
         onSave={handleSave}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

SchemeCreateForm.propTypes = {};

export default SchemeCreateForm;
