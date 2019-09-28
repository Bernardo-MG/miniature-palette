import { schema } from 'normalizr';

/**
 * Document schema.
 */
export const product = new schema.Entity('products', {}, {
   idAttribute: (value) => `${value.code}-${value.brand}-${value.company}`.replace(/ /g, '_')
});
