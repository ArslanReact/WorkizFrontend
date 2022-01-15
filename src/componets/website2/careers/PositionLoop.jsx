import React from 'react';
import { Accordion, Nav } from "react-bootstrap";

const PositionLoop = (props) => {
    return (
        <>
            <Accordion.Item eventKey="0" className="">
                <Accordion.Header className="p-0 mb-4">
                    <h6 className="blue_text_color fontweightbold fontsize28">{props.title}</h6>
                </Accordion.Header>
                <Accordion.Body className="p-0">
                    <h4 className="drkblue_text_color fontsize20">{props.subtitle}</h4>
                    <p className="paragraph_grey1_text_color">{props.paragraph}</p>
                    <Nav.Link href="/apply_page" className="border_radius_10 seablue_bg_color drkblue_text_color fontweightbold d-inline-block px-4 fontweightbold">{props.linktext}</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
}

export default PositionLoop;
