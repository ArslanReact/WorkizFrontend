import React from 'react';
import { NavLink } from 'react-router-dom';

const MemberData = (props) => {
    return (
        <>
            <li className="tolightredcolorbg p-2 mb-2 border-radius-5">
                <NavLink to="#" className="d-flex align-items-center">
                    <div className="avatar mr-3"><img className="img-fluid" src={props.avatarimg} alt="" /></div>
                    <div className="">
                        <h4 className="fontsize18 blackcolortext">{props.title}</h4>
                        <p className="paragraphcolor1text">{props.email}</p>
                    </div>
                </NavLink>
            </li>
        </>
    )
}

export default MemberData;
