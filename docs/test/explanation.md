# Test explanation

`onLeftRight` is a core function inside the component. To understand the test
you first need to know the input and the output of the function.

From `onLeftRight.js`:

#### Input

`selectionStart` and `selectionEnd`: start and end point of the text selection

`selectionDirection` and `tokenSelectionDirection`: the
direction in which the selection has been made (it can only be `none`,
`backward` or `forward`)

`tokensLength`: number of tokens rendered in the input

`tokenSelectionStart` and `tokenSelectionEnd`: start and end point of the token
selection

`home` and `end`: `HOME` or `END` keypress

`selectToHome`: `SHIFT` + `HOME` key combination

`selectToEnd`: `SHIFT` + `END` key combination

`shiftKey`: `Shift` keypress

`mac`: OS differentiation

`keyDirection`: set the direction of the pressed arrow key (it can only be:
 `none`, `backward` or `forward`)

`inputValue`: the text inside of the input

#### Output

`selectionStart` and `selectionEnd`: start and end point of the text selection

`selectionDirection` and `tokenSelectionDirection`: the
direction in which the selection has been made (it can only be `none`,
`backward` or `forward`)

`tokenSelectionStart` and `tokenSelectionEnd`: start and end point of the token
selection

`mac`: OS differentiation
  prevent

### Test code

Now for the actual test code.

Here we import the function to test:

```javascript
  const onLeftRight = require('../onLeftRight');
```

For semplicity we declare some useful variables

```javascript
  let test,
      test1,
      tokenLength,
      pressedHome,
      pressedEnd,
      pressedSelectToHome,
      pressedSelectToEnd,
      isMac,
      inputValue;
```

Every test case is described inside the `describe()` for example:

```javascript
describe('Test on the single HOME keypress on a Mac and Windows (same behaviour)', () => { ... }
```

Before each test inside a describe we define the common variables:

```javascript
  beforeEach( function() {
    tokenLength = 4;
    pressedHome = true;
    pressedEnd = false;
    pressedSelectToHome = false;
    pressedSelectToEnd = false;
    isMac = true;
    inputValue = "test";
  });
```

Each actual test is done inside the `it()`.

    NOTE: in the code before each it() call is present a comment to help to
    visualize the content of the input for the test

Inside each `it()` we call the function:

```javascript
  test = onLeftRight( ... );
```

Finally we use [Expect](https://github.com/mjackson/expect) assertion to compare
the output and the expected result.

Example assertion:

```javascript
  expect(test.selectionStart).toEqual(0);
```

**NOTE**:
* some assertion are commented, it means that the task of assigning that
  value is leaved to the OS and it's not simulated in the unit test.
