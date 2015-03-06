(function($) {

var BUE = window.BUE = window.BUE || {preset: {}, templates: {}, instances: [], preprocess: {}, postprocess: {}};

// Get editor settings from Drupal.settings and process preset textareas.
Drupal.behaviors.BUE = {attach: function(context, settings) {
  var set = settings.BUE, tpls = BUE.templates, pset = BUE.preset;
  if (set) {
    $.each(set.templates, function (id, tpl) {
      tpls[id] = tpls[id] || $.extend({}, tpl);
    });
    $.extend(pset, set.preset);
    set.templates = {};
    set.preset = {};
  }
  $.each(pset, function (tid, tplid) {
    BUE.processTextarea($('#'+ tid, context).get(0), tplid);
  });
  // Fix enter key on textfields triggering button click.
  $('input:text', context).bind('keydown.bue', BUE.eFixEnter);
}};

// Integrate editor template into textarea T
BUE.processTextarea = function (T, tplid) {
  if (!T || !BUE.templates[tplid] || !(T = $(T).filter('textarea')[0])) return false;
  // Check visibility on the element-level only.
  if (T.style.display == 'none' || T.style.visibility == 'hidden') return false;
  if (T.bue) return T.bue;
  var E = new BUE.instance(T, tplid);
  !BUE.active || BUE.active.textArea.disabled ? E.activate() : E.accesskeys(false);
  // Pre&post process.
  for (var i in BUE.preprocess) BUE.preprocess[i](E, $);
  for (var i in BUE.postprocess) BUE.postprocess[i](E, $);
  return E;
};

// Create an editor instance
BUE.instance = function (T, tplid) {
  var i = BUE.instances.length, E = T.bue = BUE.instances[i] = this;
  E.index = i;
  E.textArea = T;
  E.tplid = tplid;
  E.tpl = BUE.templates[tplid];
  E.bindex = null;
  E.safeToPreview = T.value.indexOf('<') == -1;
  E.UI = BUE.$html(BUE.theme(tplid).replace(/\%n/g, i)).insertBefore(T).bind('keydown.bue', BUE.eUIKeydown);
  E.buttons = $('.bue-button', E.UI).each(function(i, B) {
    var arr = B.id.split('-');
    $($.extend(B, {eindex: arr[1], bid: arr[3], bindex: i})).bind('click.bue', BUE.eButtonClick);
  }).get();
  $(T).bind('focus.bue', BUE.eTextareaFocus);
};

// Execute button's click event
BUE.buttonClick = function (eindex, bindex) { try {
  var E = BUE.instances[eindex].activate();
  var domB = E.buttons[bindex];
  var tplB = E.tpl.buttons[domB.bid];
  var content = tplB[1];
  E.bindex = bindex;
  E.dialog.close();
  if (tplB[4]) {
    tplB[4](E, $);
  }
  else if (content) {
    var arr = content.split('%TEXT%');
    if (arr.length == 2) E.tagSelection(arr[0], arr[1]);
    else E.replaceSelection(arr.length == 1 ? content : arr.join(E.getSelection()), 'end');
  }
  !(domB.pops || domB.stayClicked) && E.focus();
  } catch (e) {alert(e.name +': '+ e.message);}
  return false;
};

// Return html for editor templates.
BUE.theme = function (tplid) {
  var tpl = BUE.templates[tplid] || {html: ''}, html = '', sprite;
  if (typeof tpl.html == 'string') return tpl.html;
  // Load sprite
  if (sprite = tpl.sprite) {
    var surl = (new Image()).src = sprite.url, sunit = sprite.unit, sx1 = sprite.x1;
    $(document.body).append('<style type="text/css" media="all">.bue-'+ tplid +' .bue-sprite-button {background-image: url('+ surl +'); width: '+ sunit +'px; height: '+ sunit +'px;}</style>');
  }
  var access = $.browser.mozilla && 'Shift + Alt' || ($.browser.msie || window.chrome) && 'Alt', title, content, icon, key, func;
  // Create html for buttons. B(0-title, 1-content, 2-icon or caption, 3-accesskey) and 4-function for js buttons
  for (var B, isimg, src, type, btype, attr, alt, i = 0, s = 0; B = tpl.buttons[i]; i++) {
    // Empty button.
    if (B.length == 0) {
      s++;
      continue;
    }
    title = B[0], content = B[1], icon = B[2], key = B[3], func = null;
    // Set button function
    if (content.substr(0, 3) == 'js:') {
      func = B[4] = new Function('E', '$', content.substr(3));
    }
    isimg = (/\.(png|gif|jpg)$/i).test(icon);
    // Theme button.
    if (title.substr(0, 4) == 'tpl:') {
      html += func ? (func(null, $) || '') : content;
      html += icon ? ('<span class="separator">'+ (isimg ? '<img src="'+ tpl.iconpath +'/'+ icon +'" />' : icon) +'</span>') : '';
      continue;
    }
    // Text button
    if (!isimg) {
      type = 'button', btype = 'text', attr = 'value="'+ icon +'"';
    }
    else {
      type = 'image';
      // Sprite button
      if (sprite) {
        btype = 'sprite', attr = 'src="'+ sx1 +'" style="background-position: -'+ (s * sunit) +'px 0;"';
        s++;
      }
      // Image button
      else {
        btype = 'image', attr = 'src="'+ tpl.iconpath +'/'+ icon +'"';
      }
    }
    alt = title + (key ? '('+ key +')' : '');
    title += access && key ? ' ('+ access +' + '+ key +')' : '';
    html += '<input type="'+ type +'" alt="'+ alt +'" title="'+ title +'" accesskey="'+ key +'" id="bue-%n-button-'+ i +'" class="bue-button bue-'+ btype +'-button editor-'+ btype +'-button" '+ attr +' tabindex="'+ (i ? -1 : 0) +'" />';
  }
  return tpl.html = '<div class="bue-ui bue-'+ tplid +' editor-container clearfix" id="bue-ui-%n" role="toolbar">'+ html +'</div>';
};

// Cross browser selection handling. 0-1=All, 2=IE, 3=Opera
BUE.mode = document.createElement('textarea').setSelectionRange ? ($.browser.opera ? 3 : 1) : (document.selection && document.selection.createRange ? 2 : 0);

// New line standardization. At least make them represented by a single char.
BUE.text = BUE.processText = BUE.mode < 2 ? function (s) {return s.toString()} : function (s) {return s.toString().replace(/\r\n/g, '\n')};

// Create selection in a textarea
BUE.selMake = BUE.mode == 2 ? function (T, start, end) {
  var range = T.createTextRange();
  range.collapse();
  range.moveEnd('character', end);
  range.moveStart('character', start);
  range.select();
} :
BUE.mode == 3 ? function (T, start, end) {
  var text = BUE.text(T.value), i = text.substring(0, start).split('\n').length, j = text.substring(start, end).split('\n').length;
  T.setSelectionRange(start + i -1 , end + i + j - 2);
} :
BUE.mode == 1 ? function (T, start, end) {
  T.setSelectionRange(start, end);
} :
function (T, start, end) {};

// Return the selection coordinates in a textarea
BUE.selPos = BUE.mode == 2 ? function (T) {
  T.focus();
  var orange = document.selection.createRange(), range = orange.duplicate();
  range.moveToElementText(T);
  range.setEndPoint('EndToEnd', orange);
  var otext = orange.text, olen = otext.length, prelen = range.text.length - olen;
  var start = prelen - (T.value.substr(0, prelen).split('\r\n').length - 1);
  start && range.moveStart('character', start);
  for (; range.compareEndPoints('StartToStart', orange) < 0; start++) {
    range.moveStart('character', 1);
  }
  var end = start + olen - (otext.split('\r\n').length - 1);
  for (; range.compareEndPoints('EndToStart', orange) > 0; end++) {
    range.moveEnd('character', -1);
    if (range.text.length != olen) break;
  }
  return {start: start, end: end};
} :
BUE.mode == 3 ? function (T) {
  var start = T.selectionStart || 0, end = T.selectionEnd || 0, val = T.value;
  var i = val.substring(0, start).split('\r\n').length, j = val.substring(start, end).split('\r\n').length;
  return {start: start - i + 1, end: end - i - j + 2};
} :
function (T) {
  return {start: T.selectionStart || 0, end: T.selectionEnd || 0}
};

// Enter key fixer for text fields
BUE.eFixEnter = function(e) {
  e.keyCode == 13 && (BUE.enterKeyTime = new Date());
};

// Button click handler
BUE.eButtonClick = function(e) {
  return !(BUE.enterKeyTime && new Date() - BUE.enterKeyTime < 500) && BUE.buttonClick(this.eindex, this.bindex);
};

// Textarea focus handler
BUE.eTextareaFocus = function(e) {
  this.bue && !this.bue.dialog.esp && this.bue.activate();
};

// UI keydown handler
BUE.eUIKeydown = function(e) {
  if (e.keyCode != 37 && e.keyCode != 39) return;
  var len, E = BUE.instances[this.id.split('-').pop()];
  if (E && (len = E.buttons.length)) {
    var A = document.activeElement, i = Math.max(-1, (A && A.eindex == E.index ? A.bindex : -1) + e.keyCode - 38) + len;
    E.buttons[i % len].focus();
  }
};

// Html 2 jquery. Faster than $(html)
BUE.$html = function(s){
  var div = document.createElement('div');
  div.innerHTML = s;
  return $(div.childNodes);
};

// Backward compatibility.
window.editor = window.editor || BUE;

})(jQuery);


