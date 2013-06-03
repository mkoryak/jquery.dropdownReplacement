/**
 * jQuery.DropdownReplacement
 * Copyright (c) 2010 Mikhail Koryak - http://notetodogself.blogspot.com
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Date: 02/03/10
 *
 * @projectDescription Complete featured dropdown replacement
 * http://notetodogself.blogspot.com
 * Works with jQuery 1.4.2. Tested on FF3.6, FF3.0, IE6 on WinXP.
 *
 * @author Mikhail Koryak
 * @version 0.3
 */

;(function($){

$.fn.dropdownReplacement = function(opts){
	opts = $.extend({}, {
		options: null, //can be a JSON list ex: [{"v":"val1", "t":"test"},{"v":"v2", "t":"text2"}], prebuilt options html (see demos), or null if 'this' is a select
		selectClass: "dropdown", //class to give to the element that will act as the <select>
		optionsClass: "dropdownOpts", //the options body class
		optionsDisplayNum: 5, //number of options to display before making a scrollbar
		optionsWidthOffset: 4, //magic number that you can fiddle with if the width of the options body is wrong
		optionClass: "dropdownOpt",  //every option will have this class
		optionSelectedClass:"selectedOpt", //class to give to the selected option
		resizeOptionsToFitSelect: true, //set this to false, and if your options are 20px, and select 200px, the options will stay 20px
		resizeSelectToFitOptions: false,//if false - the options will extend beyond the select box. this may be preferable
		debounceLookupMs: 200, //when user types in order to find the option, this is the timeout between keystrokes before doing the search
		debounceArrowsMs: 50, //timeout between arrow keydowns before firing onSelect
		lookupMaxWordLength: 3, //higher the number, more you can look up by typing at the select, more memory used/slower load time.
		useHiddenInput:true, //when selected value is changed copy it to a hidden input with same name as the original element. otherwise use onSelect function to do it yourself
		onSelect : function($select, value, text, selectIndex){ 
							//this is fired when user selects something
		}
	}, opts);

	var $self = $(this);
	var $body = $("body");
	var $window = $(window);

	var textList = []; 
	var textToOption = {};//used for selecting the correct option when clicking on a select
	var textToValue = {};
	var optionLookup = {};
	var winHeight, winWidth, optionHeight, optionHeight, optionsHeight, optionsWidth, selectHeight, selectWidth;

	var $options;
	var $hiddenInputs = [];

	var $selectedOption = $([]); //
	var $selectedSelect = $([]); //which select is currently droppped down
  var selectedSelectIndex = null;
	var enableBlur = true;
	var optionsShowing = [];//list of booleans indexed

	var event = { //events
	  lastLookupWord : null,
	  lastLookupIndex: 0,
	  
		options: function(e){ //options box - this is triggered when user clicks in the options box
			var $option = $(e.target);
			if($option.is("a")){
				setOptionsVisible(false);
				hightlightSelectedOption($option); 
				setSelection();
				e.stopPropagation();
				return false;
			}
		},
		select : function(e){ //this = select box - this is trigged when user clicks the select box
			selectedSelectIndex = e.data.index;
			if(e.data.showOptions && isOptionsVisible()){
				setOptionsVisible(false);
				return;
			}
			$selectedSelect = $(this);
			var text = $selectedSelect.val();
			var $option = textToOption[text];
			setOptionsVisible(e.data.showOptions && true);
		  hightlightSelectedOption($option);
		},
		unselect: function(e){ // - this is triggered when user clicks outside the select box, or tabs out
			if(enableBlur){
				setOptionsVisible(false);
			}
		},
		optionsOver: function(){// - this is triggered when user mouses over the options box
			enableBlur = false;
			$selectedOption.removeClass(opts.optionSelectedClass);
		},
		optionsOut: function(){// - this is triggered when user mouses out of the options box
			enableBlur = true;
		},
		selectLookup: function(word){ // select an option by a <= 3 char sequence typed at the select - triggered on key up over select box/input (debounced)
			var optionList = null;
			var chop = opts.lookupMaxWordLength > word.length ? opts.lookupMaxWordLength : word.length;
			for(var i = 0; (!optionList && i < chop); i++) {//match longest first, then back down
				word = word.substring(0, opts.lookupMaxWordLength - i);
				optionList = optionLookup[word]; 
			}
			if(!optionList){
				return;
			}
			if(event.lastLookupWord === word){
				event.lastLookupIndex = event.lastLookupIndex + 1;
			} else {
				event.lastLookupIndex = 0;
				event.lastLookupWord = word;
			}
			
			if(optionList && optionList.length){
				if(optionList.length <= event.lastLookupIndex){
					event.lastLookupIndex = 0;
				}
				var $option = optionList[event.lastLookupIndex];
				hightlightSelectedOption($option);
				setSelection();
			}
		}
  };
  
	var setOptionsVisible = function(visible){
		optionsShowing[selectedSelectIndex] = visible;
		$options[(visible ? "show" : "hide")]();
		if(visible){
			repositionOptions();
		}
	};
	var isOptionsVisible = function(){
		return optionsShowing[selectedSelectIndex];
	};

	var setSelection = function(){
		var text = $selectedOption.text();
		$selectedSelect.val(text);
		opts.onSelect($selectedSelect, textToValue[text], text, selectedSelectIndex);
		if(opts.useHiddenInput){
			$hiddenInputs[selectedSelectIndex].val(textToValue[text]);
		}
	};

	var hightlightSelectedOption = function($option){
		$selectedOption.removeClass(opts.optionSelectedClass);
		if($option){
			$selectedOption = $option;
			$selectedOption.addClass(opts.optionSelectedClass);
		}
		if(isOptionsVisible() && jQuery.scrollTo){
			$option && $options.scrollTo($option);
		} 
	};

	var constructOptions = function($select){ //this is done once: order #1
	  if($select.is("select")){ //the element widgetized was a select
			var $newSelect = $("<input>");
			$options = $("<div>");
			var l = $select.find("option");
			for(var i = 0; i < l.length; i++){
				var $option = $(l[i]);
				var value = $option.val();
				var text = $option.text();
				var $newOption = $("<a>", {
					"href":"#",
					"name": value,
					"text": text,
					"class":opts.optionClass
				});
				$options.append($newOption);
				textList[textList.length] = text;
				textToOption[text] = $newOption;
				textToValue[text] = value;
				if($option.is(":selected")){
					$newSelect.val(text);
				}
			}
			$body.append($options);
			$self = $newSelect;
			$select.after($newSelect);
			$select.hide();
			if(opts.useHiddenInput){
				$hiddenInputs[0] = $select;
			}
			$newSelect.addClass(opts.selectClass);
			$newSelect.width($select.width());
			$options.width($newSelect.width());
		} else if(opts.options instanceof jQuery){ //input was widgetized, options are prebuilt
			$options = opts.options;
			var l = $options.find("a");
			for(var i = 0; i < l.length; i++){
				var $option = $(l[i]);
				var text = $option.text();
				$option.addClass(opts.optionClass);
				textList[textList.length] = text;
				textToOption[text] = $option;
				textToValue[text] = $option.attr("name");
			}
		} else { //input widgetized, options are a json list
			var l = opts.options;
			$options = $("<div>");
			for(var i = 0; i < l.length; i++){
				var $option = $("<a>", {
					href:"#",
					name: l[i].v,
					text: l[i].t,
					"class":opts.optionClass
				});
				$options.append($option);
				textList[textList.length] = l[i].t;
				textToOption[l[i].t] = $option;
				textToValue[l[i].t] = l[i].v;
			}
			$body.append($options);
		}
		$options.addClass(opts.optionsClass);
		$options.click(event.options);
		$options.mouseover(event.optionsOver);
		$options.mouseleave(event.optionsOut);
	};

	var buildTextLookupMap = function(){  //this is done once: order #2
		for(var i = 0; i < textList.length; i++){
			for(var j = 1; j < (opts.lookupMaxWordLength + 1); j++){
				if(textList[i].length >= j){
					var letters = textList[i].substring(0, j).toUpperCase();
					if(!optionLookup[letters]){
						optionLookup[letters] = [];
					}
					optionLookup[letters].push(textToOption[textList[i]]);
				}
			}
		}
	};

	var resizeOptions = function($select){ // this is done once: order #3
		var $firstOption = textToOption[textList[0]];
		$options.show();
	  optionHeight = $firstOption.outerHeight(true); //we can only get height if its visible
	  var requestedHeight = opts.optionsDisplayNum * optionHeight;
		var preferedHeight = $options.height();
		var selectWidth = $select.outerWidth(true);
		var preferedWidth = $options.outerWidth(true);
		$options.hide();
		
		if(opts.resizeSelectToFitOptions && preferedWidth > selectWidth){
			$self.each(function(){
				$(this).width(preferedWidth + opts.optionsWidthOffset);
			});
			selectWidth = preferedWidth ;
		}
		if(opts.resizeOptionsToFitSelect && preferedWidth < selectWidth){
			selectWidth -= opts.optionsWidthOffset;
		}
		$options.css({
			width:  (preferedWidth > selectWidth ? preferedWidth : selectWidth),
			height: (preferedHeight < requestedHeight ? preferedHeight : requestedHeight)
		});
	};

	var repositionOptions = function(){
		var offset = $selectedSelect.offset();
		var top = offset.top;
		var left = offset.left;
		
		if(top + optionsHeight > winHeight + $window.scrollTop() && offset.top - optionsHeight > 0){
			top = offset.top - optionsHeight;
		} else {
			top = top + selectHeight;
		}
		if(!opts.resizeSelectToFitOptions && left + optionsWidth  > winWidth){
			left -= (optionsWidth - selectWidth);
		}
		$options.css({
			"top": top ,
			"left": left
		});
		
	};

	var getDebouncedKeyUp = function() {
		var timer;
		var word = [];
		return function(e) {
			var args = arguments;
			word.push(String.fromCharCode(e.keyCode));
			clearTimeout(timer);
			timer = setTimeout(function() {
				event.selectLookup(word.join(""));
				timer = null;
				word = [];
			}, opts.debounceLookupMs);
		};
	};

	var arrowMove =	function(direction){ //direction is "prev" or "next"
		var $newSelected;
		if(direction !== "first" && direction !== "last"){
			if($selectedOption.length > 0) {
				$newSelected = $selectedOption[direction]("a");
			} else {
				$newSelected = textToOption[textList[0]]; //select first on the list if initial selection not on the list
			}
		} else {
			if(direction === "first"){
				$newSelected = textToOption[textList[0]];
			} else {
				$newSelected = textToOption[textList[textList.length - 1]];
			}
		}
		if($newSelected.length === 0){
			return false; //cant move there
		} else {
			hightlightSelectedOption($newSelected);
			return true;
		}
	};

	var debounceArrows = function() {
			var timer;
			var directions = [];
			directions[38] = "prev"; //up
			directions[40] = "next"; //down
			directions[33] = "first"; //page up
			directions[34] = "last"; //page down
			return function(e) {
				var direction = directions[e.keyCode];
				if(direction){
					if(arrowMove(direction)){
						clearTimeout(timer);
						timer = setTimeout(function() {
							setSelection();
							timer = null;
						}, opts.debounceArrowsMs); 
					}
				}
			};
	};

	var calculateWindowBounds = function(){
		winWidth = $window.width();
		winHeight = $window.height();
	};
	
	var calculateDimensions = function($select){
		selectWidth = $select.outerWidth(true);
		selectHeight = $select.outerHeight(true);
		optionsHeight = $options.outerHeight(true);
		optionsWidth = $options.outerWidth(true);
	};

	var init = function(){
		var $firstSelect = $($self[0]);
		constructOptions($firstSelect);
		buildTextLookupMap();
		calculateWindowBounds();
		
		$self.each(function(index){
			var $select = $(this);
			$select.addClass(opts.selectClass);
			if(index === 0){
				resizeOptions($select);
				calculateDimensions($select);
			}
			if(opts.useHiddenInput){
			  var $hiddenInput = $("<input>", {
			  	name: $select.attr("name")
			  });
			  $hiddenInput.val(textToValue[$select.val()]);
			  $select.attr("name", "");
			  $hiddenInput.attr("hidden","true");
			  $select.after($hiddenInput);
			  $hiddenInput.hide();
				$hiddenInputs[index] = $hiddenInput;
			}
			
			$select.attr("readonly", "true");
			$select.bind("click", {"index":index, "showOptions": true}, event.select)
						 .bind("blur",{"index":index},event.unselect)
						 .bind("focus",{"index":index, "showOptions": false},event.select)
						 .keyup(getDebouncedKeyUp())
						 .keydown(debounceArrows())
						 .keydown(function(e){
								if(e.keyCode == 13 || e.keyCode == 27){
									setOptionsVisible(false);
									$select.blur();
								}
							});
		});
		$window.resize(function(){
			calculateWindowBounds();
			setOptionsVisible(false);
		});
	};
	init();
	return this;
};
}(jQuery));