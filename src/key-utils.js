import { LEFT, RIGHT, HOME, END, A, E } from './key-codes';

const UA = (typeof navigator !== 'undefined')
  ? navigator.userAgent.toLowerCase() : '';

export const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

// Placeholder untill fbjs support
// Ranges taken from the Unicode DerivedBidiClass.txt version 8.0.0
// http://www.unicode.org/Public/8.0.0/ucd/extracted/DerivedBidiClass.txt
const RANGE_LTR = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8' +
  '\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';

const RANGE_RTL = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC\u0590-\u05FF' +
  '\u07C0-\u089F';

const DIRECTION_CHECK_RE = new RegExp(`^[^${ RANGE_LTR }]*[${ RANGE_RTL }]`);

export const isRTL = (str) => {
  return DIRECTION_CHECK_RE.test(str);
};

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

export const isForward = (event, direction) =>
  ((event.which === RIGHT) && (direction === 'ltr')) ||
  ((event.which === LEFT) && (direction === 'rtl')) ||
  isEnd(event);

export const isBackward = (event, direction) =>
  ((event.which === LEFT) && (direction === 'ltr')) ||
  ((event.which === RIGHT) && (direction === 'rtl')) ||
  isHome(event);

export const isSelectToHome = event => event.shiftKey && isHome(event);

export const isSelectToEnd = event => event.shiftKey && isEnd(event);
