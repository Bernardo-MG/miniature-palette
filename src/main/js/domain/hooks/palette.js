import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPalettes } from 'api/actions';

import { selectPalettes, selectPaletteById } from 'domain/selectors';

export function usePalettes() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPalettes);
}

export function usePalette(id) {
   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPaletteById(id));
}
