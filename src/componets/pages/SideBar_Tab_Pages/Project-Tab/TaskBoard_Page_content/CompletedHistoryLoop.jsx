import React from 'react';
import { NavLink } from 'react-bootstrap';

const CompletedHistoryLoop = (props) => {
    return (
        <>
            <li className="d-flex mb-4 align-items-center">
                <NavLink className="d-flex p-0 align-items-center" to="#">
                    <div className="border-radius-100 w-40px h-40px"><img className="img-fluid" src={props.avatar} alt="" /></div>
                    <div className="ml-3">
                        <h4 className="fontsize14 blackcolortext mb-2">{props.title}</h4>
                        <span className="fontsize14 paragraphcolor1text">{props.time}</span>
                    </div>
                </NavLink>
                <span className={"ml-auto fontsize14 border-radius-100 px-3 py-2 " + props.colorupdate}>{props.completeincomplete}</span>
            </li>
        </>
    )
}

export default CompletedHistoryLoop;
