<?php

/**
 * Theme callback.
 */
function theme_flexslider_picture_list(&$vars) {
  $optionset = &$vars['settings']['optionset'];
  if (isset($optionset->imagestyle_type) && !empty($optionset->imagestyle_type) && $optionset->imagestyle_type == 'picture_mapping') {
    // Reference configuration variables
    $items = &$vars['items'];
    $attributes = &$vars['settings']['attributes'];
    $type = &$vars['settings']['type'];
    $output = '';

    // Get the breakpoints based on the mapping
    $breakpoint_styles = array();
    $group_name = $optionset->mapping;
    $mappings = picture_mapping_load($group_name);
    if ($mappings) {
      foreach ($mappings->mapping as $breakpoint_name => $multipliers) {
        if (!empty($multipliers)) {
          foreach ($multipliers as $multiplier => $image_style) {
            if (!empty($image_style)) {
              if (!isset($breakpoint_styles[$breakpoint_name])) {
                $breakpoint_styles[$breakpoint_name] = array();
              }
              $breakpoint_styles[$breakpoint_name][$multiplier] = $image_style;
            }
          }
        }
      }
    }
    // Build the list
    if (!empty($items)) {
      $output .= "<$type" . drupal_attributes($attributes) . '>';
      foreach ($items as $i => $item) {
        // If the slide hasn't been set, build the slide using the image
        // attributes given (assumes we're using a multi-image field)
        // @todo need to allow for different types of field and collection fields
        if (!isset($item['slide'])) {
          $picture_options = array(
            'style_name' => $optionset->imagestyle_normal,
            'uri' => $item['uri'],
            'height' => $item['height'],
            'width' => $item['width'],
            'alt' => $item['alt'],
            'title' => $item['title'],
            'breakpoints' => $breakpoint_styles,
          );
        }
        $output .= theme('flexslider_list_item', array(
          'item' => isset($item['slide']) ? $item['slide'] : theme('picture', $picture_options),
          'thumb' => isset($item['thumb']) ? $item['thumb'] : image_style_url($optionset->imagestyle_thumbnail, $item['uri']),
          'optionset' => $optionset,
            ));
      }
      $output .= "</$type>";
    }

    return $output;
  }
  return theme_flexslider_list($vars);
}