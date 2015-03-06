Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Ein AJAX-HTTP-Fehler ist aufgetreten.","HTTP Result Code: !status":"HTTP-R\u00fcckgabe-Code: !status","An AJAX HTTP request terminated abnormally.":"Eine AJAX-Anfrage ist abnormal beendet worden.","Debugging information follows.":"Im Folgenden finden Sie Debugging-Informationen.","Path: !uri":"Pfad: !uri","StatusText: !statusText":"Statustext: !statusText","ResponseText: !responseText":"Antworttext: !responseText","ReadyState: !readyState":"ReadyState: !readyState","Hide":"Ausblenden","Show":"Anzeigen","None":"Keine","Disabled":"Deaktiviert","Enabled":"Aktiviert","Edit":"Bearbeiten","Configure":"Konfigurieren","OK":"OK","This field is required.":"Diese Angabe wird ben\u00f6tigt.","Close":"Schlie\u00dfen","Browse":"Durchsuchen","File Browser":"Dateibrowser","Editor name":"Editor-Name","Loading...":"Wird geladen ...","Select an icon":"Symbol ausw\u00e4hlen","Add":"Hinzuf\u00fcgen","Done":"Fertig","Loading":"Laden","Next":"Weiter","Sunday":"Sonntag","Monday":"Montag","Tuesday":"Dienstag","Wednesday":"Mittwoch","Thursday":"Donnerstag","Friday":"Freitag","Saturday":"Samstag","Prev":"Vorheriges","Mon":"Mo","Tue":"Di","Wed":"Mi","Thu":"Do","Fri":"Fr","Sat":"Sa","Sun":"So","January":"Januar","February":"Februar","March":"M\u00e4rz","April":"April","May":"Mai","June":"Juni","July":"Juli","August":"August","September":"September","October":"Oktober","November":"November","December":"Dezember","Select all rows in this table":"Alle Zeilen dieser Tabelle ausw\u00e4hlen","Deselect all rows in this table":"Alle Zeilen dieser Tabelle abw\u00e4hlen","Today":"Heute","Jan":"Jan","Feb":"Feb","Mar":"M\u00e4r","Apr":"Apr","Jun":"Jun","Jul":"Jul","Aug":"Aug","Sep":"Sep","Oct":"Okt","Nov":"Nov","Dec":"Dez","Su":"So","Mo":"Mo","Tu":"Di","We":"Mi","Th":"Do","Fr":"Fr","Sa":"Sa","Not published":"Nicht ver\u00f6ffentlicht","Please wait...":"Bitte warten...","mm\/dd\/yy":"mm\/tt\/jj","By @name on @date":"Von @name am @date","By @name":"Von @name","Not in menu":"Nicht im Men\u00fc","Alias: @alias":"Alias: @alias","No alias":"Kein Alias","New revision":"Neue Version","Drag to re-order":"Ziehen, um die Reihenfolge zu \u00e4ndern","Changes made in this table will not be saved until the form is submitted.":"\u00c4nderungen in dieser Tabelle werden nicht gespeichert, bis dieses Formular abgesendet wurde.","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"Die \u00c4nderungen an diesen Bl\u00f6cken werden nicht gespeichert, bis auf dem \u003Cem\u003EBl\u00f6cke speichern\u003C\/em\u003E-Button geklickt wurde.","This permission is inherited from the authenticated user role.":"Diese Berechtigung wird von der Rolle \u201aAuthentifizierte Benutzer\u2018 ererbt.","No revision":"Keine Version","@number comments per page":"@number Kommentare pro Seite","Requires a title":"Ben\u00f6tigt einen Titel","Not restricted":"Uneingeschr\u00e4nkt","(active tab)":"(aktiver Reiter)","Not customizable":"Nicht anpassbar","Restricted to certain pages":"Auf bestimmte Seiten eingeschr\u00e4nkt","The block cannot be placed in this region.":"Der Block kann nicht in dieser Region abgelegt werden.","Hide summary":"Zusammenfassung verbergen","Edit summary":"Zusammenfassung bearbeiten","Don\u0027t display post information":"Beitragsinformationen nicht anzeigen","@title dialog":"@title Dialog","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Die ausgew\u00e4hlte Datei %filename konnte nicht hochgeladen werden. Nur Dateien mit den folgenden Erweiterungen sind zul\u00e4ssig: %extensions.","Re-order rows by numerical weight instead of dragging.":"Zeilen mittels numerischer Gewichtung ordnen statt mit Drag-and-Drop","Show row weights":"Zeilenreihenfolge anzeigen","Hide row weights":"Zeilenreihenfolge ausblenden","Autocomplete popup":"Popup zur automatischen Vervollst\u00e4ndigung","Searching for matches...":"Suche \u2026","Show more":"Weitere anzeigen","Show fewer":"Weniger anzeigen","Select all":"Alle ausw\u00e4hlen","Deselect all":"Alles abw\u00e4hlen","Automatic alias":"Automatischer Alias","Available tokens":"Verf\u00fcgbare Token","Insert this token into your form":"Dieses Token in Ihr Formular einf\u00fcgen","First click a text field to insert your tokens into.":"Klicken Sie zun\u00e4chst auf ein Textfeld, um Ihr Token einzuf\u00fcgen.","Remove group":"Gruppe entfernen","Apply (all displays)":"Anwenden (alle Anzeigen)","Apply (this display)":"Anwenden (diese Anzeige)","Revert to default":"Auf Standardwert zur\u00fccksetzen","Translate Text":"Text \u00fcbersetzen","An HTTP error @status occured.":"Ein HTTP Fehler @status ist aufgetreten."}} };;
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
