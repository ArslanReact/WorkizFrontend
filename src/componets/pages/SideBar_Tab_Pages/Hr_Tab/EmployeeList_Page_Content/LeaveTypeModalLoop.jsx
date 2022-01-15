import React from 'react';
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

const LeaveTypeModalLoop = (props) => {
    return (
        <>
            <tr>
                <td><span className={"ml-auto fontsize14 py-2 px-4 border-radius-100 " + props.badgebgcolor}>{props.badgetext}</span></td>
                <td><Form.Control type="text" className="transparent_form fontsize14 h-45px" placeholder="05" /></td>
                <td><NavLink to="#" className="p-3 border_greencolor_1 border-radius-10"><img width="15" className="img-fluid" src={props.checkicon} alt="" /></NavLink></td>
            </tr>
        </>
    )
}

export default LeaveTypeModalLoop;
