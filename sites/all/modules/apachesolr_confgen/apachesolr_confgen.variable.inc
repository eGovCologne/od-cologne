<?php
/**
 * @file
 * Variable information
 */

/**
 * Implements hook_variable_info().
 */
function apachesolr_confgen_variable_info($options = array()) {
  $variables['apachesolr_confgen_solr_version_dependent_variables'] = array(
    'title' => t('Solr version dependent variables.', array(), $options),
    'type' => 'array',
    'default' => array(),
  );
  return $variables;
}



