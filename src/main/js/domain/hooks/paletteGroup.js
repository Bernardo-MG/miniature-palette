import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPaletteGroups } from 'api/actions';

import { selectPaletteGroups } from 'domain/selectors';

export function usePaletteGroups() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPaletteGroups());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPaletteGroups);
}
