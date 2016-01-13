
import { LEFT, RIGHT, HOME, END, A, E  } from './key-codes';

const UA = (typeof navigator !== 'undefined') ? navigator.userAgent.toLowerCase() : '';

const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

export const isOnlyCtrlKey = IS_MAC
  ? event => event.metaKey && !event.ctrlKey
  : event => event.ctrlKey && !event.metaKey;

export const isHome = IS_MAC
  ? ({ metaKey, ctrlKey, altKey, which }) =>
    (metaKey && !ctrlKey && !altKey && (which === LEFT)) ||
    (!metaKey && !ctrlKey && !altKey && which === HOME) ||
    (!metaKey && ctrlKey && !altKey && (which === A))
  // TODO: Windows support
  : event => false

export const isEnd = IS_MAC
  ? ({ metaKey, ctrlKey, altKey, which }) =>
    (metaKey && !ctrlKey && !altKey && (which === RIGHT)) ||
    (!metaKey && !ctrlKey && !altKey && which === END) ||
    (!metaKey && ctrlKey && !altKey && (which === E))
  // TODO: Windows support
  : event => false

// TODO: Manage RTL languages
export const isForward = ({ which }) => (which === RIGHT) || isEnd(event);
export const isBackward = ({ which }) => (which === LEFT) || isHome(event);

export const isSelectToHome = event => event.shiftKey && isHome(event);
export const isSelectToEnd = event => event.shiftKey && isEnd(event);
