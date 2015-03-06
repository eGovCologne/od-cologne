Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Ein AJAX-HTTP-Fehler ist aufgetreten.","HTTP Result Code: !status":"HTTP-R\u00fcckgabe-Code: !status","An AJAX HTTP request terminated abnormally.":"Eine AJAX-Anfrage ist abnormal beendet worden.","Debugging information follows.":"Im Folgenden finden Sie Debugging-Informationen.","Path: !uri":"Pfad: !uri","StatusText: !statusText":"Statustext: !statusText","ResponseText: !responseText":"Antworttext: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Hide":"Ausblenden","Show":"Anzeigen","None":"Keine","Disabled":"Deaktiviert","Enabled":"Aktiviert","Edit":"Bearbeiten","Configure":"Konfigurieren","OK":"OK","This field is required.":"Diese Angabe wird ben\u00f6tigt.","Close":"Schlie\u00dfen","Browse":"Durchsuchen","File Browser":"Dateibrowser","Editor name":"Editor-Name","Loading...":"Wird geladen ...","Select an icon":"Symbol ausw\u00e4hlen","Add":"Hinzuf\u00fcgen","Done":"Fertig","Loading":"Laden","Next":"Weiter","Sunday":"Sonntag","Monday":"Montag","Tuesday":"Dienstag","Wednesday":"Mittwoch","Thursday":"Donnerstag","Friday":"Freitag","Saturday":"Samstag","Prev":"Vorheriges","Mon":"Mo","Tue":"Di","Wed":"Mi","Thu":"Do","Fri":"Fr","Sat":"Sa","Sun":"So","January":"Januar","February":"Februar","March":"M\u00e4rz","April":"April","May":"Mai","June":"Juni","July":"Juli","August":"August","September":"September","October":"Oktober","November":"November","December":"Dezember","Select all rows in this table":"Alle Zeilen dieser Tabelle ausw\u00e4hlen","Deselect all rows in this table":"Alle Zeilen dieser Tabelle abw\u00e4hlen","Today":"Heute","Jan":"Jan","Feb":"Feb","Mar":"M\u00e4r","Apr":"Apr","Jun":"Jun","Jul":"Jul","Aug":"Aug","Sep":"Sep","Oct":"Okt","Nov":"Nov","Dec":"Dez","Su":"So","Mo":"Mo","Tu":"Di","We":"Mi","Th":"Do","Fr":"Fr","Sa":"Sa","Not published":"Nicht ver\u00f6ffentlicht","Please wait...":"Bitte warten...","mm\/dd\/yy":"mm\/tt\/jj","By @name on @date":"Von @name am @date","By @name":"Von @name","Not in menu":"Nicht im Men\u00fc","Alias: @alias":"Alias: @alias","No alias":"Kein Alias","New revision":"Neue Version","Drag to re-order":"Ziehen, um die Reihenfolge zu \u00e4ndern","Changes made in this table will not be saved until the form is submitted.":"\u00c4nderungen in dieser Tabelle werden nicht gespeichert, bis dieses Formular abgesendet wurde.","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Die \u00c4nderungen an diesen Bl\u00f6cken werden nicht gespeichert, bis auf dem \u003Cem\u003EBl\u00f6cke speichern\u003C\/em\u003E-Button geklickt wurde.","This permission is inherited from the authenticated user role.":"Diese Berechtigung wird von der Rolle \u201aAuthentifizierte Benutzer\u2018 ererbt.","No revision":"Keine Version","@number comments per page":"@number Kommentare pro Seite","Requires a title":"Ben\u00f6tigt einen Titel","Not restricted":"Uneingeschr\u00e4nkt","(active tab)":"(aktiver Reiter)","Not customizable":"Nicht anpassbar","Restricted to certain pages":"Auf bestimmte Seiten eingeschr\u00e4nkt","The block cannot be placed in this region.":"Der Block kann nicht in dieser Region abgelegt werden.","Hide summary":"Zusammenfassung verbergen","Edit summary":"Zusammenfassung bearbeiten","Don\u0027t display post information":"Beitragsinformationen nicht anzeigen","@title dialog":"@title Dialog","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Die ausgew\u00e4hlte Datei %filename konnte nicht hochgeladen werden. Nur Dateien mit den folgenden Erweiterungen sind zul\u00e4ssig: %extensions.","Re-order rows by numerical weight instead of dragging.":"Zeilen mittels numerischer Gewichtung ordnen statt mit Drag-and-Drop","Show row weights":"Zeilenreihenfolge anzeigen","Hide row weights":"Zeilenreihenfolge ausblenden","Autocomplete popup":"Popup zur automatischen Vervollst\u00e4ndigung","Searching for matches...":"Suche \u2026","Show more":"Weitere anzeigen","Show fewer":"Weniger anzeigen","Select all":"Alle ausw\u00e4hlen","Deselect all":"Alles abw\u00e4hlen","Automatic alias":"Automatischer Alias","Available tokens":"Verf\u00fcgbare Token","Insert this token into your form":"Dieses Token in Ihr Formular einf\u00fcgen","First click a text field to insert your tokens into.":"Klicken Sie zun\u00e4chst auf ein Textfeld, um Ihr Token einzuf\u00fcgen.","Remove group":"Gruppe entfernen","Apply (all displays)":"Anwenden (alle Anzeigen)","Apply (this display)":"Anwenden (diese Anzeige)","Revert to default":"Auf Standardwert zur\u00fccksetzen","Translate Text":"Text \u00fcbersetzen","An HTTP error @status occured.":"Ein HTTP Fehler @status ist aufgetreten."}} };;
/******************************************************************************************************************************

 * @ Original idea by by Binny V A, Original version: 2.00.A 
 * @ http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * @ Original License : BSD
 
 * @ jQuery Plugin by Tzury Bar Yochay 
        mail: tzury.by@gmail.com
        blog: evalinux.wordpress.com
        face: facebook.com/profile.php?id=513676303
        
        (c) Copyrights 2007
        
 * @ jQuery Plugin version Beta (0.0.3)
 * @ License: jQuery-License.
 
TODO:
    add queue support (as in gmail) e.g. 'x' then 'y', etc.
    add mouse + mouse wheel events.

USAGE:
    $.hotkeys.add('Ctrl+c', function(){ alert('copy anyone?');});
    $.hotkeys.add('Ctrl+c', {target:'div#editor', type:'keyup', propagate: true},function(){ alert('copy anyone?');});>
    $.hotkeys.remove('Ctrl+c'); 
    $.hotkeys.remove('Ctrl+c', {target:'div#editor', type:'keypress'}); 
    
******************************************************************************************************************************/
(function (jQuery) {

  this.version = '(beta)(0.0.3)';

  this.all = {};

  this.special_keys = {
    27: 'esc', 9: 'tab', 32:'space', 13: 'return', 8:'backspace', 145: 'scroll', 20: 'capslock', 
    144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',35:'end', 33: 'pageup', 
    34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down', 112:'f1',113:'f2', 114:'f3', 
    115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 120:'f9', 121:'f10', 122:'f11', 123:'f12'};        

  this.shift_nums = { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", 
    "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", 
    ".":">",  "/":"?",  "\\":"|" };        

  this.add = function(combi, options, callback) {
    if (jQuery.isFunction(options)) {
      callback = options;
      options = {};
    }
    var opt = {};
    var defaults = {type: 'keydown', propagate: false, disableInInput: false, target: 'html'};
    var that = this;
    var opt = jQuery.extend( opt , defaults, options || {} );
    combi = combi.toLowerCase();        
        
    // inspect if keystroke matches
    var inspector = function(event) {
      event = jQuery.event.fix(event); // jQuery event normalization.
      var selector = event.data.selector;
      var element = jQuery(event.target);

      // Disable shortcut keys in Input, Textarea fields
      if(opt['disableInInput'] && element.is('textarea, input')) {
        return;
      }

      var
        code = event.which,
        type = event.type,
        character = String.fromCharCode(code).toLowerCase(),
        special = that.special_keys[code],
        shift = event.shiftKey,
        ctrl = event.ctrlKey,
        alt= event.altKey,
        propagate = true, // default behaivour
        mapPoint = null;

      var cbMap = that.all[selector].events[type].callbackMap;
      if(!shift && !ctrl && !alt) { // No Modifiers
        mapPoint = cbMap[special] ||  cbMap[character]
      }
      
      // deals with combinaitons (alt|ctrl|shift+anything)
      else{
        var modif = '';
        if(alt) modif +='alt+';
        if(ctrl) modif+= 'ctrl+';
        if(shift) modif += 'shift+';
        // modifiers + special keys or modifiers + characters or modifiers + shift characters
        mapPoint = cbMap[modif+special] || cbMap[modif+character] || cbMap[modif+that.shift_nums[character]]
      }

      if (mapPoint){
        mapPoint.cb(event);
        if(!mapPoint.propagate) {
          event.stopPropagation();
          event.preventDefault();
          return false;
        }
      }
    };

    // first hook for this element
    if (!this.all[opt.target]){
      this.all[opt.target] = {events:{}};
    }
    if (!this.all[opt.target].events[opt.type]){
      this.all[opt.target].events[opt.type] = {callbackMap: {}}
      jQuery(opt.target).bind(opt.type, {selector: opt.target}, inspector);
    }
    this.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};                
    return jQuery;
	};    

  this.remove = function(exp, opt) {
    opt = opt || {};
    target = opt.target || 'html';
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();
    jQuery(target).unbind(type);
    delete this.all[target].events[type].callbackMap[exp];
    return jQuery;
	};
	
  jQuery.hotkeys = this;
  return jQuery;    

})(jQuery);;

