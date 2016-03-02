# Formatting Guidelines

Just some guidelines to standardize the look of the code.

* [Language Specifics](#language)
* [Line Width](#lineWidth)
* [Spaces](#spaces)
* [New Lines](#newLines)
* [Indentation](#indentation)
* [Brace Style](#braceStyle)

<a name="language"></a>
### Language Specifics

Since it's available throught `babel` use *ECMAScript 6* whenever is possible
(if you don't know *ECMAScript 6* a good starting point to learn is in the
[babel documentation](https://babeljs.io/docs/learn-es2015/)), expecially try
not to use `var`, define your variables with:

  ```javascript
    const name = value;
  ```

  ```javascript
    let name = value;
  ```

**Note**
  * We highly recommended the use of `const` as the default method to define
    variables. Use `let` only if it's really necessary.

<a name="lineWidth"></a>
### Line width

Try not to exceed 80 character per line. This guideline is amended inside your
test code for the description in `describe()` and `it()`.

<a name="spaces"></a>
### Spaces

* `if () {}`: add a space after the **if** keyword before **()**

* `functionCall()`: no space after **functionCall**

* `{ attribute }`: add spaces before and after the attribute.

<a name="newLines"></a>
### New Lines

* `multi-line if`: add a new line after the opening **{**. Example:

      ```javascript
        if (true === true &&
          false === false) {

          // code here
        }
      ```

<a name="indentation"></a>
### Indentation

* `multi-line function input`: if you have multiple input for a function and the
  line width exceeds 80 characters, you can brake them in new lines.

  Use this type of indentation:

    ```javascript
      function name(
        input1,
        input2,
        input3,
        input4
      ) {
        // correct input style
      }
    ```

  Don't use:

    ```javascript
      function name(
                    input1,
                    input2,
                    input3,
                    input4
                  ) {
        // wrong input style
      }
    ```

<a name="braceStyle"></a>
### Brace Style

The preferred brace style is *Stroustrup* in which the `else` statements in an
`if-else` construct must be on its own line after the preceding closing brace,
as in this example:

```javascript
  if (foo) {
    bar();
  }
  else {
    baz();
  }
```
