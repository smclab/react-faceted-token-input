
import { LEFT, RIGHT } from './key-codes';

const UA = (typeof navigator !== 'undefined') ? navigator.userAgent.toLowerCase() : '';

const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

export const isOnlyCtrlKey = IS_MAC
  ? event => event.metaKey && !event.ctrlKey
  : event => event.ctrlKey && !event.metaKey;

export const isSelectToHome = IS_MAC
  ? ({ metaKey, shiftKey, ctrlKey, altKey, which }) =>
    metaKey && shiftKey && !ctrlKey && !altKey && (which === LEFT)
  // TODO: Windows support
  : event => false
;

export const isSelectToEnd = IS_MAC
  ? ({ metaKey, shiftKey, ctrlKey, altKey, which }) =>
    metaKey && shiftKey && !ctrlKey && !altKey && (which === RIGHT)
    // TODO: Windows support
  : event => false
;