/**
 * Cookie plugin 1.0
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
;
(function ($, Drupal, undefined) {

// Store all l10n_client related data + methods in its own object
  Drupal.l10nClient = {
    // Set "selected" string to unselected, i.e. -1
    selected: -1,

    // Keybindings
    keys: {'toggle': 'ctrl+shift+s', 'clear': 'esc'}, // Keybindings

    // Keybinding functions
    key: function (pressed) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      switch (pressed) {
        case 'toggle':
          // Grab user-hilighted text & send it into the search filter
          var userSelection = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text;
          userSelection = String(userSelection);
          if (userSelection.length > 0) {
            this.filter(userSelection);
            this.toggle(1);
            $l10nClient.find('.string-search').val(userSelection).focus();
          } else {
            if ($l10nClient.is('.l10n-client-minimized')) {
              this.toggle(1);
              if (!$.browser.safari) {
                $l10nClient.find('.string-search').focus();
              }
            }
            else {
              this.toggle(0);
            }
          }
          break;
        case 'clear':
          this.filter(false);
          break;
      }
    },

    // Toggle the l10nclient
    toggle: function (state) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      var $clientWrapper = $('#l10n-client-string-select, #l10n-client-string-editor, #l10n-client .labels .label');
      if (!!state == true) {
        $clientWrapper.show();
        $l10nClient.removeClass('l10n-client-minimized').addClass('l10n-client-maximized').find('.labels .toggle').text('X');
        if (!$.browser.msie) {
          $('body').addClass('toggle-expanded');
        }
        $.cookie('Drupal_l10n_client', '1', {expires: 7, path: '/'});
      } else {
        $clientWrapper.hide();
        $l10nClient.removeClass('l10n-client-maximized').addClass('l10n-client-minimized').find('.labels .toggle').text(Drupal.t('Translate Text'));
        if (!$.browser.msie) {
          $('body').removeClass('toggle-expanded');
        }
        $.cookie('Drupal_l10n_client', '0', {expires: 7, path: '/'});
      }
    },

    // Get a string from the DOM tree
    getString: function (index, type) {
      return $('#l10n-client-data').find('div:eq(' + index + ') .' + type).text();
    },

    // Set a string in the DOM tree
    setString: function (index, data) {
      $('#l10n-client-data').find('div:eq(' + index + ') .target').text(data);
    },

    // Filter the the string list by a search string
    filter: function (search) {
      var $l10nClient = Drupal.l10nClient.$l10nClient;
      var $stringSearch = $l10nClient.find('.string-search');
      var $stringSelect = $('#l10n-client-string-select').find('li');
      if (search === false || search === '') {
        $('#l10n-client-search-filter-clear').focus();
        $stringSelect.show();
        $stringSearch.val('').focus();
      } else if (search.length > 0) {
        $stringSelect.show().not(':contains(' + search + ')').hide();
      }
    }
  };

  // Attaches the localization editor behavior to all required fields.
  Drupal.behaviors.l10nClient = {
    attach: function (context) {
      $('#l10n-client').once('l10n-client', function () {
        $('body').addClass('l10n-client');
        var $l10nClient = $(this);
        var $l10nClientForm = $('#l10n-client-form');
        var $stringEditor = $('#l10n-client-string-editor');
        var $stringEditorSoruceText = $stringEditor.find('.source-text');
        var $stringSelect = $('#l10n-client-string-select');
        var cookie = parseInt($.cookie('Drupal_l10n_client'), 2);
        Drupal.l10nClient.$l10nClient = $l10nClient;
        Drupal.l10nClient.toggle(isNaN(cookie) ? 0 : cookie);

        // If the selection changes, copy string values to the source and target fields.
        // Add class to indicate selected string in list widget.
        $stringSelect.find('li').click(function () {
          var $this = $(this);
          var $lis = $stringSelect.find('li');
          var index = $lis.index(this);

          $lis.removeClass('active');
          $this.addClass('active');

          $stringEditorSoruceText.text(Drupal.l10nClient.getString(index, 'source'));
          $l10nClientForm.find('.translation-target').val(Drupal.l10nClient.getString(index, 'target'));
          $l10nClientForm.find('.source-textgroup').val(Drupal.l10nClient.getString(index, 'textgroup'));
          $l10nClientForm.find('.source-context').val(Drupal.l10nClient.getString(index, 'context'));
          $stringEditor.find('.context').text(Drupal.l10nClient.getString(index, 'context'));

          Drupal.l10nClient.selected = index;
          $l10nClientForm.find('.form-submit').removeAttr("disabled");
        });

        // When l10n_client window is clicked, toggle based on current state.
        $l10nClient.find('.labels .toggle').click(function () {
          Drupal.l10nClient.toggle($l10nClient.is('.l10n-client-minimized'));
        });

        // Copy source text to translation field on button click.
        $l10nClientForm.find('.edit-copy').click(function () {
          $l10nClientForm.find('.translation-target').val($stringEditorSoruceText.text());
          return false;
        });

        // Clear translation field on button click.
        $l10nClientForm.find('.edit-clear').click(function () {
          $l10nClientForm.find('.translation-target').val('');
          return false;
        });

        // Register keybindings using jQuery hotkeys
        if ($.hotkeys) {
          $.hotkeys.add(Drupal.l10nClient.keys.toggle, function () {
            Drupal.l10nClient.key('toggle');
          });
          $.hotkeys.add(Drupal.l10nClient.keys.clear, {target: '#l10n-client .string-search', type: 'keyup'}, function () {
            Drupal.l10nClient.key('clear');
          });
        }

        // Custom listener for l10n_client livesearch
        $l10nClient.find('.string-search').keyup(function () {
          Drupal.l10nClient.filter($l10nClient.find('.string-search').val());
        });

        // Clear search
        $l10nClient.find('#l10n-client-search-filter-clear').click(function () {
          Drupal.l10nClient.filter(false);
          return false;
        });

        // Send AJAX POST data on form submit.
        $l10nClientForm.submit(function () {
          var $this = $(this);

          // Prevent submit empty strings.
          $this.find('.form-submit').attr("disabled", true);
          $this.find('.edit-save').after('<div class="ajax-progress ajax-progress-throbber">' +
            '<div class="throbber">&nbsp;</div><div class="message">' +
            Drupal.t('Please wait...') + '</div></div>');

          $.ajax({
            type: "POST",
            url: $this.attr('action'),
            // Send source and target strings.
            data: {
              source: $stringEditorSoruceText.text(),
              target: $this.find('.translation-target').val(),
              textgroup: $this.find('.source-textgroup').val(),
              context: $stringEditor.find('.context').text(),
              'form_token': $this.find('input[name=form_token]').val()
            },
            success: function (data) {
              var $translationTarget = $l10nClientForm.find('.translation-target');
              var newTranslation = $translationTarget.val();
              // Store string in local js
              Drupal.l10nClient.setString(Drupal.l10nClient.selected, newTranslation);

              // Figure out the display of the new translation in the selection list.
              var newTranslationStripped = newTranslation.replace(/<\/?[^<>]+>/gi, '')
                .replace(/&quot;/g, '"')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&amp;/g, "&");

              // Only contains HTML tags (edge case). Keep the whole string.
              // HTML tags will show up in the selector, but that is normal in this case.
              var newTranslationDisplay = newTranslation;
              if (newTranslationStripped.length > 81) {
                // Long translation, strip length to display only first part.
                // We strip at 78 chars and add three dots, if the total length is
                // above 81.
                newTranslationDisplay = newTranslationStripped.substr(0, 78) + '...';
              }

              // Mark string as translated.
              $stringSelect.find('li')
                .eq(Drupal.l10nClient.selected)
                .removeClass('untranslated active')
                .addClass('translated')
                .text(newTranslationDisplay);

              // Empty input fields.
              $stringEditorSoruceText.html(data);
              $translationTarget.val('');
              $this.find('div.ajax-progress-throbber').remove();
            },
            error: function (xmlhttp) {
              alert(Drupal.t('An HTTP error @status occured.', { '@status': xmlhttp.status }));
            }
          });
          return false;
        });
      });
    }
  };
})(jQuery, Drupal);
;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
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
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
