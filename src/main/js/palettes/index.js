import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPalettes } from 'palettes/actions';

import { selectPalettes } from 'palettes/selectors';

export function usePalettes() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPalettes);
}
