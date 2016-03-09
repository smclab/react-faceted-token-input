# Bidirectional support in css

Right now there is no magic way to support the changes in the css, for
example your `margin-right` will remain a `margin-right` while in many cases,
from the rtl point of view, it should be a `margin-left`.

In the example the tokens change position thanks to `flex` (if you dont know
flexbox you can find a comprehensive guide
[here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)) since in a
rtl enviroment start and end position are inverted.

To make sure that the bidirectional text in any enviroment is correctly
managed, in your css you can add:

```css
[dir='ltr'], [dir='rtl'] {
  unicode-bidi: -webkit-isolate;
  unicode-bidi: -moz-isolate;
  unicode-bidi: -ms-isolate;
  unicode-bidi: isolate;
}

bdo[dir='ltr'], bdo[dir='rtl'] {
  unicode-bidi: bidi-override;
  unicode-bidi: -webkit-isolate-override;
  unicode-bidi: -moz-isolate-override;
  unicode-bidi: -ms-isolate-override;
  unicode-bidi: isolate-override;
}
```

This is compatible only with:

* Firefox 14+
* Chrome 18+
* Safari 6+
* Opera 15+

For all the directional dependent css properties you will need to manage them
by hand, with the use of `[dir='ltr']` and `[dir='rtl']` in your css selector.
As an example in our example you can see:

```css
[dir='rtl'] .token-container {
  margin-left: 0.4em;
}

[dir='ltr'] .token-container {
  margin-right: 0.4em;
}
```

For a small amount of css this method is ok but for a complete project the
best practice should be making two different stylesheets, one for ltr and one
for rtl.

In the near future browsers will probably support css logical properties that
will automatically manage rtl languages in css. The W3C standard is in a draft
stage, you can read it
[here](https://drafts.csswg.org/css-logical-props/#logical-controls).

Since the standard is not yet defined some advanced properties did change name
so be careful when you use them. Right now some properties can be used with
prefixes ([autoprefixer](https://github.com/postcss/autoprefixer) can help you
with that and it should be up to date).To see the current compatibility list go
[here](http://caniuse.com/#feat=css-logical-props), for now here is a list of
supported browsers and their properties:

* Firefox 43+: Only supports `*-start`, and `*-end` values for `margin`,
`border` and `padding` with the `-moz-` prefix. For more information about the
properties go to the [mozilla developer network](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
* Chrome 45+, Safari 9+, Opera 35+, iOS Safari 8.4+ Android Browser 4.3+ and
Chrome for Android 47+, they only support:
  * `*-start`, and `*-end` values for `margin`, `border` and `padding` with
  the `-webkit-` prefix
  * `*-before` and `*-end` for `*-block-start` and `*-block-end`
  *  `start` and `end` values for `text-align`

**NOTE**:
  * Remember that this properties are experimental and can be subjected to
  changes.
