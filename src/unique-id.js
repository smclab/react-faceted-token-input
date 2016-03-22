const PREFIX = 'fti';
const SEP = '_';

function uniqueId(cfg) {

  return Object.keys(cfg)
      .reduce((memo, key) =>
        memo.concat([ key, cfg[key] ]), [ PREFIX ]).join(SEP);
}

module.exports = uniqueId;
