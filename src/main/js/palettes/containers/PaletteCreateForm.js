import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { savePalette } from 'domain/actions';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteCreateForm() {

   const dispatch = useDispatch();

   const values = {
      name: '',
      paints: []
   };

   function handleSave(form) {
      const palette = { ...form };

      dispatch(savePalette(palette));
   }

   return <PaletteEditor
      onSave={handleSave}
      initialValues={values} />;
}

PaletteCreateForm.propTypes = {
   id: PropTypes.number
};

export default PaletteCreateForm;
