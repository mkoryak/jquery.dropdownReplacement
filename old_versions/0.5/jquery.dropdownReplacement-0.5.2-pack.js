(function(e){e.dropdownReplacement={defaults:{options:null,selectClass:null,optionsClass:"dropdownOpts",optionsDisplayNum:25,optionClass:"dropdownOpt",optionSelectedClass:"selectedOpt",resizeSelectToFitOptions:false,useHiddenInput:true,resizeOptionsToFitSelect:true,selectCssWidth:null,optionsWidthOffset:3,debounceLookupMs:200,debounceArrowsMs:50,lookupMaxWordLength:3,scrollWidth:17,ellipsisSelectText:true,ellipsisText:"...",charWidth:null,onInit:function(){},onSelect:function(){}}};e.expr[":"].dr= function(c,q,A){q=A[3];return(c=e(c).dropdownReplacement("option"))&&(c.getSelect().is(q)||c.getHidden()?c.getHidden().is(q):false)};e.fn.dropdownReplacement=function(c){var q=arguments;c&&c.options&&e.isFunction(c.options)?e(this).each(function(){Q.apply(e(this),q)}):Q.apply(this,q);return this};var Q=function(c,q){if(typeof c==="string"&&c==="option"){var A=e(this).data("dropdownReplacement");return arguments.length==2?A[q]():A}c=e.extend({},e.dropdownReplacement.defaults,e.isFunction(c)?{onSelect:c}: c);var B=this,R=e("body"),C=e(window),S=e.browser.msie&&parseInt(e.browser.version,10)==8,aa=e.browser.msie&&parseInt(e.browser.version,10)<=7,m=[],o={},s={},w={},D={},E,F,G,I,T,n,h,t=[],u=e([]),p=e([]),l=null,U=[],J=true,K=[],H=null,V=null,L={},M=[],W=-1,ba={selectClass:"dropdown"},N=e([]),k={lastLookupWord:null,lastLookupIndex:0,noActions:false,options:function(a){a=e(a.target);if(a.is("a")){x(false);y(a);z();return false}else{k.noActions=true;p.trigger("focus")}},focus:function(a){p=e(this);l= a.data.index;if(k.noActions)k.noActions=false;else{a=O();y(o[a]);this.selectionStart=this.selectionEnd=-1}},select:function(a){p=e(this);this.selectionStart=this.selectionEnd=-1;l=a.data.index;if(K[l])x(false);else{a=O();a=o[a];x(true);y(a)}},unselect:function(){J&&x(false)},optionsOver:function(){J=false;u.removeClass(c.optionSelectedClass)},optionsOut:function(){J=true},selectLookup:function(a){for(var b=null,d=c.lookupMaxWordLength>a.length?c.lookupMaxWordLength:a.length,f=0;!b&&f<d;f++){a=a.substring(0, c.lookupMaxWordLength-f);b=D[a]}if(b){if(k.lastLookupWord===a)k.lastLookupIndex+=1;else{k.lastLookupIndex=0;k.lastLookupWord=a}if(b&&b.length){if(b.length<=k.lastLookupIndex)k.lastLookupIndex=0;y(b[k.lastLookupIndex]);z()}}}},P=function(a){if(c.charWidth)return c.charWidth;a=a||"a b c d e f 1 2 3 4 5 6 A B C D E F ! ! %";if(!L[a]){var b=e("<span>",{text:a,"class":c.selectClass,css:{background:"none",margin:0,padding:0,overflow:"visible",width:"auto",color:"#FFF"}});R.append(b);L[a]=b.width()/a.length; b.remove()}return L[a]},x=function(a){if(K[l]=a){var b=p.offset(),d=b.top,f=b.left;d=d+G>E+C.scrollTop()&&b.top-G>0?b.top-G:d+T-(e.browser.webkit?5:0);if(!c.resizeSelectToFitOptions&&f+I>F)f-=I-n;h.css({top:d,left:f})}h[a?"show":"hide"]();a&&X(p)},z=function(a){a=a||u.text();var b=w[a];Y(p,a);c.useHiddenInput&&t[l].val(b);c.onSelect.apply(p,[b,a,l])},O=function(a){return U[arguments.length?a:l]},Y=function(a,b){U[l]=b;if(c.ellipsisSelectText){H=P(b);var d=~~(a.width()/H);if(d<b.length){d-=~~((V+5)/ H);b=b.substring(0,d)+c.ellipsisText}}a.val(b)},y=function(a){u.removeClass(c.optionSelectedClass);if(a){u=a;u.addClass(c.optionSelectedClass)}K[l]&&jQuery.scrollTo&&a&&h.scrollTo(a)},da=function(a){l=0;var b=function(){h=c.options;for(var g=[],i=h.find("a"),j=0;j<i.length;j++){var r=e(i[j]);g[j]={t:r.text(),v:r.attr("name")};r.addClass(c.optionClass);o[g[j].t]=r;s[g[j].v]=g[j].t}c.options=g},d=function(){var g=c.options;g.length==0&&v("options list must contain values, ex: [{'t':'text', 'v':'value'}]"); if(typeof g[0].t=="undefined"||typeof g[0].v=="undefined")v("options json list must contain a list of objects with 2 keys: 't', and 'v'. ex: [{'t':'text', 'v':'value'}]");h=e("<div>");for(var i=0;i<g.length;i++){var j=e("<a>",{href:"#",name:g[i].v,text:g[i].t,"class":c.optionClass});h.append(j);o[g[i].t]=j;s[g[i].v]=g[i].t}R.append(h)},f=function(){if(B.length>1)throw v("trying to widgetize more then ONE 'select' at a time is not supported. You can widgetize multiple 'input' elements.");var g=a.find("option"); if(g.length===0)throw v("'select' must have ONE or more options elements as children in order to widgetize the select");c.options=[];for(var i=e("<input>",{css:{width:a.width()}}),j=0;j<g.length;j++){var r=e(g[j]),ca=r.val(),Z=r.text();c.options[j]={t:Z,v:ca};r.is(":selected")&&i.val(Z)}a.after(i);if(c.useHiddenInput){t[0]=a;a.hide()}else{i.attr("name",a.attr("name"));a.remove()}a=B=i;d()};if(c.options&&e.isFunction(c.options))c.options=c.options.apply(a,[]);if(a.is("select"))f();else if(c.options instanceof jQuery)b();else if(c.options.length)d();else throw v("options must be either a json list or a jQuery object. But it is: "+c.options);b=c.options;for(f=0;f<b.length;f++){m[m.length]=b[f].t;w[b[f].t]=b[f].v}h.addClass(c.optionsClass);h.click(k.options);h.mouseover(k.optionsOver);h.mouseleave(k.optionsOut);e.fn.bgiframe&&h.bgiframe();W=h.width()},ea=function(){for(var a=0;a<m.length;a++)for(var b=1;b<c.lookupMaxWordLength+1;b++)if(m[a].length>=b){var d=m[a].substring(0,b).toUpperCase();D[d]||(D[d]=[]); D[d].push(o[m[a]])}},fa=function(a){var b=o[m[0]];h.show();var d=a.is(":visible");d||a.show();b=b.outerHeight(true);b=c.optionsDisplayNum*b;var f=h.height();X(a);d||a.hide();h.hide();h.css({height:(f<b?f:b)+(S?2:0)})},X=function(a){var b=M[l];n=a.outerWidth(true);var d=h.width();if(!(d==b&&n==d)){if(c.resizeSelectToFitOptions&&d>n){a.width(d+c.optionsWidthOffset);n=d}if(c.resizeOptionsToFitSelect&&d<n)n-=c.optionsWidthOffset;else if(c.resizeOptionsToFitSelect&&d>n&&d>W)d=n-c.optionsWidthOffset;b= d>n?d:n;a.data("dropdownReplancement.width",b);M[l]=b;h.width(b)}},ga=function(){var a,b=[];return function(d){b.push(String.fromCharCode(d.keyCode));clearTimeout(a);a=setTimeout(function(){k.selectLookup(b.join(""));a=null;b=[]},c.debounceLookupMs)}},ha=function(a){a=a!=="first"&&a!=="last"?u.length>0?u[a]("a"):o[m[0]]:a==="first"?o[m[0]]:o[m[m.length-1]];if(a.length===0)return false;else{y(a);return true}},ia=function(){var a,b=[];b[38]="prev";b[40]="next";b[33]="first";b[34]="last";return function(d){if(d= b[d.keyCode])if(ha(d)){clearTimeout(a);a=setTimeout(function(){z();a=null},c.debounceArrowsMs)}}},$=function(){var a=F,b=E;F=C.width();E=C.height();b=Math.abs(b-E);return Math.abs(a-F)>c.scrollWidth&&b>c.scrollWidth},ja=function(a){var b=a.is(":visible");b||a.show();n=a.outerWidth(true);T=a.outerHeight(true);G=h.outerHeight(true);I=h.outerWidth(true);b||a.hide()},ka=function(a){a.addClass(ba.selectClass);c.selectClass&&a.addClass(c.selectClass);if(e.support.windowsTheme&&e.support.windowsTheme.name){a.addClass("dd-theme-"+ e.support.windowsTheme.name);h.addClass("opt-theme-"+e.support.windowsTheme.name)}else a.addClass("dd-all");aa&&a.addClass("dd-oldIE")},v=function(a){return"jquery.dropdownReplacement exception: "+a},la=function(a,b,d){var f={val:function(g){if(arguments.length==1){var i=g=s[g]?g:w[m[0]];l=d;p=a;z(s[i])}else return w[a.val()]},text:function(g){if(g){g=w[g];l=d;p=a;z(s[g])}else return O(d)},getSelect:function(){return a},getHidden:function(){return b},getOptions:function(){return h}};a.data("dropdownReplacement", f);b&&b.data("dropdownReplacement",f)};(function(){if(!jQuery.scrollTo)throw v("jquery.scrollTo plugin is required for this plugin. http://plugins.jquery.com/project/ScrollTo");if(S)c.optionsWidthOffset-=3;var a=e(B[0]);if(c.ellipsisSelectText){H=P();V=P(c.ellipsisText)*c.ellipsisText.length}da(a);ea();$();C.resize(function(){$()&&x(false)});B.each(function(b){var d=e(this),f,g=d.is("select");M[b]=-1;if(!d.is("input")&&!g)throw v("root element must be an 'input' or 'select'");l=b;if(c.useHiddenInput&& !g&&!t[b]){f=e("<input>");f.val(d.val());d.after(f)}else f=d;N=N.add(f);c.selectCssWidth&&f.css({width:c.selectCssWidth});ka(f);if(b===0){fa(f);ja(f)}var i=f.val();if(c.useHiddenInput&&!g&&s[i])i=s[i];else w[i]||(i=m[0]);Y(f,i);if(c.useHiddenInput&&!t[b]){d.hide();t[b]=d}la(f,t[b],b);f.attr("readonly","true");f.bind("click",{index:b},k.select).bind("blur",{index:b},k.unselect).bind("focus",{index:b},k.focus).keyup(ga()).keydown(ia()).keydown(function(j){if(j.keyCode==13||j.keyCode==27){x(false);f.blur()}}); c.onInit(f,t[b])})})();return N}})(jQuery);