import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSuggestions, selectLoaded } from 'suggestions/selectors';

import { read } from 'products/actions';
import { setLoaded } from 'suggestions/actions';

export function useSuggestions() {
   const suggestions = useSelector(selectSuggestions);
   const loaded = useSelector(selectLoaded);

   const dispatch = useDispatch();
   const load = () => dispatch(read());
   const setLoad = (input) => dispatch(setLoaded(input));

   useEffect(() => {
      if (!loaded) {
         setLoad(true);
         load();
      }
   });

   return suggestions;
}
