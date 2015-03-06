<?php
/**
 * @file
 * open_data_schema_map_ogpd_feature.features.inc
 */

/**
 * Implements hook_open_data_schema_apis_defaults_alter().
 */
function open_data_schema_map_ogpd_feature_open_data_schema_apis_defaults_alter(&$data) {
  if (isset($data['ckan_package_show'])) {
    $data['ckan_package_show']['enabled'] = 0; /* WAS: 1 */
  }
}

/**
 * Implements hook_open_data_schema_apis_defaults().
 */
function open_data_schema_map_ogpd_feature_open_data_schema_apis_defaults() {
  $open_data_schema_apis = array();

  // Exported Open Data API Map: OGPD Package Show
  $open_data_schema_apis['ogpd_package_show'] = array(
    'name' => 'OGPD Package Show',
    'enabled' => 1,
    'machine_name' => 'ogpd_package_show',
    'api_schema' => 'ogpd',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'dataset',
    'mapping' => array(
      'name' => array(
        'value' => '[node:url:args:last]',
        'type' => 'string',
      ),
      'id' => array(
        'value' => '[node:uuid]',
        'type' => 'string',
      ),
      'title' => array(
        'value' => '[node:title]',
        'type' => 'string',
      ),
      'author' => array(
        'value' => '[node:field_author]',
        'type' => 'string',
      ),
      'author_email' => array(
        'value' => '[node:field-contact-email]',
        'type' => 'string',
      ),
      'maintainer' => array(
        'value' => '[site:name]',
        'type' => 'string',
      ),
      'maintainer_email' => array(
        'value' => '[site:email]',
        'type' => 'string',
      ),
      'notes' => array(
        'value' => '[node:body]',
        'type' => 'string',
      ),
      'groups' => array(
        'value' => '[node:og_group_ref]',
        'type' => 'array',
      ),
      'tags' => array(
        'value' => '[node:field_tags]',
        'type' => 'array',
      ),
      'url' => array(
        'value' => '[node:url]',
        'type' => 'string',
      ),
      'type' => array(
        'value' => 'dataset',
        'type' => 'string',
      ),
      'resources' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_resources',
          'type' => '',
        ),
        'url' => array(
          'value' => '[node:field-resources:Nth:url]',
          'type' => 'string',
        ),
        'format' => array(
          'value' => '[node:field-resources:Nth:field_format]',
          'type' => 'string',
        ),
        'description' => array(
          'value' => '[node:field-resources:Nth:body]',
          'type' => 'string',
        ),
        'language' => array(
          'value' => 'de',
          'type' => 'string',
        ),
        'hash' => array(
          'value' => '',
          'type' => 'string',
        ),
      ),
      'license_id' => array(
        'value' => '[node:field-license]',
        'type' => 'string',
      ),
      'extras' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'contacts' => array(
          'odsm_entity_reference' => array(
            'value' => '',
            'type' => '',
          ),
          'role' => array(
            'value' => '',
            'type' => 'string',
          ),
          'name' => array(
            'value' => '[node:field_contact_name]',
            'type' => 'string',
          ),
          'url' => array(
            'value' => '',
            'type' => 'string',
          ),
          'email' => array(
            'value' => '[node:field_contact_email]',
            'type' => 'string',
          ),
          'address' => array(
            'value' => '',
            'type' => 'string',
          ),
        ),
        'dates' => array(
          'odsm_entity_reference' => array(
            'value' => '',
            'type' => '',
          ),
          'role' => array(
            'value' => '',
            'type' => 'string',
          ),
          'date' => array(
            'value' => '[node:changed]',
            'type' => 'string',
          ),
        ),
        'terms_of_use' => array(
          'odsm_entity_reference' => array(
            'value' => '',
            'type' => '',
          ),
          'other' => array(
            'value' => '',
            'type' => 'string',
          ),
          'license_url' => array(
            'value' => '',
            'type' => 'string',
          ),
          'attribution_text' => array(
            'value' => '',
            'type' => 'string',
          ),
          'is_free_to_use' => array(
            'value' => '',
            'type' => 'boolean',
          ),
        ),
        'subgroups' => array(
          'value' => '',
          'type' => 'array',
        ),
        'metadata_original_portal' => array(
          'value' => '',
          'type' => 'string',
        ),
        'metadata_original_id' => array(
          'value' => '',
          'type' => 'string',
        ),
        'metadata_original_xml' => array(
          'value' => '',
          'type' => 'string',
        ),
        'metadata_original_html' => array(
          'value' => '',
          'type' => 'string',
        ),
        'metadata_transformer' => array(
          'value' => '',
          'type' => 'string',
        ),
        'spatial' => array(
          'odsm_entity_reference' => array(
            'value' => '',
            'type' => '',
          ),
          'type' => array(
            'value' => '',
            'type' => 'string',
          ),
          'coordinates' => array(
            'value' => '',
            'type' => 'array',
          ),
        ),
        'spatial_reference' => array(
          'odsm_entity_reference' => array(
            'value' => '',
            'type' => '',
          ),
          'ags' => array(
            'value' => '',
            'type' => 'string',
          ),
          'nuts' => array(
            'value' => '',
            'type' => 'string',
          ),
          'uri' => array(
            'value' => '',
            'type' => 'string',
          ),
          'text' => array(
            'value' => '',
            'type' => 'string',
          ),
        ),
        'geographical_granularity' => array(
          'value' => '',
          'type' => 'string',
        ),
        'temporal_coverage_from' => array(
          'value' => '[node:field_temporal_coverage]',
          'type' => 'string',
        ),
        'temporal_coverage_to' => array(
          'value' => '',
          'type' => 'string',
        ),
        'temporal_granularity' => array(
          'value' => '',
          'type' => 'string',
        ),
        'temporal_granularity_factor' => array(
          'value' => '',
          'type' => 'number',
        ),
        'used_datasets' => array(
          'value' => '',
          'type' => 'array',
        ),
        'sector' => array(
          'value' => '',
          'type' => 'string',
        ),
        'images' => array(
          'value' => '',
          'type' => 'array',
        ),
        'ogd_version' => array(
          'value' => '',
          'type' => 'string',
        ),
      ),
    ),
    'endpoint' => 'api/3/action/package_show',
    'arguments' => array(
      1 => array(
        'field' => 'id',
        'required' => 1,
      ),
      2 => array(
        'field' => 'name',
        'required' => 0,
      ),
    ),
  );
  return $open_data_schema_apis;
}
