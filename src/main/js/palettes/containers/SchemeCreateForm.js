import React from 'react';

import { useDispatch } from 'react-redux';

import { saveScheme } from 'api/actions';

import SchemeEditor from 'palettes/components/SchemeEditor';

function SchemeCreateForm() {

   const dispatch = useDispatch();

   const values = {
      name: ''
   };

   function handleSave(form) {
      dispatch(saveScheme(form));
   }

   let form;
   if (values) {
      form = <SchemeEditor
         onSave={handleSave}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

SchemeCreateForm.propTypes = {};

export default SchemeCreateForm;
