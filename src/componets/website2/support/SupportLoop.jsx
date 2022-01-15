import React from 'react';
import { Nav } from "react-bootstrap";

const SupportLoop = (props) => {
    return (
        <>
            <div className="col-xl-6 col-lg-12 mb-4 mb-xl-0">
                <div className="card-body shadow_box support border_radius_10">
                    <h4>{props.title}</h4>
                    <span>{props.title2}</span>
                    <div className="d-flex mt-4 align-items-center">
                        <div className="d-inline-flex text-center">
                            <Nav.Link href="#" className=""><img width="40" className="img-fluid" src={props.avatar1} alt="avatar" /></Nav.Link>
                            <Nav.Link href="#" className=""><img width="40" className="img-fluid" src={props.avatar2} alt="avatar" /></Nav.Link>
                        </div>
                        <div className="ms-3">
                            <p className="m-0">{props.text1}</p>
                            <p className="m-0">{props.text2}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupportLoop;
