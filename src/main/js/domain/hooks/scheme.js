import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readSchemes } from 'api/actions';

import { selectSchemes } from 'domain/selectors';

export function useSchemes() {
   const dispatch = useDispatch();
   const load = () => dispatch(readSchemes());

   useEffect(() => {
      load();
   }, []);

   return useSelector(selectSchemes);
}
