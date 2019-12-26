import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readPalettes } from 'domain/actions';

import { selectPalettes } from 'domain/selectors';

export function usePalettes() {
   const dispatch = useDispatch();
   const load = () => dispatch(readPalettes());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectPalettes);
}
