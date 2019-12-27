import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPaletteGroups } from 'api/actions';

import { selectPaletteGroups, selectPaletteGroupById } from 'domain/selectors';

export function usePaletteGroups() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPaletteGroups());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPaletteGroups);
}

export function usePaletteGroup(id) {
   const dispatch = useDispatch();
   const load = () => dispatch(readPaletteGroups());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPaletteGroupById(id));
}
