<?php
/**
 * @file
 * dkan_cgn_data_request.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function dkan_cgn_data_request_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'request_data';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Anfrage Daten';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Anfrage Daten';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'mehr';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['distinct'] = TRUE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['submit_button'] = 'Anwenden';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Zurücksetzen';
  $handler->display->display_options['exposed_form']['options']['exposed_sorts_label'] = 'Sortieren nach';
  $handler->display->display_options['exposed_form']['options']['sort_asc_label'] = 'Aufsteigend';
  $handler->display->display_options['exposed_form']['options']['sort_desc_label'] = 'Absteigend';
  $handler->display->display_options['pager']['type'] = 'mini';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['pager']['options']['id'] = '0';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_label'] = 'Elemente pro Seite';
  $handler->display->display_options['pager']['options']['expose']['items_per_page_options_all_label'] = '- Alle -';
  $handler->display->display_options['pager']['options']['tags']['first'] = '« erste Seite';
  $handler->display->display_options['pager']['options']['tags']['previous'] = '‹ vorherige Seite';
  $handler->display->display_options['pager']['options']['tags']['next'] = 'nächste Seite ›';
  $handler->display->display_options['pager']['options']['tags']['last'] = 'letzte Seite »';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Kopfbereich: Global: Textbereich */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['label'] = 'Kopfbereich';
  $handler->display->display_options['header']['area']['empty'] = TRUE;
  $handler->display->display_options['header']['area']['content'] = '<h2>Öffentliche Datenanfragen</h2>';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Verhalten, wenn keine Ergebnisse vorliegen: Global: Textbereich */
  $handler->display->display_options['empty']['area']['id'] = 'area';
  $handler->display->display_options['empty']['area']['table'] = 'views';
  $handler->display->display_options['empty']['area']['field'] = 'area';
  $handler->display->display_options['empty']['area']['empty'] = TRUE;
  $handler->display->display_options['empty']['area']['content'] = 'Noch keine Anfragen vorhanden';
  $handler->display->display_options['empty']['area']['format'] = 'full_html';
  /* Beziehung: Inhalt: Bearbeitungsstand (field_request_data_status) */
  $handler->display->display_options['relationships']['field_request_data_status_tid']['id'] = 'field_request_data_status_tid';
  $handler->display->display_options['relationships']['field_request_data_status_tid']['table'] = 'field_data_field_request_data_status';
  $handler->display->display_options['relationships']['field_request_data_status_tid']['field'] = 'field_request_data_status_tid';
  /* Feld: Taxonomie-Begriff: status_icon */
  $handler->display->display_options['fields']['field_status_icon']['id'] = 'field_status_icon';
  $handler->display->display_options['fields']['field_status_icon']['table'] = 'field_data_field_status_icon';
  $handler->display->display_options['fields']['field_status_icon']['field'] = 'field_status_icon';
  $handler->display->display_options['fields']['field_status_icon']['relationship'] = 'field_request_data_status_tid';
  $handler->display->display_options['fields']['field_status_icon']['label'] = '';
  $handler->display->display_options['fields']['field_status_icon']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_status_icon']['element_label_colon'] = FALSE;
  /* Feld: Global: Benutzerdefinierter Text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<i class="icon-li icon-[field_status_icon]"></i>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Feld: Inhalt: Titel */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Sortierkriterien: Inhalt: Beitragsdatum */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filterkriterium: Inhalt: Typ */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'request_data' => 'request_data',
  );
  /* Filterkriterium: Inhalt: Veröffentlicht oder Administrator */
  $handler->display->display_options['filters']['status_extra']['id'] = 'status_extra';
  $handler->display->display_options['filters']['status_extra']['table'] = 'node';
  $handler->display->display_options['filters']['status_extra']['field'] = 'status_extra';

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['path'] = 'daten/anfragen/field';

  /* Display: Full Post */
  $handler = $view->new_display('page', 'Full Post', 'page_1');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['links'] = FALSE;
  $handler->display->display_options['row_options']['comments'] = TRUE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['relationships'] = FALSE;
  /* Beziehung: Inhalt: Bearbeitungsstand (field_request_data_status) */
  $handler->display->display_options['relationships']['field_request_data_status_tid']['id'] = 'field_request_data_status_tid';
  $handler->display->display_options['relationships']['field_request_data_status_tid']['table'] = 'field_data_field_request_data_status';
  $handler->display->display_options['relationships']['field_request_data_status_tid']['field'] = 'field_request_data_status_tid';
  /* Beziehung: Kommentar: Kommentare des Beitrags */
  $handler->display->display_options['relationships']['cid']['id'] = 'cid';
  $handler->display->display_options['relationships']['cid']['table'] = 'node';
  $handler->display->display_options['relationships']['cid']['field'] = 'cid';
  $handler->display->display_options['path'] = 'daten/anfragen/full';

  /* Display: Teaseransicht */
  $handler = $view->new_display('page', 'Teaseransicht', 'page_2');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entity';
  $handler->display->display_options['row_options']['view_mode'] = 'teaser';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'daten/anfragen';
  $translatables['request_data'] = array(
    t('Master'),
    t('Anfrage Daten'),
    t('mehr'),
    t('Anwenden'),
    t('Zurücksetzen'),
    t('Sortieren nach'),
    t('Aufsteigend'),
    t('Absteigend'),
    t('Elemente pro Seite'),
    t('- Alle -'),
    t('Offset'),
    t('« erste Seite'),
    t('‹ vorherige Seite'),
    t('nächste Seite ›'),
    t('letzte Seite »'),
    t('Kopfbereich'),
    t('<h2>Öffentliche Datenanfragen</h2>'),
    t('Noch keine Anfragen vorhanden'),
    t('Begriff aus field_request_data_status'),
    t('<i class="icon-li icon-[field_status_icon]"></i>'),
    t('Page'),
    t('Full Post'),
    t('Kommentare'),
    t('Teaseransicht'),
  );
  $export['request_data'] = $view;

  return $export;
}
