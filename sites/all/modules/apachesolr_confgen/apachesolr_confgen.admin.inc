<?php

/**
 * @file
 * Schema generator
 *
 * @author Markus Kalkbrenner (mkalkbrenner) | bio.logis GmbH
 *   @see http://drupal.org/user/124705
 */


/**
 * Implements hook_form().
 *
 * @param unknown_type $form_state
 * @return unknown_type
 */
function apachesolr_confgen_form($form_state) {
  foreach (variable_realm_keys('solr_version') as $solr_version => $solr_version_name) {
    $form['set_' . $solr_version] = array(
      '#type' => 'fieldset',
      '#title' => t('%version Configuration Download', array('%version' => $solr_version_name)),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,
    );

    $form['set_' . $solr_version]['submit_schema_' . $solr_version] = array(
      '#type' => 'submit',
      '#name' => 'button|schema|' . $solr_version,
      '#value' => t('Download !file for !version', array('!file' => 'schema.xml', '!version' => $solr_version_name)),
    );

    $form['set_' . $solr_version]['submit_solrconfig_' . $solr_version] = array(
      '#type' => 'submit',
      '#name' => 'button|solrconfig|' . $solr_version,
      '#value' => t('Download !file for !version', array('!file' => 'solrconfig.xml', '!version' => $solr_version_name)),
    );

    $form['set_' . $solr_version]['submit_elevate_' . $solr_version] = array(
      '#type' => 'submit',
      '#name' => 'button|elevate|' . $solr_version,
      '#value' => t('Download !file for !version', array('!file' => 'elevate.xml', '!version' => $solr_version_name)),
    );

    if (strpos($solr_version, '3.') === 0) {
      $form['set_' . $solr_version]['submit_currency_' . $solr_version] = array(
        '#type' => 'submit',
        '#name' => 'button|currency|' . $solr_version,
        '#value' => t('Download !file for !version', array('!file' => 'currency.xml', '!version' => $solr_version_name)),
      );
    }

    $form['set_' . $solr_version]['submit_zip_' . $solr_version] = array(
      '#type' => 'submit',
      '#name' => 'button|zip|' . $solr_version,
      '#value' => t('Download all files for !version as zip archive', array('!version' => $solr_version_name)),
    );
  }

  return $form;
}

/**
 * Implements hook_form_validate().
 *
 * @param $form
 * @param $form_state
 *
 * @return void
 */
function apachesolr_confgen_form_validate(&$form, &$form_state) {
  ob_clean();
  ob_start();
  // Seems to be a bug in core that $form_state['clicked_button']['#name'] is not always correct
  // Workaroud: Use button| prefix
  $button = '';
  foreach (array_keys($form_state['input']) as $button) {
    if (strpos($button, 'button|') === 0) {
      break;
    }
  }

  list(, $type, $solr_version) = explode('|', str_replace('_', '.', $button));

  variable_realm_switch('solr_version', $solr_version);

  drupal_add_http_header('Expires: ', gmdate('D, d M Y H:i:s') . ' GMT');
  drupal_add_http_header('Cache-Control:', 'must-revalidate, post-check=0, pre-check=0');
  drupal_add_http_header('Pragma:', 'public');

  switch ($type) {
    case 'currency':
    case 'elevate':
    case 'schema':
    case 'solrconfig':
      $qp = apachesolr_confgen_get_original_qp($type, $solr_version);
      drupal_alter('apachesolr_confgen_' . $type, $qp, $solr_version);
      drupal_add_http_header('Content-Type', 'text/xml; charset=utf-8');
      drupal_add_http_header('Content-Disposition', 'attachment; filename=' . $type . '.xml');
      ob_end_clean();
      print $qp->find(':root')->xml();
      exit();

    case 'zip':
      // array for zip content
      $files = array();
      foreach (array('currency', 'elevate', 'schema', 'solrconfig') as $file) {
        if ('currency' == $file && strpos($solr_version, '1.') === 0) {
          continue;
        }
        $qp = apachesolr_confgen_get_original_qp($file, $solr_version);
        drupal_alter('apachesolr_confgen_' . $file, $qp, $solr_version);
        $files[$file . '.xml'] = $qp->find(':root')->xml();
      }
      drupal_alter('apachesolr_confgen_zip_file', $files, $solr_version);
      require_once dirname(__FILE__) . '/lib/apachesolr_confgen_zipfile.php';
      $zip = new apachesolr_confgen_zipfile();
      foreach ($files as $file_name => $file_data) {
        $zip->addFile($file_data, $file_name);
      }
      drupal_add_http_header('Content-Type:', 'application/x-gzip');
      drupal_add_http_header('Content-Disposition:', 'inline; filename="apachesolr_config_' . $solr_version . '.zip"');
      ob_end_clean();
      print $zip->file();
      exit;
  }
}
