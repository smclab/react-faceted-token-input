# A11y Support

## Tested devices
* Google Chrome + ChromeVox
* Windows + Firefox + NVDA
* Windows + Firefox + JAWS

## What to expect

### Navigation
Tab and Shift + Tab are supported when navigating between tokens, it can't be
used to navigate menus.
Navigation inside the menus is entirely done with the arrow keys. 

### Speech pattern
A Token should be spoken in its entirety adding a menu notification when the
dropdown menu is available (expanded and compressed)

The input itself should notify when the suggestions dropdown is available.

Inside the suggestions dropdown there are a number of lists with options.
The desired behaviour is that when focusing an option it is read out with its
position in the list and the name of the current list.

Inside the dropdown menu the behaviour is similar, it should read the name of
the option with the indication of the checked status of the menu item. The
status is *true* if it's the currently selected facet, it's *false* otherwhise.
