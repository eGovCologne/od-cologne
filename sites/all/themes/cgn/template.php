<?php

/**
 * @file
 * Customizations for DKAN.
 */

/**
 * Implements theme_breadcrumb().
 */

function cgn_dkan_breadcrumb($variables) {
  if (drupal_is_front_page()) {
    return;
  }
  $breadcrumb = $variables['breadcrumb'];
  $contexts = array();

  if (!empty($breadcrumb)) {
    foreach ($breadcrumb as $num => $item) {
      if ($item == '<a href="/">Startseite</a>') {
        $breadcrumb[$num] = '<a href="/"><i class="icon-large icon-home"></i><span> Home</span></a>';
      }
        // Jayan Areekadan 15.09.2014        
        if($item == '<a href="/blog">Weblogs</a>') {     
            unset($breadcrumb[$num]);         
        } 
        if($item == '<a href="/blogs/redaktion">Weblog von Redaktion</a>') {  
            $breadcrumb[$num] = '<a href="/dkan/blogs/redaktion">Blog Redaktion</a>';   
        } 
        // End Customizing
    }

    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $crumbs = '<ul class="breadcrumb">';

    // Remove null values.
    $breadcrumb = array_filter($breadcrumb);;
    $i = 1;
    foreach($breadcrumb as $value) {
      if ($i == count($breadcrumb)) {
        $crumbs .= '<li class="active-trail">' . $value . '</li>';
      }
      else {
        $crumbs .= '<li>' . $value . '</li>';
      }
      $i++;
    }
    $crumbs .= '</ul>';
    return $crumbs;
  }
}


function cgn_dkan_node_presave($node) {

  $node->language = LANGUAGE_NONE;
}

/**
 * Implements template_preprocess_zone().
 */
function cgn_dkan_preprocess_zone(&$vars) {
  if (module_exists('context')) {
    $contexts = context_active_contexts();
    // Create a template suggestion if we are in the dataset context.
    if ($vars['zone'] == 'content' && isset($contexts['dataset'])) {
      $vars['theme_hook_suggestions'][] = 'zone__content__dataset';
    }
    elseif ($vars['zone'] == 'content' && isset($contexts['resource'])) {
      $vars['theme_hook_suggestions'][] = 'zone__content__resource';
    }
  }
}

/**
 * Implements template_preprocess_zone().
 */
function cgn_dkan_process_zone(&$vars) {
  if ($vars['zone'] == 'content') {
    $node = menu_get_object();
    $theme = alpha_get_theme();
    $tabs = cgn_dkan_theme_process_tabs($theme->page['tabs']);
    $vars['tabs'] = drupal_render($tabs);
  }
}
/**
 * Implements template_preprocess_html().
 */
function cgn_dkan_preprocess_html(&$vars) {
    $ie_edge = array(
      '#tag' => 'meta',
      '#attributes' => array(
        'http-equiv' => 'X-UA-Compatible',
        'content' => 'IE=edge;chrome=1',
      ),
    );
    drupal_add_html_head($ie_edge, 'ie_edge');
    drupal_add_feed('rss.xml', 'Offene Daten Köln Blog RSS');
    drupal_add_feed('daten/rss.xml', 'Offene Daten Köln Dataset RSS');
}


/**
 * Implements hook_theme().
 */
function cgn_dkan_theme($existing, $type, $theme, $path) {
  return array(
    'cgn_dkan_tabs_local_task' => array(
      'render element' => 'element',
    ),
  );
}

/**
 * Updates tab settings.
 */
function cgn_dkan_theme_process_tabs($tabs) {
  if ($tabs['#primary']) {
    // Remove active tab.
    foreach ($tabs['#primary'] as $row_num => $items) {
      $tabs['#primary'][$row_num]['#theme'] = 'cgn_dkan_tabs_local_task';
      if (isset($items['#active'])) {
        unset($tabs['#primary'][$row_num]);
      }
    }
  }
  if ($tabs['#secondary']) {
    // Remove active tab.
    foreach ($tabs['#secondary'] as $row_num => $items) {
      $tabs['#secondary'][$row_num]['#theme'] = 'cgn_dkan_tabs_local_task';
    }
  }
  return $tabs;
}
/**
 * Implements theme_cgn_dkan_local_task().
 */
