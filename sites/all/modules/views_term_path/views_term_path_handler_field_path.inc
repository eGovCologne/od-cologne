<?php

/**
 * @file
 * Handler for term path field.
 */

/**
 * Field handler to present the path to the term.
 */
class views_term_path_handler_field_path extends views_handler_field {

  function option_definition() {
    $options = parent::option_definition();
    $options['absolute'] = array('default' => FALSE, 'bool' => TRUE);

    return $options;
  }

  function construct() {
    parent::construct();
    $this->additional_fields['tid'] = 'tid';
    $this->additional_fields['vid'] = 'vid';
    $this->additional_fields['vocabulary_machine_name'] = array(
      'table' => 'taxonomy_vocabulary',
      'field' => 'machine_name',
    );
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    $form['absolute'] = array(
      '#type' => 'checkbox',
      '#title' => t('Use absolute link (begins with "http://")'),
      '#default_value' => $this->options['absolute'],
      '#description' => t('Enable this option to output an absolute link. Required if you want to use the path as a link destination (as in "output this field as a link" above).'),
      '#fieldset' => 'alter',
    );
  }

  function query() {
    $this->ensure_my_table();
    $this->add_additional_fields();
  }

  function render($values) {
    $tid = $this->get_value($values, 'tid');
    return url("taxonomy/term/$tid", array('absolute' => $this->options['absolute']));
  }
}
