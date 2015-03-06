<?php
/**
 * @file
 * open_data_schema_map_ogpd_feature.features.features_overrides.inc
 */

/**
 * Implements hook_features_override_default_overrides().
 */
function open_data_schema_map_ogpd_feature_features_override_default_overrides() {
  // This code is only used for UI in features. Exported alters hooks do the magic.
  $overrides = array();

  // Exported overrides for: open_data_schema_apis
  $overrides["open_data_schema_apis.ckan_package_show.enabled"] = 0;

 return $overrides;
}
