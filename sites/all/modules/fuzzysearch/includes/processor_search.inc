<?php

/**
 * Processor to set the index and search settings. Requires FuzzySearchService.
 */
class FuzzysearchSearch extends SearchApiAbstractProcessor {

  public function supportsIndex(SearchApiIndex $index) {
    return ($index->server() && $index->server()->supportsFeature('fuzzysearch'));
  }

  public function configurationForm() {
  $form['ngram_length'] = array(
    '#type' => 'select',
    '#title' => t('Ngram length'),
    '#description' => t('Choose 3 unless you have special requirements.'),
    '#options' => drupal_map_assoc(array(2, 3, 4, 5, 6)),
    '#default_value' => 3,
  );
  $form['missing_letters'] = array(
    '#type' => 'select',
    '#title' => t('Assume missing letters in search terms'),
    '#description' => t('A search term as entered by a user may be missing letters. Up to how many missing letters in the term do you want to assume? 0 means the term will not return longer words in the results. 1 means a 4 letter search term will also check 5 letters words in the index.'),
    '#options' => drupal_map_assoc(range(0, 50)),
    '#default_value' => 5,
  );
  $form['extra_letters'] = array(
    '#type' => 'select',
    '#title' => t('Assume extra letters in search terms'),
    '#description' => t('A search term as entered by a user may have extra letters. Up to how many extra letters in the term do you want to assume? 0 means the term will not return shorter words in the results. 1 means a 4 letter search term will also check 3 letters words in the index.'),
    '#options' => drupal_map_assoc(range(0, 50)),
    '#default_value' => 5,
  );
  $form['completeness'] = array(
    '#type' => 'textfield',
    '#title' => t('Minimum completeness'),
    '#size' => 3,
    '#maxlength' => 3,
    '#description' => t('Enter a value between 0 and 100 to set the minimum match completeness required in the returned results.'),
    '#default_value' => 40,
  );
  $form['sort_score'] = array(
    '#type' => 'checkbox',
    '#title' => t('Sort by score'),
    '#description' => t('If selected, the results will be sorted by score first and completeness second, which can make tag scores even more important. The default is to sort by completeness first.'),
    '#default_value' => FALSE,
  );

    if (!empty($this->options)) {
      $form['ngram_length']['#default_value']     = $this->options['ngram_length'];
      $form['missing_letters']['#default_value']  = $this->options['missing_letters'];
      $form['extra_letters']['#default_value']    = $this->options['extra_letters'];
      $form['completeness']['#default_value']     = $this->options['completeness'];
      $form['sort_score']['#default_value']       = $this->options['sort_score'];
    }

    return $form;
  }

  function configurationFormValidate(array $form, array &$values, array &$form_state) {
    if (!is_numeric($values['completeness']) || $values['completeness'] < 0 || $values['completeness'] > 100) {
      form_error($form['completeness'], t('The Fuzzy Search processor completeness setting must use a numeric value between 0 and 100.'));
    }
  }

  protected function processFieldValue(&$value) {
  }

  protected function process(&$value) {
  }

  protected function prepare() {
  }

  public function preprocessIndexItems(array &$items) {
    foreach ($items as &$item) {
      foreach ($item as $name => &$field) {
        if ($this->testField($name, $field)) {
          $this->split($field);
        }
      }
    }
  }

  protected function split(&$field) {
    if ($field['type'] == 'tokens') {
      foreach ($field['value'] as $key => $value) {
        $word = '';
        $word = $value['value'];
        $length = drupal_strlen($word);
        if ($length < $this->options['ngram_length']) {
          continue;
        }
        // Cleanse and remove spaces.
        $ngrams = array('ngrams' => array());
        $word = str_replace(' ', '', fuzzysearch_cleanse($word));
        $ngrams['completeness'] = ($length - $this->options['ngram_length'] + 1) == 0 ? 100 : number_format(100 / ($length - $this->options['ngram_length'] + 1), 3);
        $ngrams['comp_min'] = number_format(100 / (($length - $this->options['ngram_length']) + 1 + $this->options['missing_letters']), 3);
        if (($length - $this->options['ngram_length']) + 1 - $this->options['extra_letters'] <= 0 ) {
          $ngrams['comp_max'] = number_format(100, 3) + .001;
        }
        else {
          $ngrams['comp_max'] = number_format(100 / (($length - $this->options['ngram_length']) + 1 - $this->options['extra_letters']), 3) + .001;
        }
        // Split word into ngrams.
        for ($i=0; $i < ($length - $this->options['ngram_length'] + 1); $i++) {
          $ngrams['ngrams'][] = drupal_substr($word, $i, $this->options['ngram_length']);
        }
        $field['value'][$key] += $ngrams;
        $i = 9;
      }
    }

  }
}

