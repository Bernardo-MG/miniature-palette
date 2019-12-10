import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import { selectPalettesById } from 'palettes/selectors';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteForm({ id }) {

   const suggestions = useSuggestions();

   const dispatch = useDispatch();

   let values;

   const idValues = useSelector(selectPalettesById, id);
   if (id && idValues) {
      values = idValues;
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

PaletteForm.propTypes = {
   id: PropTypes.number
};

export default PaletteForm;
