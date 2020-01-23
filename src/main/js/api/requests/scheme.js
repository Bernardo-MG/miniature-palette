import { crudRequests } from 'api/operations';

import { normalize } from 'normalizr';
import { scheme as schemeSchema } from 'domain/schema';

const schemePath = '/rest/scheme/';

function normalizeScheme(response) {
   const normalized = normalize(response, [schemeSchema]);
   let result;

   if (normalized.entities.palettes) {
      result = normalized.entities;
   } else {
      result = { schemes: [], palettes: [], paints: [] };
   }

   return result;
}

const transformContent = (func) => (response) => {
   const content = func(response.content);
   return { ...response, content };
};

const Schemes = {
   create: (data) => crudRequests.create(schemePath, data),
   delete: (id) => crudRequests.delete(schemePath, id),
   update: (data) => crudRequests.update(schemePath, data.id, data),
   read: () => crudRequests.read(schemePath).then(transformContent(normalizeScheme))
};

export {
   Schemes
};
