import React from 'react';
import { NavLink } from "react-router-dom";
import moment from "moment";
import dateFormat from 'dateformat';
const OverDueLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.counter}</td>
                <td>{props.heading} ({props.priority})</td>
                <td>
                    <div variant="" className="badge px-3 py-2 border_radius_100 badgeredbg badgepinkcolor">{dateFormat(props.due_date, props.dateformat)}</div>
                </td>
            </tr>
        </>
    )
}

export default OverDueLoop;
