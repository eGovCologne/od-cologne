<?php

/**
 * @file
 * Widget that renders facets as a list of clickable links.
 */

/**
 * Extends FacetapiWidget to provide tagcloud widget.
 */
class FacetapiWidgetTagcloud extends FacetapiWidget {

  /**
   * Implements FacetapiWidget::__construct().
   *
   * Overrides constructor to reset the key.
   */
  public function __construct($id, array $realm, FacetapiFacet $facet, stdClass $settings) {
    parent::__construct($id, $realm, $facet, $settings);
    $this->key = $facet['name'];
  }

  /**
   * Implements FacetapiWidget::execute().
   */
  public function execute() {
    // Sets the key, captures the facet's render array.
    $element = &$this->build[$this->facet['field alias']];

    // Calculates tagadelic weights, builds item list.
    $this->calculateWeights();
    $element = array(
      '#theme' => 'item_list',
      '#items' => $this->buildListItems($element),
      '#attributes' => $this->build['#attributes'],
      '#attached' => array(
        'css' => array(
          drupal_get_path('module', 'facetapi_tagcloud') . '/facetapi_tagcloud.css',
        ),
      ),
    );

    // Gets around bug in beta2 release of Facet API.
    // @see http://drupal.org/node/1173672
    if (is_array($element['#attributes']['class'])) {
      $element['#attributes']['class'][] = 'facetapi-tagcloud-widget';
    }
    else {
      $element['#attributes']['class'] .= ' facetapi-tagcloud-widget';
    }
  }

  /**
   * Calculates tagadelic weights for each item.
   */
  function calculateWeights() {
    $element = &$this->build[$this->facet['field alias']];
    $levels = $this->settings->settings['tagcloud_levels'];

    // NOTE: The weight calculation is completely stolen from the Tagadelic
    // project at http://drupal.org/project/tagadelic. The comments credit the
    // mathematics to Steven Wittens, aka UnConeD (who now hates Drupal).
    $min = 1e9;
    $max = -1e9;
    foreach ($element as $value => $item) {
      $log = log($item['#count']);
      $element[$value]['#count'] = $log;
      $min = min($min, $log);
      $max = max($max, $log);
    }

    // We need to ensure the range is slightly too large to make sure even the
    // largest element is rounded down.
    $range = max(.01, $max - $min) * 1.0001;

    // Adds tagcloud weights for the facet items.
    foreach ($element as $value => $item) {
      // Ensure active items are always rendered using the largest weight.
      // @see http://drupal.org/node/1367824
      if ($item['#count'] != $max) {
        $weight = 1 + floor((int) $levels * ($item['#count'] - $min) / $range);
      }
      else {
        $weight = $levels;
      }
      $class = 'facetapi-tagcloud-level' . $weight;
      $element[$value]['#attribues']['class'][] = $class;
    }
  }

  /**
   * Recursive function that converts the render array into an array that can be
   * passed to theme_item_list().
   *
   * @param array $build
   *   The facet's render array.
   *
   * @return array
   *   The "items" parameter for theme_item_list().
   */
  function buildListItems($build) {
    $items = array();
    foreach ($build as $value => $item) {
      $row = array('class' => array());

      // Initializes variables passed to theme hook.
      $variables = array(
        'text' => $item['#markup'],
        'path' => $item['#path'],
        'options' => array(
          'attributes' => $item['#attribues'],
          'html' => $item['#html'],
          'query' => $item['#query'],
        ),
      );

      // Gets theme hook, adds last minute classes.
      $class = ($item['#active']) ? 'facetapi-active' : 'facetapi-inactive';
      $variables['options']['attributes']['class'][] = $class;

      // Themes the link, adds row to items.
      $hook = ($item['#active']) ? 'facetapi_tagcloud_link_active' : 'facetapi_link_inactive';
      $row['data'] = theme($hook, $variables);
      $items[] = $row;
    }

    return $items;
  }

  /**
   * Implements FacetapiWidget::settingsForm().
   */
  public function settingsForm(&$form, &$form_state) {
    $form['widget']['widget_settings']['tagcloud'][$this->id]['tagcloud_levels'] = array(
      '#type' => 'select',
      '#title' => t('Number of levels'),
      '#default_value' => $this->settings->settings['tagcloud_levels'],
      '#options' => drupal_map_assoc(range(2, 10)),
      '#description' => t('The number of levels between the lowest facet count and the highest. The size of the item in the tag cloud is determined by its level, so more levels will yield a wider variety of sizes.'),
      '#states' => array(
        'visible' => array(
          'select[name="widget"]' => array('value' => $this->id),
        ),
      ),
    );
  }

  /**
   * Implements FacetapiWidget::getDefaultSettings().
   */
  public function getDefaultSettings() {
    return array('tagcloud_levels' => 6);
  }
}
