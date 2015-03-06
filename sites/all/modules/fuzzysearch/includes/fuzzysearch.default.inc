<?php

/*
 * Default server and index for FuzzySearchService.
 */

$name = st('Default fuzzysearch server');
$values = array(
  'name' => $name,
  'machine_name' => preg_replace('/[^a-z0-9]+/', '_', drupal_strtolower($name)),
  'description' => st('A default server automatically created by fuzzysearch.'),
  'class' => 'fuzzysearch_service',
  'options' => array (
    'database' => 'default:default',
    'min_chars' => '3',
  ),
  'enabled' => '1',
);

if ($id = search_api_server_insert ($values)) {
  drupal_set_message(st('Fuzzy Search default server created. !edit this server.', array('!edit' => l(st('Edit'), 'admin/config/search/search_api/server/default_fuzzysearch_server'))));
}
else {
  drupal_set_message(st('Fuzzy Search default server could not be created.'), 'warning');
}

$name = st('Default fuzzysearch index');
$values = array(
'name' => $name,
'machine_name' => preg_replace('/[^a-z0-9]+/', '_', drupal_strtolower($name)),
'description' => st('A default index with basic settings automatically created by fuzzysearch.'),
'server' => 'default_fuzzysearch_server',
'item_type' => 'node',
'options' => array (
  'cron_limit' => '50',
  'fields' =>
  array (
    'search_api_language' => array (
      'name' => 'Item language',
      'indexed' => 1,
      'type' => 'string',
      'boost' => '1.0',
    ),
    'search_api_viewed' => array (
      'name' => 'Entity HTML output',
      'indexed' => 1,
      'type' => 'text',
      'boost' => '1.0',
    ),
    'title' => array (
      'name' => 'Title',
      'indexed' => 1,
      'type' => 'text',
      'boost' => '5.0',
    ),
  ),
  'data_alter_callbacks' => array (
    'search_api_alter_bundle_filter' => array (
      'status' => 0,
      'weight' => '0',
      'settings' => array (
        'default' => '1',
        'bundles' => array (
        ),
      ),
    ),
    'search_api_alter_add_viewed_entity' => array (
      'status' => 1,
      'weight' => '0',
      'settings' => array (
        'mode' => 'full',
      ),
    ),
    'search_api_alter_add_aggregation' => array (
      'status' => 0,
      'weight' => '0',
      'settings' => NULL,
    ),
    'search_api_alter_add_url' => array (
      'status' => 0,
      'weight' => '0',
      'settings' => array (
      ),
    ),
  ),
  'processors' => array (
    'search_api_case_ignore' => array (
      'status' => 1,
      'weight' => '-50',
      'settings' => array (
        'strings' => 0,
      ),
    ),
    'search_api_html_filter' => array (
      'status' => 1,
      'weight' => '-49',
      'settings' => array (
        'title' => 0,
        'alt' => 1,
        'tags' => 'h1 = 5
          h2 = 3
          h3 = 2
          strong = 2
          b = 2
          em = 1.5
          u = 1.5',
      ),
    ),
    'search_api_tokenizer' => array (
      'status' => 1,
      'weight' => '-48',
      'settings' => array (
        'spaces' => '[^\\p{L}\\p{N}]',
        'ignorable' => '[-]',
      ),
    ),
    'fuzzysearch_search' => array (
      'status' => 1,
      'weight' => '-47',
      'settings' => array (
        'ngram_length' => '3',
        'missing_letters' => '5',
        'extra_letters' => '5',
        'completeness' => '40',
        'sort_score' => 0,
      ),
    ),
    'fuzzysearch_excerpt' => array (
      'status' => 1,
      'weight' => '-46',
      'settings' => array (
        'debug_score' => 0,
        'excerpt_length' => '200',
        'max_result_length' => '400',
        'spelling' => '30',
      ),
    ),
  ),
),
'enabled' => '1',
'read_only' => '0',
);

if ($id = search_api_index_insert ($values)) {
  $path = drupal_get_path('module', 'fuzzysearch') . "/README.txt";
  drupal_set_message(st('Fuzzy Search default index created. !edit this index. Read the !readme if you are not sure what to do next.', array('!edit' => l(st('Edit'), 'admin/config/search/search_api/index/default_fuzzysearch_index/edit'), '!readme' => l('README.txt', $path) )));
}
else {
  drupal_set_message(st('Fuzzy Search default index could not be created.'), 'warning');
}