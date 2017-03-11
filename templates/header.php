<!DOCTYPE html>
<html itemscope itemtype="http://schema.org/WebPage"
    lang="<?= getenv('META_LANG'); ?>" dir="<?= getenv('META_DIR'); ?>">

    <!--

        <?= getenv('SITE_TITLE'); ?>
        <?= getenv('SITE_TAGLINE'); ?>
        <?= getenv('SITE_HOME'); ?>

        Copyright (c) <?= date('Y'); ?>, <?= getenv('CLIENT_NAME'); ?>

    -->

    <head prefix="<?= getenv('OG_PREFIX'); ?>">

        <!-- Meta Charset : Begin -->
        <meta charset="<?= getenv('META_CHARSET'); ?>">
        <!-- Meta Charset : Close -->

        <!-- Title : Begin -->
        <title>
            <?= getenv('SITE_TITLE'); ?>
            <?= getenv('SITE_TITLE_SEPARATOR'); ?>
            <?= getenv('SITE_TAGLINE'); ?>
        </title>
        <!-- Title : Close -->

        <!-- Metadata : Begin -->
        <meta name="description"
            content="<?= getenv('META_DESCRIPTION'); ?>">
        <meta name="author"
            content="<?= getenv('META_AUTHOR'); ?>">
        <meta name="designer"
            content="<?= getenv('META_DESIGNER'); ?>">
        <meta name="robots"
            content="<?= getenv('META_ROBOTS'); ?>">
        <!-- Metadata : Close -->

        <!-- Open Graph Metadata : Begin -->
        <meta property="fb:app_id"
            content="<?= getenv('OG_APP_ID'); ?>">
        <meta property="og:type"
            content="<?= getenv('OG_TYPE'); ?>">
        <meta property="og:site_name"
            content="<?= getenv('OG_SITE_NAME'); ?>">
        <meta property="og:title"
            content="<?= getenv('OG_TITLE'); ?>">
        <meta property="og:description"
            content="<?= getenv('OG_DESCRIPTION'); ?>">
        <meta property="og:image"
            content="<?= getenv('OG_IMAGE'); ?>">
        <meta property="og:url"
            content="<?= getenv('OG_URL'); ?>">
        <meta property="og:locale"
            content="<?= getenv('OG_LOCALE'); ?>">
        <!-- Open Graph Metadata : Close -->

        <!-- Twitter Card Metadata : Begin -->
        <meta name="twitter:card"
            content="<?= getenv('TC_TYPE'); ?>">
        <meta name="twitter:site"
            content="<?= getenv('TC_PUBLISHER'); ?>">
        <meta name="twitter:creator"
            content="<?= getenv('TC_CREATOR'); ?>">
        <meta name="twitter:title"
            content="<?= getenv('TC_TITLE'); ?>">
        <meta name="twitter:description"
            content="<?= getenv('TC_DESCRIPTION'); ?>">
        <meta name="twitter:image"
            content="<?= getenv('TC_IMAGE'); ?>">
        <!-- Twitter Card Metadata : Close -->

        <!-- Mobile Properties : Begin -->
        <meta name="HandheldFriendly"
            content="<?= getenv('MOBILE_HANDHELD_FRIENDLY'); ?>">
        <meta name="MobileOptimized"
            content="<?= getenv('MOBILE_OPTIMIZED'); ?>">
        <meta name="format-detection"
            content="telephone=<?= getenv('MOBILE_FORMAT_TELEPHONE'); ?>">
        <meta name="format-detection"
            content="address=<?= getenv('MOBILE_FORMAT_ADDRESS'); ?>">
        <meta name="viewport"
            content="width=<?= getenv('MOBILE_VIEWPORT_WIDTH'); ?>, initial-scale=<?= getenv('MOBILE_VIEWPORT_SCALE'); ?>, user-scalable=<?= getenv('MOBILE_VIEWPORT_SCALABLE'); ?>">
        <meta name="theme-color"
            content="<?= getenv('MOBILE_THEME_COLOR'); ?>">
        <meta http-equiv="cleartype"
            content="<?= getenv('MOBILE_CLEARTYPE'); ?>">
        <!-- Mobile Properties : Close -->

        <!-- Styles : Begin -->
        <link rel="stylesheet" href="/dist/css/styles.min.css">
        <!-- Styles : Close -->

        <!-- Shortcut Icon : Begin -->
        <link rel="shortcut icon" type="image/x-icon"
            href="<?= getenv('FAVICON_URL'); ?>">
        <!-- Shortcut Icon : Close -->

        <!-- iOS Icon : Begin -->
        <link rel="apple-touch-icon"
            href="<?= getenv('IOS_ICON_URL'); ?>">
        <!-- iOS Icon : Close -->

        <!-- Windows App Metadata : Begin -->
        <meta name="application-name"     content="<?= getenv('WIN_APP_NAME'); ?>">
        <meta name="msapplication-config" content="<?= getenv('WIN_APP_CONFIG'); ?>">
        <!-- Windows App Metadata : Close -->

        <!-- Link Relations : Begin -->
        <link rel="sitemap" title="Sitemap"
            href="<?= getenv('LINK_SITEMAP'); ?>">
        <!-- Link Relations : Close -->

        <!-- Analytics : Begin -->
        <script></script>
        <!-- Analytics : Close -->

    </head>

    <body>

        <!-- Header : Begin -->
        <header>
            <h1><?= getenv('SITE_TITLE'); ?></h1>
        </header>
        <!-- Header : Close -->

        <!-- Main : Begin -->
        <main>
