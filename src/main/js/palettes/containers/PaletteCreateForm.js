import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { savePalette } from 'api/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteCreateForm({ onReturn }) {

   const dispatch = useDispatch();

   const values = {
      name: '',
      paints: []
   };

   function handleSave(form) {
      dispatch(savePalette(form));
      onReturn();
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

PaletteCreateForm.propTypes = {
   onReturn: PropTypes.func.isRequired
};

export default PaletteCreateForm;
