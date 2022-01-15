import React from 'react';
import { Accordion, Nav } from "react-bootstrap";

const FaqLoop = (props) => {
    return (
        <>
            <Accordion.Item eventKey="0" className="shadow_box">
                <div className="w-100 d-flex align-items-center">
                    <Accordion.Header className="accordion-headerweb">
                        <div className="avatar me-4"><img className="img-fluid" src={props.avatar} alt="avatar" /></div>
                        <Nav.Link href="#">
                            {props.title}
                            <p className="m-0 mt-2 blue_text_color fontweightbold">{props.designation}</p>
                            <p className="m-0 mt-2 paragraph_grey1_text_color">{props.time}</p>
                        </Nav.Link>
                    </Accordion.Header>
                </div>
                <Accordion.Body><p>{props.paragraph}</p></Accordion.Body>
            </Accordion.Item>
        </>
    )
}

export default FaqLoop;
