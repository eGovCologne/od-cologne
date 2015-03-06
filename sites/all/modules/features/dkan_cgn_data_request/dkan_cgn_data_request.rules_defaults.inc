<?php
/**
 * @file
 * dkan_cgn_data_request.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function dkan_cgn_data_request_default_rules_configuration() {
  $items = array();
  $items['rules_data_request'] = entity_import('rules_config', '{ "rules_data_request" : {
      "LABEL" : "Data Request Mail",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "rules" ],
      "ON" : { "node_insert--request_data" : { "bundle" : "request_data" } },
      "DO" : [
        { "mail" : {
            "to" : "b.wasserer@gmx.de",
            "subject" : "Neue Anfrage",
            "message" : "test",
            "language" : [ "" ]
          }
        }
      ]
    }
  }');
  return $items;
}
