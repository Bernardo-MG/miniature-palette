import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { updatePalette } from 'domain/actions';

import { selectPaletteById } from 'domain/selectors';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteUpdateForm({ id }) {

   const dispatch = useDispatch();

   let values;

   function toPaint(v) {
      return { name: v.name };
   }

   const idValues = useSelector(selectPaletteById(id));
   if (idValues) {
      values = idValues;
      values = {
         ...values,
         paints: values.paints.map(toPaint)
      };
   } else {
      values = {
         id,
         name: '',
         paints: []
      };
   }

   function handleSave(form) {
      const palette = { ...form };

      dispatch(updatePalette(palette));
   }

   return <PaletteEditor
      onSave={handleSave}
      initialValues={values} />;
}

PaletteUpdateForm.propTypes = {
   id: PropTypes.number.isRequired
};

export default PaletteUpdateForm;
