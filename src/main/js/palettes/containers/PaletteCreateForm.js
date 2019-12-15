import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { useSuggestions } from 'suggestions';

import { savePalette } from 'palettes/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteCreateForm() {

   const suggestions = useSuggestions();

   const dispatch = useDispatch();

   const values = {
      name: '',
      paints: []
   };

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

PaletteCreateForm.propTypes = {
   id: PropTypes.number
};

export default PaletteCreateForm;
