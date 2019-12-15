import { schema } from 'normalizr';

/**
 * Document schema.
 */
export const product = new schema.Entity('products', {}, {
   idAttribute: 'id'
});
