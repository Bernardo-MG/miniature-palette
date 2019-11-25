import React from 'react';

import { useDispatch } from 'react-redux';

import { registerPaletteGroup } from 'palettes/actions';

import PaletteGroupNameForm from 'palettes/components/PaletteGroupNameForm';

function PaletteGroupRegistration() {

   const dispatch = useDispatch();

   function handleSave(form) {
      dispatch(registerPaletteGroup({ name: form.name }));
   }

   return <PaletteGroupNameForm onSave={handleSave} />;
}

PaletteGroupRegistration.propTypes = {};

export default PaletteGroupRegistration;
