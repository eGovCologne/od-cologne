<?php

/**
 * @file
 * Picture - map breakpoints and image styles
 */

/**
 * Admin form
 */
function picture_admin_breakpoints($form, &$form_state, $breakpoint_group_name = '') {
  // Show a list of all groups if no group name is given.
  if ($breakpoint_group_name == '' || $breakpoint_group_name == 'global') {
    return picture_admin_breakpoints_overview_page();
  }
  $machine_name = $breakpoint_group_name;
  $form = array();

  $mappings = picture_mapping_load($breakpoint_group_name);
  $mappings = $mappings ? $mappings : new stdClass();

  $form['picture_mapping'] = array(
    '#type' => 'container',
    '#tree' => TRUE,
  );
  $form['picture_mapping']['machine_name'] = array(
    '#type' => 'value',
    '#value' => isset($mappings->machine_name) ? $mappings->machine_name : $machine_name,
  );
  $form['picture_mapping']['breakpoint_group'] = array(
    '#type' => 'value',
    '#value' => isset($mappings->breakpoint_group) ? $mappings->breakpoint_group : $breakpoint_group_name,
  );
  if (isset($mappings->id)) {
    $form['picture_mapping']['id'] = array(
      '#type' => 'value',
      '#value' => $mappings->id,
    );
  }

  $breakpoints = array();
  $breakpoint_group = breakpoints_breakpoint_group_load($breakpoint_group_name);
  $weight = 0;
  foreach ($breakpoint_group->breakpoints as $breakpoint_name) {
    $breakpoint = breakpoints_breakpoint_load_by_fullkey($breakpoint_name);
    if ($breakpoint && $breakpoint->status) {
      $breakpoint->global_weight = $breakpoint->weight;
      $breakpoint->weight = $weight++;
      $breakpoints[$breakpoint_name] = $breakpoint;
    }
  }

  $image_styles = image_style_options(TRUE);
  foreach ($breakpoints as $breakpoint_name => $breakpoint) {
    $label = '1x ' . $breakpoint->name . ' [' . $breakpoint->breakpoint . ']';
    $form['picture_mapping']['mapping'][$breakpoint_name]['1x'] = array(
      '#title' => check_plain($label),
      '#type' => 'select',
      '#options' => $image_styles,
      '#default_value' => isset($mappings->mapping[$breakpoint_name]['1x']) ? $mappings->mapping[$breakpoint_name]['1x'] : '',
    );
    if (isset($breakpoint->multipliers) && !empty($breakpoint->multipliers)) {
      foreach ($breakpoint->multipliers as $multiplier => $status) {
        if ($status) {
          $label = $multiplier . ' ' . $breakpoint->name . ' [' . $breakpoint->breakpoint . ']';
          $form['picture_mapping']['mapping'][$breakpoint_name][$multiplier] = array(
            '#title' => check_plain($label),
            '#type' => 'select',
            '#options' => $image_styles,
            '#default_value' => isset($mappings->mapping[$breakpoint_name][$multiplier]) ? $mappings->mapping[$breakpoint_name][$multiplier] : '',
          );
        }
      }
    }
  }

  // Buttons
  $form['buttons'] = array(
    '#type' => 'container',
  );

  // Submit button
  $form['buttons']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  return $form;
}

/**
 * Admin form overview page.
 */
function picture_admin_breakpoints_overview_page() {
  $links = array();
  $breakpoint_groups = breakpoints_breakpoint_group_load_all();
  foreach ($breakpoint_groups as $breakpoint_group) {
    $links[] = l($breakpoint_group->name, 'admin/config/media/picture/groups/' . $breakpoint_group->machine_name);
  }
  if (!empty($links)) {
    return array(
      '#type' => 'container',
      '#theme' => 'item_list',
      '#items' => $links,
    );
  }
  else {
    $item['info'] = array(
      '#type' => 'markup',
      '#title' => t('No breakpoint groups found.'),
      '#markup' => t('There\'re no breakpoint groups defined, you\'ll have to !create them first.', array('!create' => l(t('create'), 'admin/config/media/breakpoints/groups/add'))),
    );
    return $item;
  }
}

/**
 * Admin form submit.
 */
function picture_admin_breakpoints_submit($form, &$form_state) {
  $mapping = (object)$form_state['values']['picture_mapping'];
  $saved = picture_mapping_save($mapping);
  $group = breakpoints_breakpoint_group_load($mapping->breakpoint_group);
  if ($saved !== FALSE) {
    drupal_set_message(t('Picture mappings for @group were saved.', array('@group' => $group->name)));
  }
  else {
    drupal_set_message(t('Something went wrong while trying to save picture mappings for @group', array('@group' => $group->name)), 'error');
  }
}

function picture_admin_export_form($form, &$form_state, $mappings_name) {
  // Create the export code textarea.
  ctools_include('export');
  $mapping = picture_mapping_load($mappings_name);
  if (!$mapping) {
    $mapping = new stdClass();
  }
  $export = ctools_export_object('picture_mapping', $mapping);
  $form['mapping_export'] = array(
    '#type' => 'textarea',
    '#title' => t('Mapping code'),
    '#rows' => count(explode("\n", $export)),
    '#default_value' => $export,
    '#weight' => -1,
    '#description' => t('<strong>Warning!</strong> Only import these mappings if the breakpoint group below has been imported on that site already, or if they were manually created there.'),
  );

  // Also export the group it belongs to.
  module_load_include('inc', 'breakpoints', 'breakpoints.admin');
  $form += drupal_get_form('breakpoints_admin_breakpoint_group_export_form', $mapping->breakpoint_group);
  $form['export']['#description'] = t('If you want to import this mapping on an other site,
    you\'ll need to import the breakpoint group with its breakpoints as well,
    if it doesn\'t already exist on that site.');
  return $form;
}

function picture_admin_import_form($form, &$form_state) {
  $form['import'] = array(
    '#type' => 'textarea',
    '#rows' => 10,
  );
  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Import')
  );
  return $form;
}


/**
 * Validate a mapping import.
 */
function picture_admin_import_form_validate($form, &$form_state) {
  ctools_include('export');
  $code = $form_state['values']['import'];
  $mapping = ctools_export_crud_import('picture_mapping', $code);
  if (!picture_mapping_validate($mapping)) {
    form_set_error('import', t('Not a valid mapping object'));
    return;
  }
  if (picture_mapping_load($mapping->machine_name)) {
    form_set_error('import', t('A mapping with machine name %name already exists', array('%name' => $mapping->machine_name)));
    return;
  }
  form_set_value($form['import'], $mapping, $form_state);
}

/**
 * Import mapping.
 */
function picture_admin_import_form_submit($form, &$form_state) {
  $mapping = $form_state['values']['import'];
  if (picture_mapping_save($mapping)) {
    drupal_set_message(t('Mapping %mapping saved.', array('%mapping' => $mapping->machine_name)));
    $form_state['redirect'] = 'admin/config/media/picture/';
  }
  else {
    drupal_set_message(t('Something went wrong, we could not save the mapping'), 'error');
  }
}
