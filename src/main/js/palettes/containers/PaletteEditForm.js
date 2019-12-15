import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import { selectPaletteById } from 'palettes/selectors';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteEditForm({ id }) {

   const suggestions = useSuggestions();

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
         name: '',
         paints: []
      };
   }

   function toPalette(v) {
      return { name: v.name.value };
   }

   function handleSave(form) {
      const palette = { ...form };

      palette.paints = palette.paints.map(toPalette);

      dispatch(savePalette(palette));
   }

   return <PaletteEditor
      suggestions={suggestions}
      onSave={handleSave}
      initialValues={values} />;
}

PaletteEditForm.propTypes = {
   id: PropTypes.number.isRequired
};

export default PaletteEditForm;
