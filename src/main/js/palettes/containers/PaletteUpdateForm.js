import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { deletePalette, updatePalette } from 'api/actions';

import { usePalette } from 'domain/hooks';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteUpdateForm({ id }) {

   const dispatch = useDispatch();

   const values = usePalette(id);

   function handleSave(form) {
      dispatch(updatePalette(form));
   }

   function handleDelete(form) {
      dispatch(deletePalette(form.id));
   }

   let form;
   if (values) {
      form = <PaletteEditor
         onSave={handleSave}
         onDelete={handleDelete}
         initialValues={values} />;
   } else {
      form = <div />;
   }

   return form;
}

PaletteUpdateForm.propTypes = {
   id: PropTypes.number.isRequired
};

export default PaletteUpdateForm;
