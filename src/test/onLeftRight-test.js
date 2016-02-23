jest.dontMock('../onLeftRight');

const onLeftRight = require('../onLeftRight');

let test,
    test1,
    tLen,
    pHome,
    pEnd,
    pSelectToHome,
    pSelectToEnd,
    isMac,
    valueIn;

// [HOME] key press
describe('Test on the single HOME keypress on a Mac and Windows (same behaviour)', () => {

  // Setup for the HOME test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = true;
    pEnd = false;
    pSelectToHome = false;
    pSelectToEnd = false;
    isMac = true; // does not matter for this test
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select only the first token [HOME] - from token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][#token][#token ->][token]test
  it('Should select only the first token [HOME] - from selected (->) tokens -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 1, 3, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("forward");
  });

  // Situation inside the input: [token][#token <-][#token][token]test
  it('Should select only the first token [HOME] - from selected (<-) tokens -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 1, 3, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("backward");
  });

  // Situation inside the input: [token][token][token][token]te|st
  it('Should select only the first token [HOME] - from input -', () => {
    test = onLeftRight(
                       2, 2, "none",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][token]te[#s ->]t
  it('Should select only the first token [HOME] - from selected (->) input -', () => {
    test = onLeftRight(
                       2, 3, "forward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][token]te[#s <-]t
  it('Should select only the first token [HOME] - from selected (<-) input -', () => {
    test = onLeftRight(
                       2, 3, "backward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][#token][#t][#e ->]st
  it('Should select only the first token [HOME] - from selected (->) input + token -', () => {
    test = onLeftRight(
                       0, 2, "forward",
                       tLen, 0, tLen, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("forward");
  });

  // Situation inside the input: [token][token][token][#token <-][#t][#e]st
  it('Should select only the first token [HOME] - from selected (<-) input + token -', () => {
    test = onLeftRight(
                       0, 2, "backward",
                       tLen, 0, tLen, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(1);
    expect(test.tokenSelectionDirection).toEqual("backward");
  });
});

// [END] key press
describe('Test on the single END keypress on a Mac and Windows (same behaviour)', () => {

  // Setup for the END test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = false;
    pEnd = true;
    pSelectToHome = false;
    pSelectToEnd = false;
    isMac = true; // does not matter for this test
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should not select any token and the caret should be at the end of the input [END] - from token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Non standard test for an input with only tokens
  // Situation inside the input: [token][token][#token][token]
  it('Should select only the last token [END] - from token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][#token][#token ->][token]test
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (->) tokens -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 1, 3, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
  });

  // Situation inside the input: [token][#token <-][#token][token]test
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (<-) tokens -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 1, 3, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("backward");
  });

  // Situation inside the input: [token][token][token][token]te|st
  it('Should not select any token and the caret should be at the end of the input [END] - from input -', () => {
    test = onLeftRight(
                       2, 2, "none",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][token]te[#s ->]t
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (->) input -', () => {
    test = onLeftRight(
                       2, 3, "forward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][token]te[#s <-]t
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (<-) input -', () => {
    test = onLeftRight(
                       2, 3, "backward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("none");
  });

  // Situation inside the input: [token][token][token][#token][#t][#e ->]st
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (->) input + token -', () => {
    test = onLeftRight(
                       0, 2, "forward",
                       tLen, 0, tLen, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
  });

  // Situation inside the input: [token][token][token][#token <-][#t][#e]st
  it('Should not select any token and the caret should be at the end of the input [END] - from selected (->) input + token -', () => {
    test = onLeftRight(
                       0, 2, "backward",
                       tLen, 0, tLen, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       false,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(valueIn.length);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(tLen);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("backward");
  });
});

// [SHIFT] + [HOME] key press on Mac
describe('Test on SHIFT + HOME keypress on a Mac', () => {

  // Setup for the SHIFT + HOME test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = true;
    pEnd = false;
    pSelectToHome = true;
    pSelectToEnd = false;
    isMac = true;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select all the tokens [SHIFT] + [HOME] - from a token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(3);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][#token][#token ->]test
  it('Should select all the tokens [SHIFT] + [HOME] - from selected (->) token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 4, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(4);
    expect(test.tokenSelectionDirection).toEqual("forward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][#token <-][#token]test
  it('Should select all the tokens [SHIFT] + [HOME] - from selected (<-) token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 4, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(4);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][token]|test
  it('Should select all the tokens [SHIFT] + [HOME] - before the text input -', () => {
    test = onLeftRight(
      0, 0, "none",
      tLen, tLen, tLen, "none",
      pHome, pEnd, pSelectToHome, pSelectToEnd,
      true,
      true, "none", valueIn
    );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][token]te|st
  it('Should select all the token plus the input up to the caret [SHIFT] + [HOME] - inside the input -', () => {
    test = onLeftRight(
                       2, 2, "none",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(2);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
  it('Should select all the token  plus the input up to the caret [SHIFT] + [HOME] - selected (->) input -', () => {
    test = onLeftRight(
                       1, 3, "forward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(3);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
  it('Should select all the token plus the input up to the caret [SHIFT] + [HOME] - selected (<-) input -', () => {
    test = onLeftRight(
                       1, 3, "backward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(3);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][#token][#t][#e ->]st
  it('Should select all the token  plus the input up to the caret [SHIFT] + [HOME] - selected (->) input + token -', () => {
    test = onLeftRight(
                       0, 2, "forward",
                       tLen, 3, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(2);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

  // Situation inside the input: [token][token][token][#token <-][#t][#e]st
  it('Should select all the token plus the input up to the caret [SHIFT] + [HOME] - selected (<-) input + token -', () => {
    test = onLeftRight(
                       0, 2, "backward",
                       tLen, 3, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       true, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(2);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });
});

// [SHIFT] + [HOME] key press on Windows
describe('Test on SHIFT + HOME keypress on Windows', () => {

  // Setup for the SHIFT + HOME test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = true;
    pEnd = false;
    pSelectToHome = true;
    pSelectToEnd = false;
    isMac = false;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select all the token from the selected one [SHIFT] + [HOME] - from a token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(3);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][#token][#token ->]test
  it('Should select all the token from the first one selected [SHIFT] + [HOME] - from selected (->) token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 4, "forward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(3);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][#token <-][#token]test
  it('Should select all the token from the first one selected [SHIFT] + [HOME] - from selected (<-) token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 4, "backward",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(4);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][token]|test
  it('Should select all the token [SHIFT] + [HOME] - before the text input -', () => {
    test = onLeftRight(
                        0, 0, "none",
                        tLen, tLen, tLen, "none",
                        pHome, pEnd, pSelectToHome, pSelectToEnd,
                        true,
                        isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][token]te|st
  it('Should select all the token plus the input up to the caret [SHIFT] + [HOME] - inside the input -', () => {
    test = onLeftRight(
                       2, 2, "none",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(2);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
  it('Should select all the token plus the input up to the start of the selection in the input [SHIFT] + [HOME] - selected (->) input -', () => {
    test = onLeftRight(
                       1, 3, "forward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(1);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
  it('Should select all the token plus the input up to the end of the selection in the input [SHIFT] + [HOME] - selected (<-) input -', () => {
    test = onLeftRight(
                       1, 3, "backward",
                       tLen, tLen, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(3);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][#token][#t][#e ->]st
  it('Should select all the tokens [SHIFT] + [HOME] - selected (->) input + token -', () => {
    test = onLeftRight(
                       0, 2, "forward",
                       tLen, 3, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

  // Situation inside the input: [token][token][token][#token <-][#t][#e]st
  it('Should select all the token and the selected input [SHIFT] + [HOME] - selected (<-) input + token -', () => {
    test = onLeftRight(
                       0, 2, "backward",
                       tLen, 3, tLen, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    // expect(test.selectionStart).toEqual(0);
    // expect(test.selectionEnd).toEqual(2);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });
});

// [SHIFT] + [END] key press on Mac
describe('Test on SHIFT + END keypress on Mac', () => {

  // Setup for the SHIFT + END test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = false;
    pEnd = true;
    pSelectToHome = false;
    pSelectToEnd = true;
    isMac = true;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select all the token [SHIFT] + [END] - from a token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(2);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
    expect(test.mac).toEqual(true);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select everything from the first token selected [SHIFT] + [END] - from selected (->) token -', () => {
      test = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(2);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select everything from the first token selected [SHIFT] + [END] - from selected (<-) token -', () => {
      test = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(2);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should select everything in the input [SHIFT] + [END] - before the text input -', () => {
      test = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          pHome, pEnd, pSelectToHome, pSelectToEnd,
                          true,
                          isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("none");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should select everything in the input after the caret [SHIFT] + [END] - inside the input -', () => {
      test = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(2);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("none");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should select everything in the input after the start of the selection [SHIFT] + [END] - selected (->) input -', () => {
      test = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(1);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("none");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select everything in the input after the start of the selection [SHIFT] + [END] - selected (<-) input -', () => {
      test = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(1);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("none");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should select the token plus everything in the input [SHIFT] + [END] - selected (->) input + token -', () => {
      test = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select the token plus everything in the input [SHIFT] + [END] - selected (<-) input + token -', () => {
      test = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen, "backward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });
});

// [SHIFT] + [END] key press on Windows
describe('Test on SHIFT + END keypress on Windows', () => {

  // Setup for the SHIFT + END test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    pHome = false;
    pEnd = true;
    pSelectToHome = false;
    pSelectToEnd = true;
    isMac = false;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select everything from the selected token up untill the end of the input [SHIFT] + [END] - from a token -', () => {
    test = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       pHome, pEnd, pSelectToHome, pSelectToEnd,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(2);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
    expect(test.mac).toEqual(false);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select everything from the selected token up untill the end of the input [SHIFT] + [END] - from selected (->) token -', () => {
      test = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(2);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select the first token selected up untill the end of the input  [SHIFT] + [END] - from selected (<-) token -', () => {
      test = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should select everything in the input [SHIFT] + [END] - before the text input -', () => {
      test = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          pHome, pEnd, pSelectToHome, pSelectToEnd,
                          true,
                          isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should everything after the caret [SHIFT] + [END] - inside the input -', () => {
      test = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(2);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should extend the selection to the end of the input [SHIFT] + [END] - selected (->) input -', () => {
      test = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(1);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select everything in the input after the end of the current selection [SHIFT] + [END] - selected (<-) input -', () => {
      test = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(3);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should extend the selection to the end of the input [SHIFT] + [END] - selected (->) input + token -', () => {
      test = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select everything in the input after the end of the current selection [SHIFT] + [END] - selected (<-) input + token -', () => {
      test = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen + 1, "backward",
                         pHome, pEnd, pSelectToHome, pSelectToEnd,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(2);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(tLen);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });
});

// [SHIFT] + [HOME] -> [SHIFT] + [END] key press on Mac
describe('Test on the combination of [SHIFT] + [HOME] -> [SHIFT] + [END] keypress on Mac', () => {

  // Setup for the [SHIFT] + [HOME] -> [SHIFT] + [END] test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    isMac = true;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - from a token -', () => {
    test1 = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       true, false, true, false,
                       true,
                       isMac, "none", valueIn
                      );
    test = onLeftRight(
                       test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                       tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                       test1.tokenSelectionDirection,
                       false, true, false, true,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(true);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - from selected (->) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select everything (tokens + input) [SHIFT] + [END] - from selected (<-) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should select everything (tokens + input) [SHIFT] + [END] - before the text input -', () => {
      test1 = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          true, false, true, false,
                          true,
                          isMac, "none", valueIn
                         );
       test = onLeftRight(
                          test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                          tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                          test1.tokenSelectionDirection,
                          false, true, false, true,
                          true,
                          isMac, "none", valueIn
                         );

       expect(test.selectionStart).toEqual(0);
       expect(test.selectionEnd).toEqual(valueIn.length);
       expect(test.selectionDirection).toEqual("none");
       expect(test.tokenSelectionStart).toEqual(0);
       expect(test.tokenSelectionEnd).toEqual(tLen + 1);
       expect(test.tokenSelectionDirection).toEqual("backward");
       expect(test.mac).toEqual(true);
     });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - inside the input -', () => {
      test1 = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (->) input -', () => {
      test1 = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (<-) input -', () => {
      test1 = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (->) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (<-) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen, "backward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });
});

// [SHIFT] + [HOME] -> [SHIFT] + [END] key press on Windows
describe('Test on the combination of [SHIFT] + [HOME] -> [SHIFT] + [END] keypress on Windows', () => {

  // Setup for the [SHIFT] + [HOME] -> [SHIFT] + [END] test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    isMac = false;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select everything from the token to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - from a token -', () => {
    test1 = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       true, false, true, false,
                       true,
                       isMac, "none", valueIn
                      );
    test = onLeftRight(
                       test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                       tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                       test1.tokenSelectionDirection,
                       false, true, false, true,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("forward");
    expect(test.tokenSelectionStart).toEqual(2);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
    expect(test.mac).toEqual(false);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select everything from the token to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - from selected (->) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(2);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select everything from the first selected token to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - from selected (<-) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should everything in the text input [SHIFT] + [HOME] -> [SHIFT] + [END] - before the text input -', () => {
      test1 = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          true, false, true, false,
                          true,
                          isMac, "none", valueIn
                         );
       test = onLeftRight(
                          test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                          tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                          test1.tokenSelectionDirection,
                          false, true, false, true,
                          true,
                          isMac, "none", valueIn
                         );

       expect(test.selectionStart).toEqual(0);
       expect(test.selectionEnd).toEqual(valueIn.length);
       expect(test.selectionDirection).toEqual("forward");
       expect(test.tokenSelectionStart).toEqual(3);
       expect(test.tokenSelectionEnd).toEqual(tLen + 1);
       expect(test.tokenSelectionDirection).toEqual("forward");
       expect(test.mac).toEqual(false);
     });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should everything from the caret to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - inside the input -', () => {
      test1 = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(2);
      // expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should select everything from the start of the selection to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (->) input -', () => {
      test1 = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(1);
      // expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select everything from the end of the selection to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (<-) input -', () => {
      test1 = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(3);
      // expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should select everything from the first token selected to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (->) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(0);
      // expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select everything from the end of the selection to the end of the input [SHIFT] + [HOME] -> [SHIFT] + [END] - selected (<-) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen, "backward",
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(2);
      // expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(3);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(false);
    });
});

// [SHIFT] + [END] -> [SHIFT] + [HOME] key press on Mac
describe('Test on the combination of [SHIFT] + [END] -> [SHIFT] + [HOME] keypress on Mac', () => {

  // Setup for the [SHIFT] + [END] -> [SHIFT] + [HOME] test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    isMac = true;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - from a token -', () => {
    test1 = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       false, true, false, true,
                       true,
                       isMac, "none", valueIn
                      );
    test = onLeftRight(
                       test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                       tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                       test1.tokenSelectionDirection,
                       true, false, true, false,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(valueIn.length);
    expect(test.selectionDirection).toEqual("none");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(tLen + 1);
    expect(test.tokenSelectionDirection).toEqual("forward");
    expect(test.mac).toEqual(true);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select everything (tokens + input) [SHIFT] + [HOME] -> [SHIFT] + [END] - from selected (->) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - from selected (<-) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - before the text input -', () => {
      test1 = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          false, true, false, true,
                          true,
                          isMac, "none", valueIn
                         );
       test = onLeftRight(
                          test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                          tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                          test1.tokenSelectionDirection,
                          true, false, true, false,
                          true,
                          isMac, "none", valueIn
                         );

       expect(test.selectionStart).toEqual(0);
       expect(test.selectionEnd).toEqual(valueIn.length);
       expect(test.selectionDirection).toEqual("none");
       expect(test.tokenSelectionStart).toEqual(0);
       expect(test.tokenSelectionEnd).toEqual(tLen + 1);
       expect(test.tokenSelectionDirection).toEqual("backward");
       expect(test.mac).toEqual(true);
     });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - inside the input -', () => {
      test1 = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("none");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (->) input -', () => {
      test1 = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (<-) input -', () => {
      test1 = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (->) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("forward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("forward");
      expect(test.mac).toEqual(true);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select everything (tokens + input) [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (<-) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen, "backward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(valueIn.length);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(true);
    });
});

// [SHIFT] + [END] -> [SHIFT] + [HOME] key press on windows
describe('Test on the combination of [SHIFT] + [END] -> [SHIFT] + [HOME] keypress on Windows', () => {

  // Setup for the [SHIFT] + [END] -> [SHIFT] + [HOME] test
  // Situation inside the input: [token][token][token][token]test
  beforeEach( function() {
    tLen = 4;
    isMac = false;
    valueIn = "test";
  });

  // Situation inside the input: [token][token][#token][token]test
  it('Should select every token before the selected one [SHIFT] + [END] -> [SHIFT] + [HOME] - from a token -', () => {
    test1 = onLeftRight(
                       0, 0, "none",
                       tLen, 2, 3, "none",
                       false, true, false, true,
                       true,
                       isMac, "none", valueIn
                      );
    test = onLeftRight(
                       test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                       tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                       test1.tokenSelectionDirection,
                       true, false, true, false,
                       true,
                       isMac, "none", valueIn
                      );

    expect(test.selectionStart).toEqual(0);
    expect(test.selectionEnd).toEqual(0);
    expect(test.selectionDirection).toEqual("backward");
    expect(test.tokenSelectionStart).toEqual(0);
    expect(test.tokenSelectionEnd).toEqual(3);
    expect(test.tokenSelectionDirection).toEqual("backward");
    expect(test.mac).toEqual(false);
  });

    // Situation inside the input: [token][token][#token][#token ->]test
    it('Should select every token before the first one selected [SHIFT] + [END] -> [SHIFT] + [HOME] - from selected (->) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "forward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(0);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(3);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][#token <-][#token]test
    it('Should select every token before the last one selected [SHIFT] + [END] -> [SHIFT] + [HOME] - from selected (<-) token -', () => {
      test1 = onLeftRight(
                         0, 0, "none",
                         tLen, 2, 4, "backward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(0);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]|test
    it('Should select all the tokens [SHIFT] + [END] -> [SHIFT] + [HOME] - before the text input -', () => {
      test1 = onLeftRight(
                          0, 0, "none",
                          tLen, tLen, tLen, "none",
                          false, true, false, true,
                          true,
                          isMac, "none", valueIn
                         );
       test = onLeftRight(
                          test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                          tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                          test1.tokenSelectionDirection,
                          true, false, true, false,
                          true,
                          isMac, "none", valueIn
                         );

       expect(test.selectionStart).toEqual(0);
       expect(test.selectionEnd).toEqual(0);
       expect(test.selectionDirection).toEqual("backward");
       expect(test.tokenSelectionStart).toEqual(0);
       expect(test.tokenSelectionEnd).toEqual(tLen + 1);
       expect(test.tokenSelectionDirection).toEqual("backward");
       expect(test.mac).toEqual(false);
     });

    // Situation inside the input: [token][token][token][token]te|st
    it('Should select all the tokens plus the input up to the caret [SHIFT] + [END] -> [SHIFT] + [HOME] - inside the input -', () => {
      test1 = onLeftRight(
                         2, 2, "none",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(2);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e][#s ->]t
    it('Should select all the tokens up to the start of the current selection [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (->) input -', () => {
      test1 = onLeftRight(
                         1, 3, "forward",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(1);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][token]t[#e <-][#s]t
    it('Should select all the tokens up to the end of the current selection [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (<-) input -', () => {
      test1 = onLeftRight(
                         1, 3, "backward",
                         tLen, tLen, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(3);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen + 1);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token][#t][#e ->]st
    it('Should select all the tokens before the first one selected [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (->) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "forward",
                         tLen, 3, tLen, "none",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      expect(test.selectionStart).toEqual(0);
      expect(test.selectionEnd).toEqual(0);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });

    // Situation inside the input: [token][token][token][#token <-][#t][#e]st
    it('Should select everything before the end of the current selection [SHIFT] + [END] -> [SHIFT] + [HOME] - selected (<-) input + token -', () => {
      test1 = onLeftRight(
                         0, 2, "backward",
                         tLen, 3, tLen, "backward",
                         false, true, false, true,
                         true,
                         isMac, "none", valueIn
                        );
      test = onLeftRight(
                         test1.selectionStart, test1.selectionEnd, test1.selectionDirection,
                         tLen, test1.tokenSelectionStart, test1.tokenSelectionEnd,
                         test1.tokenSelectionDirection,
                         true, false, true, false,
                         true,
                         isMac, "none", valueIn
                        );

      // expect(test.selectionStart).toEqual(0);
      // expect(test.selectionEnd).toEqual(2);
      expect(test.selectionDirection).toEqual("backward");
      expect(test.tokenSelectionStart).toEqual(0);
      expect(test.tokenSelectionEnd).toEqual(tLen);
      expect(test.tokenSelectionDirection).toEqual("backward");
      expect(test.mac).toEqual(false);
    });
});
