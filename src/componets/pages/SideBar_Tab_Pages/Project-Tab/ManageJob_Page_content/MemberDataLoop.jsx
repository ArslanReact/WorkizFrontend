import React from 'react';
import { NavLink } from "react-router-dom";

const MemberDataLoop = (props) => {
    return (
        <>
            <li className="col-xl-4 col-lg-12 mb-3">
                <NavLink to="#" className="tolightredcolorbg p-3 border-radius-10 d-flex align-items-center">
                    <p className="m-0 overflow-hidden border-radius-100"><img className="img-fluid" src={props.avatarimg} alt="" /></p>
                    <div className="ml-4">
                        <h6>{props.title}</h6>
                        <p className="m-0 paragraphcolor1text fontsize14">{props.paragraph}</p>
                    </div>
                </NavLink>
            </li>
        </>
    )
}

export default MemberDataLoop;

