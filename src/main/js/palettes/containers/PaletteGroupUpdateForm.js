import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { updatePaletteGroup } from 'api/actions';

import { usePaletteGroup } from 'domain/hooks';

import PaletteGroupEditor from 'palettes/components/PaletteGroupEditor';

function PaletteGroupUpdateForm({ id }) {

   const dispatch = useDispatch();

   const values = usePaletteGroup(id);

   function handleSave(form) {
      dispatch(updatePaletteGroup(form));
   }

   return <PaletteGroupEditor
      onSave={handleSave}
      initialValues={values} />;
}

PaletteGroupUpdateForm.propTypes = {
   id: PropTypes.number.isRequired
};

export default PaletteGroupUpdateForm;
