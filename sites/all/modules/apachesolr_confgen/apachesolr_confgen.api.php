<?php
/**
 * @file
 *   Exposed Hooks in 7.x:
 */


/**
 * Alter the schema.xml using QueryPath.
 * @see http://querypath.org/
 *
 * @param object $qp
 *  A querypath object representing schema.xml
 *  @see querypath.module
 * @param string $solr_version
 *  switch to target different solr versions, currently '1.4.x' and '3.5.x'
 */
function hook_apachesolr_confgen_schema_alter($qp, $solr_version) {
  $language = 'en';

  $qp
    ->find(':root')->xpath("types/fieldType[@name='text']//filter[@class='solr.SynonymFilterFactory']")
    ->attr('synonyms', 'synonyms_' . $language . '.txt')
    ->attr('ignoreCase', variable_get('apachesolr_multilingual_ignoreCase_synonyms_' . $language, 1));
}

/**
 * Alter the solrconfig.xml using QueryPath.
 * @see http://querypath.org/
 *
 * @param object $qp
 *  A querypath object representing schema.xml
 *  @see querypath.module
 * @param string $solr_version
 *  switch to target different solr versions, currently '1.4.x' and '3.5.x'
 */
function hook_apachesolr_confgen_solrconfig_alter($qp, $solr_version) {
  $qp
    ->find(':root maxTime')
    ->text(variable_get('apachesolr_confgen_advanced_settings_autoCommit_maxTime', 120000));
}

/**
 * Alter the elevate.xml using QueryPath.
 * @see http://querypath.org/
 *
 * @param object $qp
 *  A querypath object representing schema.xml
 *  @see querypath.module
 * @param string $solr_version
 *  switch to target different solr versions, currently '1.4.x' and '3.5.x'
 */
function hook_apachesolr_confgen_elevate_alter($qp, $solr_version) {
}

/**
 * Alter the currency.xml using QueryPath.
 * @see http://querypath.org/
 *
 * @param object $qp
 *  A querypath object representing schema.xml
 *  @see querypath.module
 * @param string $solr_version
 *  switch to target different solr versions, currently '1.4.x' and '3.5.x'
 */
function hook_apachesolr_confgen_currency_alter($qp, $solr_version) {
}
/**
 * Alter the downloadable zip file conting all solr config files
 * schema.xml and solrconfig.xml are always included in the files array
 * and should be altered using the dedicated hooks above.
 *
 * @param array $files
 *  array('file_name' => 'file_content')
 * @param string $solr_version
 *  switch to target different solr versions, currently '1.4.x' and '3.5.x'
 */
function hook_apachesolr_confgen_zip_file_alter(&$files, $solr_version) {
  $files['synnonyms_en.txt'] = <<<SYNONYMS
# blank lines and lines starting with pound are comments.

#Explicit mappings match any token sequence on the LHS of "=>"
#and replace with all alternatives on the RHS.  These types of mappings
#ignore the expand parameter in the schema.
#Examples:
i-pod, i pod => ipod,
sea biscuit, sea biscit => seabiscuit

#Equivalent synonyms may be separated with commas and give
#no explicit mapping.  In this case the mapping behavior will
#be taken from the expand parameter in the schema.  This allows
#the same synonym file to be used in different synonym handling strategies.
#Examples:
ipod, i-pod, i pod
foozball , foosball
universe , cosmos

# If expand==true, "ipod, i-pod, i pod" is equivalent to the explicit mapping:
ipod, i-pod, i pod => ipod, i-pod, i pod
# If expand==false, "ipod, i-pod, i pod" is equivalent to the explicit mapping:
ipod, i-pod, i pod => ipod

#multiple synonym mapping entries are merged.
foo => foo bar
foo => baz
#is equivalent to
foo => foo bar, baz
SYNONYMS;
}



