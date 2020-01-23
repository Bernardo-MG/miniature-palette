import { crudRequests, fileRequests } from 'api/operations';

import { normalize } from 'normalizr';
import { palette as paletteSchema } from 'domain/schema';

const palettePath = '/rest/palette/';

function normalizePalette(response) {
   const normalized = normalize(response, [paletteSchema]);
   let result;

   if (normalized.entities.palettes) {
      result = normalized.entities;
   } else {
      result = { palettes: [], paints: [] };
   }

   return result;
}

const transformContent = (func) => (response) => {
   const content = func(response.content);
   return { ...response, content };
};

const Palettes = {
   create: (data) => crudRequests.create(palettePath, data),
   delete: (id) => crudRequests.delete(palettePath, id),
   update: (data) => crudRequests.update(palettePath, data.id, data),
   read: () => crudRequests.read(palettePath).then(transformContent(normalizePalette)),
   report: (id) => fileRequests.download(`${palettePath}${id}`, 'palettes.pdf')
};

export {
   Palettes
};
