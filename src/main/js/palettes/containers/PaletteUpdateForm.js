import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { updatePalette } from 'domain/actions';

import { usePalette } from 'domain/hooks';

import PaletteEditor from 'palettes/components/PaletteEditor';

function PaletteUpdateForm({ id }) {

   const dispatch = useDispatch();

   const values = usePalette(id);

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
