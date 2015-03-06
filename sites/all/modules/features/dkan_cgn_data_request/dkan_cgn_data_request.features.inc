<?php
/**
 * @file
 * dkan_cgn_data_request.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function dkan_cgn_data_request_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function dkan_cgn_data_request_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function dkan_cgn_data_request_node_info() {
  $items = array(
    'request_data' => array(
      'name' => t('Anfrage Daten'),
      'base' => 'node_content',
      'description' => t('Datenanfrage'),
      'has_title' => '1',
      'title_label' => t('Titel'),
      'help' => '',
    ),
  );
  return $items;
}
