/* @flow */

const PREFIX = 'fti';
const SEP = '_';

type cfgConfig = {
  id: ?string
}

export default function uniqueId(cfg: cfgConfig): string {

  return Object.keys(cfg)
    .sort()
    .reduce((memo, key) =>
      memo.concat([ key, cfg[key] ]), [ PREFIX ]).join(SEP);
}
