jquery.dropdownReplacement
==========================

A skinnable dropdown widget that implements **all** native select functionality and then some.
 
[DEMOS and Documentation](http://programmingdrunk.com/current-projects/dropdownReplacement/)


Why do we need another plugin that does this?
=============================================

At the time I first created this plugin, there was no other dropdown widget that implemented all of the 
functionality of a native select such as:

- searching through the list by typing
- tabbing in about out, moving through the options without opening the dropdown
- using arrow keys to navigate and search
- dropping up, or down depending on screen space
- ability to skin dynamically change skin based on OS or browser in order to skin exactly like native select
- optgroup support

In addition to emulating all of native feature this plugin provides a host of other functionality:

- ability to change the width of the option list and or select box, with ellipsis support
- unobtrusively widgetize a select or an input 
- specify options via json if widgetizing an input, or via pre-rendered hidden html element
- multiple select boxes can share the same dropdown list, this means that if you have 100 inputs on the same page that 
each show the same list of 100 options, you only have to render the options once, this will be transparent to the user since each dropdown maintains its own state.
- fully skinable
- choose the number of options to show in the dropdown list
- full programmtic access


Project status
==============
This plugin is stable. It has been used in many production systems:

- https://drupal.org/node/1835776
- https://www.google.com/search?q=jquery.dropdownReplacement-0.5.3.js

Browser support
===============
Tested on Firefox, Chrome, IE6, IE7, IE8
Probably works on IE9 and 10 given that it works on Firefox.


Requirements:
-------------

- jQuery 1.4.x - 1.9.x
- Not tested on jQuery 2.0


