<?php
/**
 * @file
 * dkan_cgn_data_request.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function dkan_cgn_data_request_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'access overlay'.
  $permissions['access overlay'] = array(
    'name' => 'access overlay',
    'roles' => array(
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'overlay',
  );

  return $permissions;
}
