/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
    const { image, marker } = attributes;
    return (
		<div className="marker-block">
			<div className="uk-inline uk-dark">
				<img src={ image } />

                { marker.map((hotspot, index) => (
					<a
						key={ index }
						className={ hotspot.style + ' uk-position-absolute uk-transform-center marker' }
						data-x={ hotspot.x }
						data-y={ hotspot.y }
						data-label={ hotspot.label }
						style={ { left: `${hotspot.x * 100}%`, top: `${hotspot.y * 100}%` } }
						href={ hotspot.link }
						target="_blank"
						rel="noopener noreferrer"
                        {...{ "uk-marker": "", "uk-tooltip" : hotspot.label }}
					>
					</a>
                )) }
			</div>
		</div>
    );
}