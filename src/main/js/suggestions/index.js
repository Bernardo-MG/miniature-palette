import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSuggestions } from 'suggestions/selectors';

import { read } from 'products/actions';

export function useSuggestions() {
   const suggestions = useSelector(selectSuggestions);

   const dispatch = useDispatch();
   const load = () => dispatch(read());

   useEffect(() => {
      load();
   }, []);

   return suggestions;
}
