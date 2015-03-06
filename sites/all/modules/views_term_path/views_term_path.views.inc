<?php
  
/**
 * Implements of hook_views_data().
 */
function views_term_path_views_data() {
  return array(
    'taxonomy_term_data' => array(
      'path' => array(
        'group' => t('Taxonomy term'),
        'title' => t('Path'),
        'help' => t('Term path'),
        'field' => array(
          'handler' => 'views_term_path_handler_field_path'
        ),
      ),
    ),
  );
}
