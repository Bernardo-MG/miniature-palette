import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPalettes } from 'palettes/actions';

import { selectPaletteOptions } from 'palettes/selectors';

export function usePaletteGroups() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   const palettes = useSelector(selectPaletteOptions);

   return palettes;
}
