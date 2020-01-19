import { crudRequests, fileRequests } from 'api/operations';

import { normalize } from 'normalizr';
import { palette as paletteSchema } from 'domain/schema';

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

const Palettes = {
   create: (palette) => crudRequests.create('/rest/palette/', palette),
   delete: (id) => crudRequests.delete('/rest/palette/', id),
   update: (palette) => crudRequests.update('/rest/palette/', palette.id, palette),
   read: () => crudRequests.read('/rest/palette/').then((response) => response.content).then(normalizePalette),
   report: (id) => fileRequests.download(`/report/palette/${id}`, 'palettes.pdf')
};

export {
   Palettes
};
