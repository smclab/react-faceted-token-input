# Formatting Guidelines

Just some guidelines to standardize the look of the code.

### Language Specifics

Since it's available throught `babel` use *ECMAScript 6* whenever is possible,
expecially try not to use `var`, define your variables with:

  ```javascript
    const name = value;
  ```
  ```javascript
    let name = value;
  ```

**Note**
  * We highly recommended the use of `const` as the default method to define
    variables. Use `let` only if it's really necessary.

### Line width

Try not to exceed 80 character per line. This guideline is amended inside your
test code for the description in `describe()` and `it()`.

### Spaces

* `if () {}`: add a space after the **if** keyword before **()**

* `functionCall()`: no space after **functionCall**

* `{ attribute }`: add spaces before and after the attribute.

### New Lines

* `multi-line if`: add a new line after the opening **{**. Example:

      ```javascript
        if (true === true &&
          false === false) {

          // code here
        }
      ```

### Indentation

* `multi-line function input`: if you have multiple input for a function and the
  line width excedes 80 characters, you can brake them in new lines.

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
