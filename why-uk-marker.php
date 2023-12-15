<?php
/**
 * Plugin Name:       UIkit Marker
 * Plugin URI:        https://github.com/whydesign
 * Description:       Create marker icon's with tooltips and url links that can be displayed on top of images.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Whydesign
 * Author URI:        https://whydesign-halle.de
 * License:           WTFPL-2.0
 * License URI:       http://www.wtfpl.net/
 * Text Domain:       why-uk-marker
 *
 * @package           whydesign-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function why_uk_marker_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'why_uk_marker_block_init' );

function load_dashicons_block_assets() {
    wp_enqueue_style( 'dashicons' );
}

add_action( 'enqueue_block_assets', 'load_dashicons_block_assets' ); //FIX: See Issue Report https://github.com/WordPress/gutenberg/issues/53528
