/*
int         selectionStart,
int         selectionEnd,
string      selectionDirection,                 ['none' 'backward' 'forward']
int         tokensLength,
int         tokenSelectionStart,
int         tokenSelectionEnd,
string      tokenSelectionDirection,            ['none' 'backward' 'forward']
boolean     home,
boolean     end,
boolean     selectToHome,
boolean     selectToEnd,
boolean     shiftKey,
boolean     mac,
string      keyDirection,                       ['none' 'backward' 'forward']
string      valueInput,
*/

function onLeftRight(selectionStart,
                     selectionEnd,
                     selectionDirection,
                     tokensLength,
                     tokenSelectionStart,
                     tokenSelectionEnd,
                     tokenSelectionDirection,
                     home,
                     end,
                     selectToHome,
                     selectToEnd,
                     shiftKey,
                     mac,
                     keyDirection,
                     valueInput
                    ) {

  console.log('input', selectionStart,
                       selectionEnd,
                       selectionDirection,
                       tokensLength,
                       tokenSelectionStart,
                       tokenSelectionEnd,
                       tokenSelectionDirection,
                       home,
                       end,
                       selectToHome,
                       selectToEnd,
                       shiftKey,
                       mac,
                       keyDirection,
                       valueInput);

  const DIRECTION_NONE = 'none';
  const DIRECTION_BACKWARD = 'backward';
  const DIRECTION_FORWARD = 'forward';

  let initialIsInputInSelection;
  let increment;
  let result = {};
  let prevent = false;

  if (!home && !end && !selectToHome && !selectToEnd && tokenSelectionStart >= tokensLength) {
    // The text field is focused

    if (selectionStart > 0) {
      // We’re moving inside the text field
      return;
    }

    if (selectionDirection === DIRECTION_FORWARD && selectionStart !== selectionEnd) {
      // The 'caret' is on the opposite side
      return;
    }

    if (selectionDirection === DIRECTION_BACKWARD && !shiftKey) {
      // We do have a selection but we’re exiting it on the left
      return;
    }

    if (keyDirection === DIRECTION_FORWARD) {
      // We are moving on the opposite side
      return;
    }
  }

  if (selectToHome) {
    if (mac) {
      prevent = true;
      selectionStart = 0;
      tokenSelectionStart = 0;
    }
    else {
      prevent = true;

      if (selectionEnd > 0) {
        // Caret in the text field
        if (selectionDirection === DIRECTION_FORWARD) {
          selectionEnd = selectionStart;
        }

        selectionStart = 0;
      }

      selectionDirection = DIRECTION_BACKWARD;

      if (tokenSelectionDirection === DIRECTION_FORWARD) {
        tokenSelectionEnd = tokenSelectionStart + 1;
      }

      tokenSelectionStart = 0;
      tokenSelectionDirection = DIRECTION_BACKWARD;
    }

    if ((tokenSelectionEnd - tokenSelectionStart) > 1) {
      if (tokenSelectionDirection === DIRECTION_NONE) {
        tokenSelectionDirection = DIRECTION_BACKWARD;
      }
    }
  }
  else if (selectToEnd) {
    if (mac) {
      tokenSelectionEnd = tokensLength + 1;

      selectionStart = selectionStart;
      selectionEnd = valueInput.length;

      if (tokenSelectionStart < tokensLength) {
        selectionStart = 0;
        selectionEnd = valueInput.length;
      }
    }
    else {
      prevent = true;

      if (selectionDirection === DIRECTION_BACKWARD) {
        // caret inside the text field
        if (tokenSelectionStart < tokensLength &&
            selectionStart === selectionEnd) {

          selectionStart = 0;
        }
        else {
          selectionStart = selectionEnd;
        }
      }

      selectionEnd = valueInput.length;
      selectionDirection = DIRECTION_FORWARD;

      if (tokenSelectionDirection === DIRECTION_BACKWARD) {
        tokenSelectionStart = tokenSelectionEnd - 1;
      }

      tokenSelectionEnd = tokensLength + 1;
      tokenSelectionDirection = DIRECTION_FORWARD;
    }

    if ((tokenSelectionEnd - tokenSelectionStart) > 1) {
      if (tokenSelectionDirection === DIRECTION_NONE) {
        tokenSelectionDirection = DIRECTION_FORWARD;
      }
    }
  }
  else if (home) {
    if (tokensLength > 0) {
      prevent = true;

      selectionStart = 0;
      selectionEnd = 0;

      tokenSelectionStart = 0;
      tokenSelectionEnd = 1;
    }
  }
  else if (end) {
    prevent = true;

    selectionStart = valueInput.length;
    selectionEnd = valueInput.length;

    tokenSelectionStart = tokensLength;
    tokenSelectionEnd = tokensLength + 1;
  }
  else if (!shiftKey) {
    if (tokenSelectionEnd <= tokensLength) {
      prevent = true;
    }

    if (tokenSelectionDirection === DIRECTION_NONE) {
      if (keyDirection === DIRECTION_FORWARD) {
        tokenSelectionStart += 1;
        tokenSelectionEnd += 1;
      }
      else if (keyDirection === DIRECTION_BACKWARD) {
        tokenSelectionStart -= 1;
        tokenSelectionEnd -= 1;
      }
    }
    else if (keyDirection === DIRECTION_FORWARD) {
      tokenSelectionStart = tokenSelectionEnd - 1;
    }
    else if (keyDirection === DIRECTION_BACKWARD) {
      tokenSelectionEnd = tokenSelectionStart + 1;
    }

    tokenSelectionDirection = DIRECTION_NONE;

    if (tokenSelectionStart < tokensLength) {
      selectionStart = 0;
      selectionEnd = 0;
    }
  }
  else {
    if (tokenSelectionEnd <= tokensLength) {
      prevent = true;
    }

    initialIsInputInSelection = (tokenSelectionEnd > tokensLength);

    if (tokenSelectionDirection === DIRECTION_NONE) {
      tokenSelectionDirection = keyDirection;
    }

    increment = (tokenSelectionDirection === keyDirection) ? 1 : -1;

    if (tokenSelectionDirection === DIRECTION_FORWARD) {
      tokenSelectionEnd += increment;
    }
    else if (tokenSelectionDirection === DIRECTION_BACKWARD) {
      tokenSelectionStart -= increment;
    }

    if ((tokenSelectionEnd - tokenSelectionStart) <= 1) {
      tokenSelectionDirection = DIRECTION_NONE;
    }

    if (tokenSelectionEnd > tokensLength) {
      if (keyDirection !== tokenSelectionDirection) {
        prevent = true;
      }

      if (!initialIsInputInSelection && (keyDirection === DIRECTION_FORWARD)) {
        selectionStart = 0;
        selectionEnd = 1;
      }
      else if (selectionEnd !== valueInput.length &&
               tokenSelectionDirection === DIRECTION_FORWARD){
        prevent = true;
        selectionEnd += increment;
      }
   }

    if (selectionStart === 0 && keyDirection === DIRECTION_BACKWARD &&
        tokenSelectionStart < tokensLength &&
        tokenSelectionDirection !== DIRECTION_BACKWARD &&
        selectionEnd !== 0) {

      // leave this selection to the browser
      return;
    }
  }

  if (tokenSelectionEnd <= tokensLength &&
      tokenSelectionDirection === DIRECTION_BACKWARD) {
    selectionStart = 0;
    selectionEnd = 0;
  }

  tokenSelectionStart = Math.max(0, tokenSelectionStart);
  tokenSelectionEnd = Math.max(tokenSelectionStart + 1, tokenSelectionEnd);

  tokenSelectionEnd = Math.min(tokensLength + 1, tokenSelectionEnd);
  tokenSelectionStart = Math.min(tokenSelectionEnd - 1, tokenSelectionStart);

  result.selectionStart = selectionStart;
  result.selectionEnd = selectionEnd;
  result.selectionDirection = selectionDirection;
  result.tokenSelectionStart = tokenSelectionStart;
  result.tokenSelectionEnd = tokenSelectionEnd;
  result.tokenSelectionDirection = tokenSelectionDirection;
  result.mac = mac;
  result.prevent = prevent;

  return result;
}

module.exports = onLeftRight;
