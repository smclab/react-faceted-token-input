
import { LEFT, RIGHT, HOME, END, A, E  } from './key-codes';

const UA = (typeof navigator !== 'undefined') ? navigator.userAgent.toLowerCase() : '';

export const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

export const isOnlyCtrlKey = IS_MAC
  ? event => event.metaKey && !event.ctrlKey
  : event => event.ctrlKey && !event.metaKey;

export const isHome = IS_MAC
  ? ({ metaKey, ctrlKey, altKey, which }) =>
    (metaKey && !ctrlKey && !altKey && (which === LEFT)) ||
    (!metaKey && !ctrlKey && !altKey && which === HOME) ||
    (!metaKey && ctrlKey && !altKey && (which === A))
  : ({ ctrlKey, altKey, which }) =>
    (!ctrlKey && !altKey && (which === HOME)) ||
    (ctrlKey && !altKey && (which === HOME));

export const isEnd = IS_MAC
  ? ({ metaKey, ctrlKey, altKey, which }) =>
    (metaKey && !ctrlKey && !altKey && (which === RIGHT)) ||
    (!metaKey && !ctrlKey && !altKey && which === END) ||
    (!metaKey && ctrlKey && !altKey && (which === E))
  : ({ ctrlKey, altKey, which }) =>
    (!ctrlKey && !altKey && (which === END)) ||
    (ctrlKey && !altKey && (which === END));

// TODO: Manage RTL languages
export const isForward = (event) => (event.which === RIGHT) || isEnd(event);
export const isBackward = (event) => (event.which === LEFT) || isHome(event);

export const isSelectToHome = event => event.shiftKey && isHome(event);
export const isSelectToEnd = event => event.shiftKey && isEnd(event);
