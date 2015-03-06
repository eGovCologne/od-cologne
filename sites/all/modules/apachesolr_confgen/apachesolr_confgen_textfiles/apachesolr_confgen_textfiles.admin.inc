<?php

/**
 * @file
 *  TODO
 */

function apachesolr_confgen_textfile_settings_form($form_state) {
  $form = array();
  $pre_form = variable_module_form($form, $form_state, 'apachesolr_confgen_textfiles');
  $form['vt'] = array(
      '#type' => 'vertical_tabs',
  );
  foreach ($pre_form as $key => $value) {
    if (strpos($key, 'apachesolr_confgen_') === FALSE) {
      $form[$key] = $value;
    }
    else {
      $fieldset_name = 'fs_' . $key;
      $form['vt'][$fieldset_name] = array(
          '#type' => 'fieldset',
          '#title' => check_plain($value['#title']),
          '#collapsible' => FALSE,
          '#collapsed' => FALSE,
      );
      $value['#rows'] = 20;
      $form['vt'][$fieldset_name][$key] = $value;
    }
  }
#  $form['#submit'] = str_replace('variable_settings_form_submit', 'system_settings_form_submit', $form['#submit']);
  return $form;
}

