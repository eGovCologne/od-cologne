<?php
/**
 * @file
 * Variable Realm controller.
 */

/**
 * Controller for solr version realms.
 */
class SolrVersionRealm extends VariableRealmDefaultController {

  /**
   * Implementation of VariableRealmControllerInterface::getAvailableVariables().
   */
  public function getAvailableVariables() {
    $version_dependent = array();
    $conf = variable_get('apachesolr_confgen_solr_version_dependent_variables', array());
    foreach (variable_get_info() as $name => $variable) {
      if (!empty($variable['solr_version_dependent']) || in_array($name, $conf)) {
        $version_dependent[] = $name;
      }
    }
    return $version_dependent;
  }

}
