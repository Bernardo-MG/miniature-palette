import { fileRequests } from 'api/operations';

const palettePath = '/rest/palette/';

const Palettes = {
   report: (id) => fileRequests.download(`${palettePath}${id}`, 'palettes.pdf')
};

export {
   Palettes
};
