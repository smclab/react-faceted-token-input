const PREFIX = 'fti';
const SEP = '_';

export default function uniqueId(cfg) {

  return Object.keys(cfg)
    .sort()
    .reduce((memo, key) =>
      memo.concat([ key, cfg[key] ]), [ PREFIX ]).join(SEP);
}
