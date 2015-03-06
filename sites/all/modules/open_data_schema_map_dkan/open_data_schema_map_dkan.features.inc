<?php
/**
 * @file
 * open_data_schema_map_dkan.features.inc
 */

/**
 * Implements hook_open_data_schema_apis_defaults().
 */
function open_data_schema_map_dkan_open_data_schema_apis_defaults() {
  $open_data_schema_apis = array();

  // Exported Open Data API Map: CKAN Group List
  $open_data_schema_apis['ckan_group_list'] = array(
    'name' => 'CKAN Group List',
    'enabled' => 1,
    'machine_name' => 'ckan_group_list',
    'api_schema' => 'ckan',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'group',
    'mapping' => array(
      'id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'revision_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'name' => array(
        'value' => '[node:url:args:last]',
        'type' => 'string',
      ),
      'title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'notes' => array(
        'value' => '',
        'type' => 'string',
      ),
      'url' => array(
        'value' => '',
        'type' => 'string',
      ),
      'version' => array(
        'value' => '',
        'type' => 'string',
      ),
      'state' => array(
        'value' => '',
        'type' => 'string',
      ),
      'owner_org' => array(
        'value' => '',
        'type' => 'string',
      ),
      'log_message' => array(
        'value' => '',
        'type' => 'string',
      ),
      'private' => array(
        'value' => '',
        'type' => 'boolean',
      ),
      'relationships_as_object' => array(
        'value' => '',
        'type' => 'object',
      ),
      'revision_timestamp' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_created' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_modified' => array(
        'value' => '',
        'type' => 'string',
      ),
      'creator_user_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'type' => array(
        'value' => '',
        'type' => 'string',
      ),
      'resources' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_id' => array(
          'value' => '',
          'type' => '',
        ),
        'url' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'format' => array(
          'value' => '',
          'type' => '',
        ),
        'hash' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'Position' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_type' => array(
          'value' => '',
          'type' => '',
        ),
        'url_type' => array(
          'value' => '',
          'type' => '',
        ),
        'mimetype' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_url' => array(
          'value' => '',
          'type' => '',
        ),
        'size' => array(
          'value' => '',
          'type' => '',
        ),
        'created' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_group_id' => array(
          'value' => '',
          'type' => '',
        ),
        'cache_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'datastore_active' => array(
          'value' => '',
          'type' => '',
        ),
        'last_modified' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'tags' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'vocabulary_id' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'groups' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'display_name' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '[node:uuid]',
          'type' => '',
        ),
        'image_display_url' => array(
          'value' => '',
          'type' => '',
        ),
        'title' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '[node:url]',
          'type' => '',
        ),
      ),
      'extras' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'key' => array(
          'value' => '',
          'type' => '',
        ),
        'value' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
      ),
    ),
    'endpoint' => 'api/3/action/group_list',
    'arguments' => array(),
  );
  // Exported Open Data API Map: CKAN Package List
  $open_data_schema_apis['ckan_package_list'] = array(
    'name' => 'CKAN Package List',
    'enabled' => 1,
    'machine_name' => 'ckan_package_list',
    'api_schema' => 'ckan',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'dataset',
    'mapping' => array(
      'id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'revision_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'name' => array(
        'value' => '[node:url:args:last]',
        'type' => 'string',
      ),
      'title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'notes' => array(
        'value' => '',
        'type' => 'string',
      ),
      'url' => array(
        'value' => '',
        'type' => 'string',
      ),
      'version' => array(
        'value' => '',
        'type' => 'string',
      ),
      'state' => array(
        'value' => '',
        'type' => 'string',
      ),
      'owner_org' => array(
        'value' => '',
        'type' => 'string',
      ),
      'log_message' => array(
        'value' => '',
        'type' => 'string',
      ),
      'private' => array(
        'value' => '',
        'type' => 'boolean',
      ),
      'relationships_as_object' => array(
        'value' => '',
        'type' => 'object',
      ),
      'revision_timestamp' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_created' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_modified' => array(
        'value' => '',
        'type' => 'string',
      ),
      'creator_user_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'type' => array(
        'value' => '',
        'type' => 'string',
      ),
      'resources' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_resources',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_id' => array(
          'value' => '',
          'type' => '',
        ),
        'url' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'format' => array(
          'value' => '',
          'type' => '',
        ),
        'hash' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'Position' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_type' => array(
          'value' => '',
          'type' => '',
        ),
        'url_type' => array(
          'value' => '',
          'type' => '',
        ),
        'mimetype' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_url' => array(
          'value' => '',
          'type' => '',
        ),
        'size' => array(
          'value' => '',
          'type' => '',
        ),
        'created' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_group_id' => array(
          'value' => '',
          'type' => '',
        ),
        'cache_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'datastore_active' => array(
          'value' => '',
          'type' => '',
        ),
        'last_modified' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'tags' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'vocabulary_id' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'groups' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'display_name' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'image_display_url' => array(
          'value' => '',
          'type' => '',
        ),
        'title' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'extras' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'key' => array(
          'value' => '',
          'type' => '',
        ),
        'value' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
      ),
    ),
    'endpoint' => 'api/3/action/package_list',
    'arguments' => array(),
  );
  // Exported Open Data API Map: CKAN Package Show
  $open_data_schema_apis['ckan_package_show'] = array(
    'name' => 'CKAN Package Show',
    'enabled' => 1,
    'machine_name' => 'ckan_package_show',
    'api_schema' => 'ckan',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'dataset',
    'mapping' => array(
      'id' => array(
        'value' => '[node:uuid]',
        'type' => 'string',
      ),
      'revision_id' => array(
        'value' => '[node:vuuid]',
        'type' => 'string',
      ),
      'name' => array(
        'value' => '[node:url:args:last]',
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
        'value' => '[site:mail]',
        'type' => 'string',
      ),
      'license_title' => array(
        'value' => '[node:field_license]',
        'type' => 'string',
      ),
      'license_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'notes' => array(
        'value' => '[node:body]',
        'type' => 'string',
      ),
      'url' => array(
        'value' => '[node:url]',
        'type' => 'string',
      ),
      'version' => array(
        'value' => '',
        'type' => 'string',
      ),
      'state' => array(
        'value' => 'Active',
        'type' => 'string',
      ),
      'owner_org' => array(
        'value' => '',
        'type' => 'string',
      ),
      'log_message' => array(
        'value' => '[node:log]',
        'type' => 'string',
      ),
      'private' => array(
        'value' => '[node:status]',
        'type' => 'boolean',
      ),
      'relationships_as_object' => array(
        'value' => '',
        'type' => 'object',
      ),
      'revision_timestamp' => array(
        'value' => '[node:changed]',
        'type' => 'string',
      ),
      'metadata_created' => array(
        'value' => '[node:created]',
        'type' => 'string',
      ),
      'metadata_modified' => array(
        'value' => '[node:changed]',
        'type' => 'string',
      ),
      'creator_user_id' => array(
        'value' => '[node:author:uuid]',
        'type' => 'string',
      ),
      'type' => array(
        'value' => 'Dataset',
        'type' => 'string',
      ),
      'resources' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_resources',
          'type' => '',
        ),
        'id' => array(
          'value' => '[node:field-resources:Nth:uuid]',
          'type' => '',
        ),
        'revision_id' => array(
          'value' => '[node:field-resources:Nth:vuuid]',
          'type' => '',
        ),
        'url' => array(
          'value' => '[node:field-resources:Nth:url]',
          'type' => '',
        ),
        'description' => array(
          'value' => '[node:field-resources:Nth:body]',
          'type' => '',
        ),
        'format' => array(
          'value' => '[node:field-resources:Nth:field_format]',
          'type' => '',
        ),
        'hash' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => 'Active',
          'type' => '',
        ),
        'Position' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '[node:field-resources:Nth:changed]',
          'type' => '',
        ),
        'name' => array(
          'value' => '[node:field-resources:Nth:url:path]',
          'type' => '',
        ),
        'resource_type' => array(
          'value' => '',
          'type' => '',
        ),
        'url_type' => array(
          'value' => '',
          'type' => '',
        ),
        'mimetype' => array(
          'value' => '[node:field-resources:Nth:field-upload:mime] || [node:field-resources:Nth:field_format]',
          'type' => '',
        ),
        'webstore_url' => array(
          'value' => '',
          'type' => '',
        ),
        'size' => array(
          'value' => '[node:field-resources:Nth:field-upload:size]',
          'type' => '',
        ),
        'created' => array(
          'value' => '[node:field-resources:Nth:created]',
          'type' => '',
        ),
        'resource_group_id' => array(
          'value' => '[node:field-resources:Nth:og-group-ref:0:uuid]',
          'type' => '',
        ),
        'cache_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'datastore_active' => array(
          'value' => '',
          'type' => '',
        ),
        'last_modified' => array(
          'value' => 'Date changed	[node:field-resources:Nth:changed]',
          'type' => '',
        ),
      ),
      'tags' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_tags',
          'type' => '',
        ),
        'id' => array(
          'value' => '[node:field-tags:Nth:uuid]',
          'type' => '',
        ),
        'vocabulary_id' => array(
          'value' => '[node:field-tags:Nth:vocabulary:vid]',
          'type' => '',
        ),
        'name' => array(
          'value' => '[node:field-tags:Nth:name]',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'groups' => array(
        'odsm_entity_reference' => array(
          'value' => 'og_group_ref',
          'type' => '',
        ),
        'display_name' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '[node:og-group-ref:Nth:body]',
          'type' => '',
        ),
        'id' => array(
          'value' => '[node:og-group-ref:Nth:uuid]',
          'type' => '',
        ),
        'image_display_url' => array(
          'value' => '[node:og-group-ref:Nth:field_image]',
          'type' => '',
        ),
        'title' => array(
          'value' => '[node:og-group-ref:Nth:title]',
          'type' => '',
        ),
        'name' => array(
          'value' => '[node:og-group-ref:Nth:url:path]',
          'type' => '',
        ),
      ),
      'extras' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_additional_info',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'key' => array(
          'value' => '[node:field-additional-info:Nth:first]',
          'type' => '',
        ),
        'value' => array(
          'value' => '[node:field-additional-info:Nth:second]',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
      ),
    ),
    'endpoint' => 'api/3/action/package_show',
    'arguments' => array(
      1 => array(
        'field' => 'name',
        'required' => 0,
      ),
      2 => array(
        'field' => 'id',
        'required' => 0,
      ),
    ),
  );
  // Exported Open Data API Map: CKAN Revision List
  $open_data_schema_apis['ckan_revision_list'] = array(
    'name' => 'CKAN Revision List',
    'enabled' => 1,
    'machine_name' => 'ckan_revision_list',
    'api_schema' => 'ckan',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'dataset',
    'mapping' => array(
      'id' => array(
        'value' => '[node:uuid]',
        'type' => 'string',
      ),
      'revision_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'name' => array(
        'value' => '',
        'type' => 'string',
      ),
      'title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author' => array(
        'value' => '',
        'type' => 'string',
      ),
      'author_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer' => array(
        'value' => '',
        'type' => 'string',
      ),
      'maintainer_email' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_title' => array(
        'value' => '',
        'type' => 'string',
      ),
      'license_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'notes' => array(
        'value' => '',
        'type' => 'string',
      ),
      'url' => array(
        'value' => '',
        'type' => 'string',
      ),
      'version' => array(
        'value' => '',
        'type' => 'string',
      ),
      'state' => array(
        'value' => '',
        'type' => 'string',
      ),
      'owner_org' => array(
        'value' => '',
        'type' => 'string',
      ),
      'log_message' => array(
        'value' => '',
        'type' => 'string',
      ),
      'private' => array(
        'value' => '',
        'type' => 'boolean',
      ),
      'relationships_as_object' => array(
        'value' => '',
        'type' => 'object',
      ),
      'revision_timestamp' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_created' => array(
        'value' => '',
        'type' => 'string',
      ),
      'metadata_modified' => array(
        'value' => '',
        'type' => 'string',
      ),
      'creator_user_id' => array(
        'value' => '',
        'type' => 'string',
      ),
      'type' => array(
        'value' => '',
        'type' => 'string',
      ),
      'resources' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_id' => array(
          'value' => '',
          'type' => '',
        ),
        'url' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'format' => array(
          'value' => '',
          'type' => '',
        ),
        'hash' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'Position' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_type' => array(
          'value' => '',
          'type' => '',
        ),
        'url_type' => array(
          'value' => '',
          'type' => '',
        ),
        'mimetype' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_url' => array(
          'value' => '',
          'type' => '',
        ),
        'size' => array(
          'value' => '',
          'type' => '',
        ),
        'created' => array(
          'value' => '',
          'type' => '',
        ),
        'resource_group_id' => array(
          'value' => '',
          'type' => '',
        ),
        'cache_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'webstore_last_updated' => array(
          'value' => '',
          'type' => '',
        ),
        'datastore_active' => array(
          'value' => '',
          'type' => '',
        ),
        'last_modified' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'tags' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'vocabulary_id' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'groups' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'display_name' => array(
          'value' => '',
          'type' => '',
        ),
        'description' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'image_display_url' => array(
          'value' => '',
          'type' => '',
        ),
        'title' => array(
          'value' => '',
          'type' => '',
        ),
        'name' => array(
          'value' => '',
          'type' => '',
        ),
      ),
      'extras' => array(
        'odsm_entity_reference' => array(
          'value' => '',
          'type' => '',
        ),
        'id' => array(
          'value' => '',
          'type' => '',
        ),
        'key' => array(
          'value' => '',
          'type' => '',
        ),
        'value' => array(
          'value' => '',
          'type' => '',
        ),
        'state' => array(
          'value' => '',
          'type' => '',
        ),
        'revision_timestamp' => array(
          'value' => '',
          'type' => '',
        ),
      ),
    ),
    'endpoint' => 'api/3/action/revision_list',
    'arguments' => array(),
  );
  // Exported Open Data API Map: Data.json
  $open_data_schema_apis['data_json'] = array(
    'name' => 'Data.json',
    'enabled' => 1,
    'machine_name' => 'data_json',
    'api_schema' => 'pod',
    'description' => NULL,
    'type' => 'node',
    'bundle' => 'dataset',
    'mapping' => array(
      'accessLevel' => array(
        'value' => '[node:field_public_access_level]',
        'type' => 'string',
      ),
      'accessLevelComment' => array(
        'value' => '',
        'type' => 'string',
      ),
      'accessURL' => array(
        'value' => '',
        'type' => 'string',
      ),
      'accrualPeriodicity' => array(
        'value' => '[node:field-frequency]',
        'type' => 'string',
      ),
      'bureauCode' => array(
        'value' => '',
        'type' => 'array',
      ),
      'contactPoint' => array(
        'value' => '',
        'type' => 'string',
      ),
      'dataDictionary' => array(
        'value' => '[node:field-data-dictionary]',
        'type' => 'string',
      ),
      'dataQuality' => array(
        'value' => '',
        'type' => 'boolean',
      ),
      'description' => array(
        'value' => '[node:body]',
        'type' => 'string',
      ),
      'distribution' => array(
        'odsm_entity_reference' => array(
          'value' => 'field_resources',
          'type' => '',
        ),
        'accessURL' => array(
          'value' => '[node:field-resources:Nth:field-link-api:url] || [node:field-resources:Nth:field_link_remote_file] || [node:field-resources:Nth:field-upload:url]',
          'type' => '',
        ),
        'format' => array(
          'value' => '[node:field-resources:Nth:field-format:name]',
          'type' => '',
        ),
      ),
      'format' => array(
        'value' => '',
        'type' => 'string',
      ),
      'identifier' => array(
        'value' => '[node:uuid]',
        'type' => 'string',
      ),
      'issued' => array(
        'value' => '',
        'type' => 'string',
      ),
      'keyword' => array(
        'value' => '[node:field-tags]',
        'type' => 'array',
      ),
      'landingPage' => array(
        'value' => '',
        'type' => 'string',
      ),
      'language' => array(
        'value' => 'en',
        'type' => 'array',
      ),
      'license' => array(
        'value' => '[node:field_license]',
        'type' => 'string',
      ),
      'mbox' => array(
        'value' => '[node:field-contact-email]',
        'type' => 'string',
      ),
      'modified' => array(
        'value' => '[node:changed]',
        'type' => 'string',
      ),
      'PrimaryITInvestmentUII' => array(
        'value' => '',
        'type' => 'string',
      ),
      'programCode' => array(
        'value' => '',
        'type' => 'array',
      ),
      'publisher' => array(
        'value' => '[node:og_group_ref]',
        'type' => 'string',
      ),
      'references' => array(
        'value' => '[node:field_related_content]',
        'type' => 'array',
      ),
      'spatial' => array(
        'value' => '[node:field_spatial]',
        'type' => 'string',
      ),
      'systemOfRecords' => array(
        'value' => '',
        'type' => 'string',
      ),
      'temporal' => array(
        'value' => '[node:field_temporal_coverage]',
        'type' => 'string',
      ),
      'theme' => array(
        'value' => '',
        'type' => 'array',
      ),
      'title' => array(
        'value' => '[node:title]',
        'type' => 'string',
      ),
      'webService' => array(
        'value' => '',
        'type' => 'string',
      ),
    ),
    'endpoint' => 'data.json',
    'arguments' => array(),
  );
  return $open_data_schema_apis;
}
