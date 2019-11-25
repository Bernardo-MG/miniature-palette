import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { registerPaletteGroup } from 'palettes/actions';

import PaletteGroupNameForm from 'palettes/components/PaletteGroupNameForm';

import PaletteGroupEditor from 'palettes/containers/PaletteGroupEditor';

function PaletteGroupRegistration() {

   const [saved, setSaved] = useState(false);

   const dispatch = useDispatch();

   function handleSave(form) {
      setSaved(true);
      dispatch(registerPaletteGroup({ name: form.name }));
   }

   let view;
   if (saved) {
      view = <PaletteGroupEditor />;
   } else {
      view = <PaletteGroupNameForm onSave={handleSave} />;
   }

   return view;
}

PaletteGroupRegistration.propTypes = {};

export default PaletteGroupRegistration;
