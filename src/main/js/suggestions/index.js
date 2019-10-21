import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSuggestions, selectLoaded } from 'products/selectors';

import { read, setLoaded } from 'products/actions';

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
