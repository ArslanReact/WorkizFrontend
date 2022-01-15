import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, } from "react-bootstrap";

const ActivityData = (props) => {
    return (
        <>
            <li className="align-items-center d-flex">
                <NavLink className="w-100 fontsize14 align-items-center d-flex px-3 py-2" to="">
                    <div>
                        <span className="d-block">{props.clocktext}</span>
                        <p className="m-0 fontsize14"><img className="img-fluid mr-2" src={props.clockimg} alt="" />{props.timetext}</p>
                    </div>
                    <div className="ml-auto">
                        <Button type="button" variant="" className=""><img className="img-fluid" src={props.editimg} alt="" /></Button>
                        <Button type="button" variant="" className=""><img className="img-fluid" src={props.deleteimg} alt="" /></Button>
                    </div>
                </NavLink>
            </li>
        </>
    )
}

export default ActivityData;
