
<article<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
  <?php if ($display_submitted): ?>
  <footer class="submitted">  <span class="blog-user"><?php print $user_picture; ?></span><?php print $date; ?> -- <?php print $name; ?></footer>
  <?php endif; ?>
  <?php if (isset($content['field_image'])): ?>
    <div class="media-image"><?php print render($content['field_image']); ?></div>
  <?php endif;?>
  <header>
    <h3<?php print $title_attributes; ?>><a href="<?php print $node_url ?>" title="<?php print $title ?>"><?php print $title ?></a></h3>
  </header>
  <?php endif; ?>
  <?php print render($title_suffix); ?>


  <div<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content['body']);
    ?>
  </div>

  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <nav class="links node-links clearfix"><?php print render($content['links']); ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>
</article>
