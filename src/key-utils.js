import { LEFT, RIGHT, HOME, END, A, E } from './key-codes';

const UA = (typeof navigator !== 'undefined')
  ? navigator.userAgent.toLowerCase() : '';

export const IS_MAC = (UA.indexOf('macintosh') >= 0);

export const isCtrlKey = event => event[ IS_MAC ? 'metaKey' : 'ctrlKey' ];

// Ranges taken from the Unicode DerivedBidiClass.txt version 8.0.0
const CHARACTERS_LTR_RANGES = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8' +
  '\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';

const CHARACTERS_RTL_RANGES = '\u0591-\u05C7\u0600-\u06FF\u0700-\u074F' +
  '\u0750-\u077F\u0780-\u07BF\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF' +
  '\uFE70-\uFEFF\u1EE00-\u1EEFF\u0590-\u05FF\u07C0-\u07FF\u10800-\u1083F' +
  '\u10900-\u1091F\u10920-\u1093F\u10980-\u1099F\u109A0-\u109FF' +
  '\u10A00-\u10A5F\u0800-\u089F\uFB1D-\uFB4F\u10840-\u10FFF\u1E800-\u1EDFF' +
  '\u1EF00-\u1EFFF\u0001EE00-\u0001EEFF';

const DIRECTION_CHECK_RE = new RegExp('^[^'+CHARACTERS_LTR_RANGES+']*['+CHARACTERS_RTL_RANGES+']');

export const isRTL = (str) => {
  return DIRECTION_CHECK_RE.test(str);
}

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
export const isForward = (event, RTL) => ((event.which === RIGHT) && (RTL === 'ltr')) || ((event.which === LEFT) && (RTL === 'rtl')) || isEnd(event);
export const isBackward = (event, RTL) => ((event.which === LEFT) && (RTL === 'ltr')) || ((event.which === RIGHT) && (RTL === 'rtl')) || isHome(event);

export const isSelectToHome = event => event.shiftKey && isHome(event);
export const isSelectToEnd = event => event.shiftKey && isEnd(event);