function cgn_dkan_cgn_dkan_tabs_local_task($variables) {
  $link = $variables['element']['#link'];
  $icon_type = '';
  if ($link['page_callback'] == 'devel_load_object') {
    $icon_type = 'cog';
  }
  elseif ($link['page_callback'] == 'node_page_edit') {
    $icon_type = 'edit';
  }
  elseif ($link['page_callback'] == 'node_page_view') {
    $icon_type = 'eye-open';
  }
  elseif ($link['page_callback'] == 'cgn_dkan_dataset_add_resource') {
    $icon_type = 'plus';
  }
  elseif ($link['page_callback'] == 'cgn_dkan_dataset_back') {
    $icon_type = 'caret-left';
  }
  elseif ($link['page_callback'] == 'cgn_dkan_datastore_download') {
    $icon_type = 'download';
    $link['localized_options']['attributes']['class'][] = 'btn-primary';
  }
  elseif ($link['page_callback'] == 'cgn_dkan_datastore_datastore_api') {
    $icon_type = 'beaker';
    $link['localized_options']['attributes']['class'][] = 'btn-success';
  }
  elseif ($link['path'] == 'node/%/datastore') {
    $icon_type = 'cogs';
  }
  elseif ($link['path'] == 'node/%/datastore/import') {
    $icon_type = 'refresh';
  }
  elseif ($link['path'] == 'node/%/datastore/delete-items') {
    $icon_type = 'trash';
  }
  elseif ($link['path'] == 'node/%/datastore/unlock') {
    $icon_type = 'unlock';
  }
  $icon = '<i class="icon-large icon-' . $icon_type . '"></i> ';
  $link_text = $icon . $link['title'];
  $link['localized_options']['html'] = TRUE;
  $link['localized_options']['attributes']['class'][] = 'btn';

  return "<li>" . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

/**
 * Implements template_preprocess_node.
 */
function cgn_dkan_preprocess_node(&$vars) {
}

/**
 * Implements template_preprocess_page.
 */
function cgn_dkan_preprocess_page(&$vars) {
  $profile_path = drupal_get_path('profile', 'dkan');
  // Add font-awesome. This is not a GPL library so has to be downloaded separately.
  if (file_exists($profile_path . '/libraries/font_awesome/css/font-awesome.css')) {
    drupal_add_css($profile_path . '/libraries/font_awesome/css/font-awesome.css');
  }
  if ($vars['is_front']) {
    drupal_add_js($profile_path . '/themes/dkan/js/front.js');
  }
  // Remove title on dataset edit and creation pages.
  $vars['title'] = '';
}

/**
 * Implments template_preprocess_block().
 * TODO: Move this to cgn_dkan_dataset module.
 */
function cgn_dkan_preprocess_block(&$vars) {

  $vars['title'] = '';
}

/**
 * Implements theme_horizontal_tabs().
 */
function cgn_dkan_horizontal_tabs($variables) {
  $element = $variables['element'];
  // Add required JavaScript and Stylesheet.
  drupal_add_library('field_group', 'horizontal-tabs');

  $output = '';
  if ($element['#id'] == 'node_resource_form_group_data') {
    $output = '<label id="resource-edit-title" for="edit-resource">' . $variables['element']['#title'] . '</label>';
  }

  $output .= '<div class="horizontal-tabs-panes">' . $element['#children'] . '</div>';

  return $output;
}

/**
 * Implements theme_facetapi_link_active().
 */
function cgn_dkan_facetapi_link_active($variables) {

  // Sanitizes the link text if necessary.
  $sanitize = empty($variables['options']['html']);
  $link_text = ($sanitize) ? check_plain($variables['text']) : $variables['text'];

  // Theme function variables fro accessible markup.
  // @see http://drupal.org/node/1316580
  $accessible_vars = array(
    'text' => $variables['text'],
    'active' => TRUE,
  );

  // Builds link, passes through t() which gives us the ability to change the
  // position of the widget on a per-language basis.
  $replacements = array(
    '!facetapi_deactivate_widget' => theme('facetapi_deactivate_widget', $variables),
    '!facetapi_accessible_markup' => theme('facetapi_accessible_markup', $accessible_vars),
  );
  $variables['text'] = t('!facetapi_deactivate_widget !facetapi_accessible_markup', $replacements);
  $variables['options']['html'] = TRUE;
  $alter = array(
    'max_length' => 30,
    'ellipsis' => TRUE,
    'word_boundary' => TRUE,
    'trim' => TRUE,
  );
  $link_text = views_trim_text($alter, $link_text);
  $variables['text'] = $link_text;
  return theme_link($variables);
}

/**
 * Implements theme_facetapi_link_inactive().
 */
function cgn_dkan_facetapi_link_inactive($variables) {
  // Builds accessible markup.
  // @see http://drupal.org/node/1316580
  $alter = array(
    'max_length' => 30,
    'ellipsis' => TRUE,
    'word_boundary' => TRUE,
    'trim' => TRUE,
  );
  $variables['text'] = views_trim_text($alter, $variables['text']);
  $accessible_vars = array(
    'text' => $variables['text'],
    'active' => FALSE,
  );
  $accessible_markup = theme('facetapi_accessible_markup', $accessible_vars);

  // Sanitizes the link text if necessary.
  $sanitize = empty($variables['options']['html']);
  $variables['text'] = ($sanitize) ? check_plain($variables['text']) : $variables['text'];

  // Adds count to link if one was passed.
  if (isset($variables['count'])) {
    $variables['text'] .= ' ' . theme('facetapi_count', $variables);
  }

  // Resets link text, sets to options to HTML since we already sanitized the
  // link text and are providing additional markup for accessibility.
  $variables['text'] .= $accessible_markup;
  $variables['options']['html'] = TRUE;
  return theme_link($variables);
}

/**
 * Implements theme_preprocess_user_profile().
 */
function cgn_dkan_preprocess_user_profile(&$variables) {
  // Remove user pic on profile.
  unset($variables['user_profile']['user_picture']);
}

/**
 * Implements theme_facetapi_title().
 * See Patch at https://drupal.org/node/1665164 for Details
 */

function cgn_dkan_facetapi_title($variables) {
  return t('Filter nach @title:', array('@title' => $variables['title']));
}



/**
 * @author Bruno Waßerer b.wasserer@gmx.de
 * Add the value as span and class within
 * @param $variables
 *
 */
function cgn_dkan_preprocess_field(&$variables) {

    if($variables['element']['#field_name'] == 'field_request_data_status') {
        //drupal_set_message("333<pre>" . print_r($variables['element']['#items']['0']['taxonomy_term'], true));
        $variables['items']['0']['#markup'] = '<i class="icon-large icon-'.$variables['element']['#items']['0']['taxonomy_term']->field_status_icon['und'][0]['value'].' color-'.$variables['element']['#items']['0']['taxonomy_term']->field_status_hex['und'][0]['value'].'"  title="'.$variables['element']['#items']['0']['taxonomy_term']->name.'"></i>';

    }



}