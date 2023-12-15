/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
//import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, BlockControls, MediaUpload } from '@wordpress/block-editor';
import { RichText, InnerBlocks } from '@wordpress/editor';
import { Button, ButtonGroup, PanelBody, PanelRow, Panel, TextControl, Icon, ToolbarGroup, Placeholder, Modal, FormToggle, Flex, FlexBlock, FlexItem } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const markerDefault = {
    x: 0,
    y: 0,
    label: '',
    style: 'light',
    styleToggle: false
};

export default function Edit({ attributes, setAttributes }) {
    const [ activeIndex, setActiveIndex ] = useState(-1);
    const [ isChecked, setChecked ] = useState( true );

    const onImageClick = (e) => {
        if ( e.detail == 2 ) {
            const rect = e.target.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const marker = [
                ...attributes.marker,
                {
                    ...markerDefault,
                    x,
                    y
                }
            ];
            setAttributes({ marker });
        }
    };

    const onMarkerLabelChange = (value, index) => {
        const marker = [...attributes.marker];
        marker[index].label = value;
        setAttributes({ marker });
    };

    const onMarkerLinkChange = (value, index) => {
        const marker = [...attributes.marker];
        marker[index].link = value;
        setAttributes({ marker });
    };

    const onStyleChange = (e, index) => {
        const marker = [...attributes.marker];
        marker[index].style = isChecked ? 'dark' : 'light';
        marker[index].styleToggle = isChecked;
        setChecked( ( isChecked ) => ! isChecked );
        setAttributes({ marker });
    };

    const onMarkerRemove = (index) => {
        const marker = [...attributes.marker];
        marker.splice(index, 1);
        setAttributes({ marker });
    };

    const onMarkerClick = (index, e) => {
        const cont = e.target.closest('.marker-image-container');
        const cont2 = e.target.closest('button');

        if (!cont && cont2) {
            setActiveIndex(-1);
        }
        else {
            setActiveIndex(activeIndex === index ? index : index);
        }
    };

    return (
		<div {...useBlockProps()}>
			<Panel>
				<div className="marker-block">
					<BlockControls>
						<ToolbarGroup>
							<MediaUpload
								onSelect={(image) => setAttributes({ image: image.sizes.full.url })}
								render={({ open }) => (
									<Button
										className="image-button has-icon"
										onClick={open}
										icon="format-image"
										label={!attributes.image ? "Select Image" : "Change Image"}
									>
									</Button>
                                )}
							/>
						</ToolbarGroup>
					</BlockControls>
                    {attributes.image ? (
						<div className="marker-image-container">
							<img
								src={attributes.image}
								onClick={onImageClick}
								className="marker-image"
							/>
                            {attributes.marker.map((hotspot, index) => (
								<div
									key={index}
									className={`uk-marker ${activeIndex === index ? "active" : ""}`}
									data-x={hotspot.x}
									data-y={hotspot.y}
									data-label={hotspot.label}
									data-style={hotspot.styleToggle}
									style={{ left: `${hotspot.x * 100}%`, top: `${hotspot.y * 100}%` }}
									onClick={(e) => {e.preventDefault(); onMarkerClick(index, e)} }
								>
                                    {hotspot.label && (<div className="marker-label">{hotspot.label}</div>)}

                                    {activeIndex === index && (
										<div className="marker-options">
											<Modal focusOnMount
												   shouldCloseOnEsc
												   shouldCloseOnClickOutside
												   overlayClassName="marker-modal-overlay"
												   title="Edit Marker"
											>
												<label>
													<TextControl
														type="text"
														value={hotspot.label}
														placeholder="Label / Name"
														onChange={(value) => onMarkerLabelChange(value, index)}
													/>
												</label>
												<label>
													<TextControl
														type="text"
														value={hotspot.link}
														onChange={(value) => onMarkerLinkChange(value, index)}
														placeholder="Link URL"
													/>
												</label>
												<div>
													<Flex
														gap={2}
														align="center"
														justify="space-between"
													>
														<FlexItem style={{alignItems: "center", padding: "10px 0", display: "flex"}}>
															<label
																htmlFor="style-toggle"
															>
																Marker Style:
															</label>
														</FlexItem>

														<FlexBlock style={{alignItems: "center", padding: "10px 0", display: "flex"}}>
															<FormToggle
																id={"style-toggle"}
																checked={hotspot.styleToggle}
																onClick={ (e) => onStyleChange(e, index) }
															/> <span style={{margin: "0 0 0 7px"}}>{hotspot.styleToggle ? "dark" : "light"}</span>
														</FlexBlock>
													</Flex>
												</div>
												<ButtonGroup>
													<Button
														icon="yes"
														isPrimary
													>
														Save
													</Button>
													<Button
														className="remove-button"
														onClick={() => onMarkerRemove(index)}
														icon="dismiss"
														isDestructive
													>
														Remove
													</Button>
												</ButtonGroup>
											</Modal>
										</div>
                                    )}
								</div>
                            ))}
						</div>
                    ) : (<Placeholder
						label="UIkit Image Marker"
						instructions="Select an image to add image markers"
						isColumnLayout
					>
						<div style={{ backgroundColor: "#e7e7e7", padding: "56px 64px", display: "flex", justifyContent: "center" }}>
							<MediaUpload
								onSelect={(image) => setAttributes({ image: image.sizes.full.url })}
								render={({ open }) => (
									<Button
										isSecondary
										onClick={open}
										icon="format-image"
									>Select image
									</Button>
                                )}
							/>
						</div>
					</Placeholder>)}
				</div>
			</Panel>
		</div>
    );
}