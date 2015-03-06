<?php
/**
 * @file
 * dkan_cgn_views.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function dkan_cgn_views_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'block-icons';
  $context->description = 'Shows block of icons ';
  $context->tag = 'UI';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'dataset' => 'dataset',
        'search_api_ajax/dataset' => 'search_api_ajax/dataset',
        'search_api_ajax/dataset/*' => 'search_api_ajax/dataset/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-categories-block_1' => array(
          'module' => 'views',
          'delta' => 'categories-block_1',
          'region' => 'content',
          'weight' => '-28',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Shows block of icons ');
  t('UI');
  $export['block-icons'] = $context;

  return $export;
}
