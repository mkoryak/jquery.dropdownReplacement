/**
 * jQuery.support.windowsTheme
 * Copyright (c) 2010 Mikhail Koryak - http://notetodogself.blogspot.com
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Date: 02/03/10
 *
 * @projectDescription Detect which windows theme is being used, 'xp' or 'classic'.
 *
 * jQuery.support.windowsTheme.name will contain values 'xp', 'classic', 'zuneNOIR' or undefined if theme could not be detected.
 * jQuery.support.windowsTheme.code will contain the color code used to detect your theme. If name is undefined this can be used
 * 	as debug information.
 *
 * http://notetodogself.blogspot.com
 * Works with jQuery 1.3.2+. Tested on FF3.6, IE6, IE7 on WinXP.
 *
 * @author Mikhail Koryak
 * @version 0.3.2
 */

;(function($){
$.support.windowsTheme = {"name":undefined, "code": undefined};
(function () {
	var rgb;
	var map = { 
		    "rgb(212,208,200)" : "classic", //WinXP  
		    "rgb(236,233,216)" : "xp",       //WinXP 
		    "rgb(220,218,213)" : "zuneNOIR" //WinXP 
		  };    
	var $elem = $("<button>");
	$elem.css("backgroundColor", "ButtonFace");
	$("body").append($elem);
	var elem = $elem.get(0);
	if (document.defaultView && document.defaultView.getComputedStyle) {
		s = document.defaultView.getComputedStyle(elem, "");
		rgb = s && s.getPropertyValue("background-color");
	} else if (elem.currentStyle) {
		rgb = (function (el) { // get a rgb based color on IE
		var oRG =document.body.createTextRange();
		oRG.moveToElementText(el);
		var iClr=oRG.queryCommandValue("BackColor");
		return "rgb("+(iClr & 0xFF)+","+((iClr & 0xFF00)>>8)+","+((iClr & 0xFF0000)>>16)+")";
	})(elem);
	} else if (elem.style["backgroundColor"]) {
		rgb = elem.style["backgroundColor"];
	} else  {
		rgb = null;
	}
	$elem.remove();
	if(rgb){
	  rgb = rgb.replace(/[ ]+/g,"");
		$.support.windowsTheme.name = map[rgb];
	}
	$.support.windowsTheme.code = rgb;
	})();
})(jQuery);
	