<?php

/**
 * Processor to set the index and search settings. Requires FuzzySearchService.
 */
class FuzzysearchExcerpt extends SearchApiAbstractProcessor {

  public function supportsIndex(SearchApiIndex $index) {
    return ($index->server() && $index->server()->supportsFeature('fuzzysearch'));
  }

  public function configurationForm() {
  $form['debug_score'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display scoring'),
    '#description' => t('If selected, the completeness and score of the results will be shown below each result, which may be helpful for tuning the display.'),
    '#default_value' => FALSE,
  );
  $form['excerpt_length'] = array(
    '#type' => 'textfield',
    '#title' => t('Result excerpt length'),
    '#size' => 3,
    '#maxlength' => 3,
    '#description' => t('Set the length of the displayed text excerpt containing a found search term. Applies per found term.'),
    '#default_value' => 200,
  );
  $form['max_result_length'] = array(
    '#type' => 'textfield',
    '#title' => t('Maximum result length'),
    '#size' => 4,
    '#maxlength' => 4,
    '#description' => t('Set the maximum length of the displayed result. Set to 0 for unlimited length. Applies per result.'),
    '#default_value' => 400,
  );
  $form['spelling'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum spelling score'),
    '#size' => 3,
    '#maxlength' => 3,
    '#description' => t('Fuzzysearch tries to highlight search terms that may be misspelled. You can set the minimum threshold, which is calculated as a ratio of ngram hits to misses in a term. 0 may cause a misspelling to highlight everything, and 100 will only highlight exact terms. Enter value between 0 and 100. Changing this setting does not require reindexing.'),
    '#default_value' => 30,
  );

    if (!empty($this->options)) {
      $form['debug_score']['#default_value']        = $this->options['debug_score'];
      $form['excerpt_length']['#default_value']     = $this->options['excerpt_length'];
      $form['max_result_length']['#default_value']  = $this->options['max_result_length'];
      $form['spelling']['#default_value']           = $this->options['spelling'];
    }

    return $form;
  }

  function configurationFormValidate(array $form, array &$values, array &$form_state) {
  }

  protected function processFieldValue(&$value) {
  }

  protected function process(&$value) {
  }

  protected function prepare() {
  }

  public function postprocessSearchResults(array &$response, SearchApiQuery $query) {
    $keys = $query->getKeys();
      if (is_array($keys)) {
      foreach ($keys as $key => &$v) {
        if (!element_child($key)) {
          unset($keys[$key]);
        }
      }
    }
    if (!empty($response['results'])) {
      $entity_info = entity_get_info($this->index->item_type);
      // Better way to check if we have text?
      if (isset($entity_info['view modes']['full'])) {
        $entities = entity_load($this->index->item_type, array_keys($response['results']));
        foreach ($entities as $key => $entity) {
          $response['results'][$key]['excerpt'] = fuzzysearch_build_excerpt($entity, $this->index, (array) $keys);
        }
      }
    }
  }
}
