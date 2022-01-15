import React from 'react';
import { Button } from 'react-bootstrap';

const InvestorLoop = (props) => {
    return (
        <>
            <div className="card-body shadow_box py-4 investor border_radius_10 mb-4">
                <div className="d-block d-xl-flex">
                    <div className="me-3 mb-xl-0 mb-4">
                        <div className="border_radius_10"><img className="img-fluid" src={props.image} alt="logo_image" /></div>
                    </div>
                    <div>
                        <h4 className="">{props.title}</h4>
                        <p>{props.paragraph}</p>
                        <Button variant="" type="button" className="btnweb d-inline-block h-40px bg-white mt-4 fontsize16 border_lightparagraphcolor_1">{props.website}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestorLoop;