// Bueditor instance methods
(function(E) {

// Focus on editor textarea.
E.focus = function () {
  this.textArea.focus();
  return this;
};

// Return textarea content
E.getContent = function () {
  return BUE.text(this.textArea.value);
};

// Set textarea content
E.setContent = function (content) {
  var T = this.textArea, st = T.scrollTop;
  T.value = content;
  T.scrollTop = st;
  return this;
};

// Return selected text
E.getSelection = function () {
  var pos = this.posSelection();
  return this.getContent().substring(pos.start, pos.end);
};

// Replace selected text
E.replaceSelection = function (txt, cursor) {
  var E = this, pos = E.posSelection(), content = E.getContent(), txt = BUE.text(txt);
  var end = cursor == 'start' ? pos.start : pos.start+txt.length, start = cursor == 'end' ? end : pos.start;
  E.setContent(content.substr(0, pos.start) + txt + content.substr(pos.end));
  return E.makeSelection(start, end);
};

// Wrap selected text.
E.tagSelection = function (left, right, cursor) {
  var E = this, pos = E.posSelection(), content = E.getContent();
  var left = BUE.text(left), right = BUE.text(right), llen = left.length;
  var end = cursor == 'start' ? pos.start+llen : pos.end+llen, start = cursor == 'end' ? end : pos.start+llen;
  E.setContent(content.substr(0, pos.start) + left + content.substring(pos.start, pos.end) + right + content.substr(pos.end));
  return E.makeSelection(start, end);
};

// Make a new selection
E.makeSelection = function (start, end) {
  var E = this;
  if (end === undefined || end < start) end = start;
  BUE.selMake(E.textArea, start, end);
  E.dialog.esp && (E.dialog.esp = {start: start, end: end}) || E.focus();
  return E;
};

// Return selection coordinates.
E.posSelection = function () {
  return this.dialog.esp || BUE.selPos(this.textArea);
};

// Enable/disable editor buttons
E.buttonsDisabled = function (state, bindex) {
  for (var B, i=0; B = this.buttons[i]; i++) {
    B.disabled = i == bindex ? !state : state;
  }
  return this;
};

// Make active/custom button stay clicked
E.stayClicked = function (state, bindex) {
  var B = this.buttons[bindex === undefined ? this.bindex : bindex];
  B && jQuery(B)[state ? 'addClass' : 'removeClass']('stay-clicked') && (B.stayClicked = state || false);
  return this;
};

// Enable/disable button accesskeys
E.accesskeys = function (state) {
  for (var B, i=0; B = this.buttons[i]; i++) {
    B.accessKey = state ? this.tpl.buttons[B.bid][3] : '';
  }
  return this;
};

// Activate editor and make it BUE.active
E.activate = function() {
  var E = this, A = BUE.active || null;
  if (E == A) return E;
  A && A.accesskeys(false) && E.accesskeys(true);
  return BUE.active = E;
};

// Reserve dialog and quickPop
var pop = E.dialog = E.quickPop = BUE.dialog = BUE.quickPop = {};
pop.open = pop.close = function(){};

})(BUE.instance.prototype);;
//Merged and minified: bue.popup.js, bue.markup.js, bue.preview.js, bue.imce.js, bue.misc.js
(function(b,a){BUE.popups=BUE.popups||{};BUE.popHtml='<table class="bue-popup" style="display: none;" role="dialog"><tbody class="bue-zero"><tr class="bue-zero"><td class="bue-zero"><div class="bue-popup-head clearfix"><div class="bue-popup-title"></div><button class="bue-popup-close" type="button">x</button></div><div class="bue-popup-body"><div class="bue-popup-content clearfix"></div></div></td></tr></tbody></table>';BUE.openPopup=function(f,e,d,c){return BUE.createPopup(f).open(e,d,c)};BUE.createPopup=function(i,h,f){if(BUE.popups[i]){return BUE.popups[i]}var c=BUE.$html(BUE.popHtml).appendTo("body").attr("id",i);var e=c.find(".bue-popup-title").html(h||"");var d=c.find(".bue-popup-content").html(f||"");var g=BUE.popups[i]=c[0];g.open=function(o,l,k){if(o!==undefined&&o!==null){e.html(o)}if(l!==undefined&&l!==null){d.html(l)}var m=g.bue=BUE.active,q=m.buttons[m.bindex||0];k=typeof k=="string"?{effect:k}:k;k=a.extend({effect:"show",speed:"normal",callback:g.onopen},k);k.onopen=k.onopen||k.callback;if(!k.offset&&q){var p=a(q).offset(),j=c.width(),n=Math.max(15,p.left-j/2+15);k.offset={left:n-Math.max(0,n+j-a(window).width()+15),top:p.top+15};q.pops=true}c.css(k.offset);if(k.effect=="show"){c.show();k.onopen&&k.onopen.call(g)}else{c[k.effect](k.speed,k.onopen)}g.onclose=k.onclose||false;return g};g.close=function(j){c.stop(true,true)[j||"hide"]();g.onclose&&g.onclose.call(g);return g};g.closenfocus=function(){g.close().bue.focus();return g};g.onopen=function(){if(c.css("display")!="none"){var j=c.focus().find("form");if(j.size()){a(j[0].elements[0]).focus()}else{c.find("a:first").focus()}}return g};c.attr("tabindex",0);c.find(".bue-popup-close").click(g.closenfocus)[0].title=Drupal.t("Close");c.keydown(function(j){if(j.keyCode==27){g.closenfocus();return false}});c.find(".bue-popup-head").mousedown(function(l){var m={X:parseInt(c.css("left"))-l.pageX,Y:parseInt(c.css("top"))-l.pageY};var k=function(n){c.css({left:m.X+n.pageX,top:m.Y+n.pageY});return false};var j=function(n){a(document).unbind("mousemove",k).unbind("mouseup",j)};a(document).mousemove(k).mouseup(j);return false});return g};BUE.preprocess=a.extend({popup:function(j,f){if(j.index){return}var c=b.dialog=BUE.dialog=BUE.createPopup("bue-dialog");var e=function(){this.blur()};var i=c.open,d=c.close;c.open=function(p,n,m){c.esp&&c.close();var o=BUE.active;o.buttonsDisabled(true).stayClicked(true);c.esp=o.posSelection();f(o.textArea).bind("focus.bue",e);return i(p,n,m)};c.close=function(m){if(!c.esp){return c}var n=c.bue;f(n.textArea).unbind("focus.bue",e);n.buttonsDisabled(false).stayClicked(false);n==BUE.active&&n.makeSelection(c.esp.start,c.esp.end);c.esp=null;return d(m)};var g=b.quickPop=BUE.quickPop=BUE.createPopup("bue-quick-pop");var l=g.open,h=g.close,k=f(g);g.open=function(n,m){f(document).mouseup(g.close);return l(null,n,m)};g.close=function(){f(document).unbind("mouseup",g.close);return h()};k.keydown(function(o){switch(o.keyCode){case 13:setTimeout(g.closenfocus);break;case 38:case 40:var n=k.find("a"),m=n.index(document.activeElement);n.eq(m+o.keyCode-39).focus();return false}});k.find(".bue-popup-head").css({display:"none"})}},BUE.preprocess)})(BUE.instance.prototype,jQuery);(function(d,c){BUE.html=function(g,l,f){var e=f||{},h=l||"";var k="<"+g;for(var j in e){k+=e[j]==null?"":" "+j+'="'+e[j]+'"'}k+=a(g)?(" />"+h):(">"+h+"</"+g+">");return g?k:h};BUE.objHtml=function(e){return e&&e.tag?b(e.tag,e.html,e.attributes):""};BUE.input=function(g,h,f,e){return b("input","",c.extend({type:g,name:h,value:f||null},e))};BUE.selectbox=function(k,f,j,e){var j=j||{},h="";for(var g in j){h+=b("option",j[g],{value:g,selected:g==f?"selected":null})}return b("select",h,c.extend({},e,{name:k}))};BUE.table=function(j,e){for(var h,g="",f=0;h=j[f];f++){g+=h.data===undefined?BUE.trow(h):BUE.trow(h.data,h.attr)}return b("table",g,e)};BUE.trow=function(f,e){for(var j,h="",g=0;j=f[g];g++){h+=j.data===undefined?b("td",j):b("td",j.data,j.attr)}return b("tr",h,e)};BUE.regesc=function(e){return e.replace(/([\\\^\$\*\+\?\.\(\)\[\]\{\}\|\:])/g,"\\$1")};BUE.nctag=function(e){return !e||/^(img|input|hr|br|embed|param)$/.test(e)};BUE.parseHtml=function(k,g){var l=new RegExp("^<("+(g||"[a-z][a-z0-9]*")+")([^>]*)>($|((?:.|[\r\n])*)</\\1>$)");if(!(h=k.match(l))||(!h[3]&&!a(h[1]))){return null}var g=h[1],f=[],e={},h;if((f=h[2].split('"')).length>1){for(var j=0;f[j+1]!==undefined;j+=2){e[f[j].replace(/\s|\=/g,"")]=f[j+1]}}return{tag:g,attributes:e,html:h[4]}};d.insertObj=function(l,h){if(!l||!l.tag){return this}var j=this,e=l.tag,h=c.extend({cursor:null,extend:true,toggle:false},h);var k,i=j.getSelection(),f=i&&h.extend&&BUE.parseHtml(i);if(k=f&&f.tag==e){if(h.toggle){return j.replaceSelection(f.html,h.cursor)}var l={tag:e,html:typeof l.html!="string"||l.html==i?f.html:l.html,attributes:c.extend(f.attributes,l.attributes)}}if(k||a(e)||l.html){return j.replaceSelection(BUE.objHtml(l),h.cursor)}var g=b(e,"",l.attributes);return j.tagSelection(g.substr(0,g.length-e.length-3),"</"+e+">",h.cursor)};var b=BUE.html;var a=BUE.nctag})(BUE.instance.prototype,jQuery);eDefHTML=BUE.html;eDefInput=BUE.input;eDefSelectBox=BUE.selectbox;eDefTable=BUE.table;eDefRow=BUE.trow;eDefNoEnd=BUE.nctag;eDefRegEsc=BUE.regesc;eDefParseTag=BUE.parseHtml;eDefInputText=function(c,a,b){return BUE.input("text",c,a,{size:b||null})};eDefInputSubmit=function(b,a){return BUE.input("submit",b,a)};(function(b,a){b.prv=function(e){var d=this;if(d.prvOn){return d.prvHide()}var e=e===undefined?true:e;var c=d.getContent();if(e&&!(d.safeToPreview=d.safeToPreview||c.indexOf("<")==-1)){c='<div class="warning">'+Drupal.t("The preview is disabled due to previously inserted HTML code in the content. This aims to protect you from any potentially harmful code inserted by other editors or users. If you own the content, just preview an empty text to re-enable the preview.")+"</div>"}return d.prvShow(BUE.autop(c))};b.prvShow=function(d,e){var f=this;var g=a(f.textArea);var c=a(f.preview=f.preview||BUE.$html('<div class="preview bue-preview" style="display:none; overflow:auto"></div>').insertBefore(g)[0]);if(e===undefined||e){d='<div class="'+(f.textArea.name=="comment"?"comment":"node")+'"><div class="content">'+d+"</div></div>"}if(f.prvOn){c.html(d);return f}f.prvPos=f.posSelection();c.show().height(g.height()).width(g.width()).html(d);g.height(1);f.buttonsDisabled(true,f.bindex).stayClicked(true);f.prvOn=true;return f};b.prvHide=function(){var d=this;if(d.prvOn){var c=a(d.preview);a(d.textArea).height(c.height());c.hide();d.buttonsDisabled(false).stayClicked(false);d.prvOn=false;d.prvPos&&(d.makeSelection(d.prvPos.start,d.prvPos.end).prvPos=null)}return d};b.prvAjax=function(e,f){var d=this,c;if(d.prvOn){return d.prvHide()}if(!(c=a.ajaxMarkup)){return d.prvShow(Drupal.t('Preview requires <a href="http://drupal.org/project/ajax_markup">Ajax markup</a> module with proper permissions set.'))}if(e&&e.call){f=e;e=0}d.prvShow('<div class="bue-prv-loading">'+Drupal.t("Loading...")+"</div>");c(d.getContent(),e||c.getFormat(d.textArea),function(h,g,i){d.prvOn&&d.prvShow(g?h:h.replace(/\n/g,"<br />"))&&(f||Drupal.attachBehaviors)(d.preview)});return d};BUE.autop=function(d){if(d==""||!(/\n|\r/).test(d)){return d}var f=function(h,i,g){return h.replace(new RegExp(i,"g"),g)};var c=function(h,g){return d=f(d,h,g)};var e="(table|thead|tfoot|caption|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|style|script|object|input|param|p|h[1-6])";d+="\n";c("<br />\\s*<br />","\n\n");c("(<"+e+"[^>]*>)","\n$1");c("(</"+e+">)","$1\n\n");c("\r\n|\r","\n");c("\n\n+","\n\n");c("\n?((.|\n)+?)\n\\s*\n","<p>$1</p>\n");c("\n?((.|\n)+?)$","<p>$1</p>\n");c("<p>\\s*?</p>","");c("<p>(<div[^>]*>\\s*)","$1<p>");c("<p>([^<]+)\\s*?(</(div|address|form)[^>]*>)","<p>$1</p>$2");c("<p>\\s*(</?"+e+"[^>]*>)\\s*</p>","$1");c("<p>(<li.+?)</p>","$1");c("<p><blockquote([^>]*)>","<blockquote$1><p>");c("</blockquote></p>","</p></blockquote>");c("<p>\\s*(</?"+e+"[^>]*>)","$1");c("(</?"+e+"[^>]*>)\\s*</p>","$1");c("<(script|style)(.|\n)*?</\\1>",function(g){return f(g,"\n","<PNL>")});c("(<br />)?\\s*\n","<br />\n");c("<PNL>","\n");c("(</?"+e+"[^>]*>)\\s*<br />","$1");c("<br />(\\s*</?(p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)","$1");if(d.indexOf("<pre")!=-1){c("(<pre(.|\n)*?>)((.|\n)*?)</pre>",function(j,i,h,g){return f(i,"\\\\(['\"\\\\])","$1")+f(f(f(g,"<p>","\n"),"</p>|<br />",""),"\\\\(['\"\\\\])","$1")+"</pre>"})}return c("\n</p>$","</p>")}})(BUE.instance.prototype,jQuery);eDefAutoP=BUE.autop;eDefPreview=function(){BUE.active.prv()};eDefPreviewShow=function(c,b,a){c.prvShow(b,a)};eDefPreviewHide=function(a){a.prvHide()};eDefAjaxPreview=function(){BUE.active.prvAjax()};(function(c,b){var a=c.imce=BUE.imce={};b(function(){a.url=Drupal.settings.BUE.imceURL||""});a.button=function(e,d){return a.url?'<input type="button" id="bue-imce-button" name="bue_imce_button" class="form-submit" value="'+(d||Drupal.t("Browse"))+'" onclick="BUE.imce.open(this.form.elements[\''+e+"'])\">":""};a.open=function(e){if(!a.url){return}a.ready=a.sendto=function(){},a.target=null;b.extend(a,e.focus?{target:e,ready:a.readyDefault,sendto:a.sendtoDefault}:e);if(a.pop){a.setPos();a.ready(a.win,a.pop)}else{var d=a.url+(a.url.indexOf("?")<0?"?":"&")+"app=bue|imceload@bueImceLoad|";a.pop=BUE.createPopup("bue-imce-pop",Drupal.t("File Browser"),'<iframe src="'+d+'" frameborder="0"></iframe>');a.setPos()}};a.setPos=function(){var d=b(a.pop),f=b(window),e=b.browser.opera?window.innerHeight:f.height();a.pop.open(null,null,{offset:{left:Math.max(0,(f.width()-d.width())/2),top:f.scrollTop()+Math.max(0,(e-d.height())/2)}})};a.finish=function(d,e){a.sendto(d,e,a.pop)};a.sendtoDefault=function(f,j,d){var h=a.target,g=h.form.elements,k={alt:f.name,width:f.width,height:f.height};h.value=f.url;for(var e in k){if(g["attr_"+e]){g["attr_"+e].value=k[e]}}d.close();h.focus()};a.readyDefault=function(g,d){var e=g.imce,f=a.target&&a.target.value;f&&e.highlight(f.substr(f.lastIndexOf("/")+1));if(e.fileKeys&&!e.fileKeys.k27){e.fileKeys.k27=function(h){d.closenfocus();a.target&&a.target.focus()}}!b.browser.opera&&!b.browser.safari&&b(e.FLW).focus()};window.bueImceLoad=function(d){(a.win=d).imce.setSendTo(Drupal.t("Send to editor"),a.finish);a.ready(d,a.pop);if((b.browser.opera||b.browser.safari)&&b(a.pop).is(":visible")){b(a.win.imce.FLW).one("focus",function(){a.pop.close();a.setPos()})}}})(BUE.instance.prototype,jQuery);eDefBrowseButton=function(a,c,b){return BUE.imce.button(c,b)};(function(d,c){d.wrapLines=function(h,n,m,g){var o=this,k=o.getSelection().replace(/\r\n|\r/g,"\n"),l=BUE.regesc;if(!k){return o.tagSelection(h+n,m+g)}var j,i=new RegExp("^"+l(h+n)+"((.|\n)*)"+l(m+g)+"$");if(j=k.match(i)){i=new RegExp(l(m)+"\n"+l(n),"g");return o.replaceSelection(j[1].replace(i,"\n"))}return o.replaceSelection(h+n+k.replace(/\n/g,m+"\n"+n)+m+g)};d.toggleTag=function(g,h,k){var i=this,j={tag:g,html:i.getSelection(),attributes:h};return i.insertObj(j,{cursor:k,toggle:true})};d.help=function(h){var k=this;if(!k.helpHTML){for(var l,j=[],g=0;l=k.buttons[g];g++){j[g]=[BUE.input(l.type,null,l.value||null,{"class":l.className,src:l.src||null,style:c(l).attr("style")}),l.title]}k.helpHTML=BUE.table(j,{id:"bue-help","class":"bue-"+k.tplid})}k.quickPop.open(k.helpHTML,h);return k};d.tagChooser=function(g,i){var k=this,i=c.extend({wrapEach:"li",wrapAll:"ul",applyTag:true,effect:"slideDown"},i);var l=BUE.html(i.wrapAll||"div","",{"class":"tag-chooser"}),j=b(l);var h=BUE.html(i.wrapEach,"",{"class":"choice"});var m=BUE.html("a","",{href:"#","class":"choice-link"});c.each(g,function(n,o){var p={tag:o[0],html:o[1],attributes:o[2]};b(m).html(i.applyTag?BUE.objHtml(p):p.html).click(function(){k.insertObj(c.extend(p,{html:null}));return false}).appendTo(j)[h?"wrap":"end"](h)});k.quickPop.open(j,i.effect);return k};d.tagDialog=function(w,q,h){var v=this,k=v.getSelection(),o=BUE.parseHtml(k,w)||{attributes:{}};for(var r,p="",u=[],m=0,l=0;r=q[m];m++,l++){r=e(r,o,k);if(r.type=="hidden"){p+=a(r);l--;continue}u[l]=[BUE.html("label",r.title,{"for":r.attributes.id}),a(r)];while(r.getnext&&(r=q[++m])){u[l][1]+=a(e(r,o,k))}}var g=c.extend({title:Drupal.t("Tag editor - @tag",{"@tag":w.toUpperCase()}),stitle:Drupal.t("OK"),validate:false,submit:function(n,i){return v.tgdSubmit(n,i)},effect:"show"},h);var s=BUE.table(u,{"class":"bue-tgd-table"});var j=BUE.html("div",BUE.input("submit","bue_tgd_submit",g.stitle,{"class":"form-submit"}));var t=b(BUE.html("form",s+j+p,{name:"bue_tgd_form",id:"bue-tgd-form"}));v.dialog.open(g.title,t,h);t.submit(function(){return f(w,this,g,v)});return v};d.tgdSubmit=function(g,l){var m=this,n={tag:g,html:null,attributes:{}};for(var h,k,j=0;k=l.elements[j];j++){if(k.name.substr(0,5)=="attr_"){h=k.name.substr(5);if(h=="html"){n.html=k.value}else{n.attributes[h]=k.value.replace(/\x22/g,"&quot;").replace(/>/g,"&gt;").replace(/</g,"&lt;")||null}}}return m.insertObj(n)};var b=BUE.$html;var a=function(i){var g=i.prefix||"";switch(i.type){case"select":g+=BUE.selectbox(i.fname,i.value,i.options||{},i.attributes);break;case"textarea":g+=BUE.html("textarea","\n"+i.value,i.attributes);break;default:g+=BUE.input(i.type,i.fname,i.value,i.attributes);break}return g+(i.suffix||"")};var e=function(h,i,g){h=typeof(h)=="string"?{name:h}:h;if(h.name=="html"){h.value=typeof i.html=="string"?i.html:(g||h.value||"")}h.value=Drupal.checkPlain(typeof i.attributes[h.name]=="string"?i.attributes[h.name]:(h.value||""));h.title=typeof h.title=="string"?h.title:h.name.substr(0,1).toUpperCase()+h.name.substr(1);h.fname="attr_"+h.name;h.type=h.value.indexOf("\n")>-1?"textarea":(h.type||"text");h.attributes=c.extend({name:h.fname,id:h.fname,"class":""},h.attributes);h.attributes["class"]+=" form-"+h.type;if(h.required){h.attributes["class"]+=" required";h.attributes.title=Drupal.t("This field is required.")}return h};var f=function(p,g,h,o){for(var j,m=0;j=g.elements[m];m++){if(c(j).is(".required")&&!j.value){return BUE.noticeRequired(j)}}var k=h.validate;if(k){try{if(!k(p,g,h,o)){return false}}catch(n){alert(n.name+": "+n.message)}}o.dialog.close();var l=h.submit;l=typeof l=="string"?window[l]:l;if(l){try{l(p,g,h,o)}catch(n){alert(n.name+": "+n.message)}}return false};BUE.noticeRequired=function(g){c(g).fadeOut("fast").fadeIn("fast",function(){c(this).focus()});return false}})(BUE.instance.prototype,jQuery);eDefSelProcessLines=eDefTagLines=function(f,e,h,g){BUE.active.wrapLines(f,e,h,g)};eDefTagger=function(e,d,f){BUE.active.toggleTag(e,d,f)};eDefHelp=function(a){BUE.active.help(a)};eDefTagDialog=function(h,g,l,k,j,i){BUE.active.tagDialog(h,g,{title:l,stitle:k,submit:j,effect:i})};eDefTagInsert=function(d,c){BUE.active.tgdSubmit(d,c)};eDefTagChooser=function(g,f,j,i,h){BUE.active.tagChooser(g,{applyTag:f,wrapEach:j,wrapAll:i,effect:h})};;
