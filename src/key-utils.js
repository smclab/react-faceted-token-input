
const UA = (typeof navigator !== 'undefined') ? navigator.userAgent.toLowerCase() : '';

const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

export const isOnlyCtrlKey = IS_MAC ?
  (event => event.metaKey && !event.ctrlKey) :
  (event => event.ctrlKey && !event.metaKey);
