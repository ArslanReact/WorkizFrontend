import React from 'react';
import { NavLink } from 'react-router-dom';

const EmployeeModalTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.employename}</td>
                <td>
                    <p className="m-0 fontsize16">{props.taskname}</p>
                    <p className="m-0 fontsize14">{props.smallname}</p>
                </td>
                <td>{props.memoname}</td>
                <td>time run</td>
                <td><NavLink to="#" className={"px-3 py-1 border-radius-100 " + props.badgebgcolor}>{props.badgetext}</NavLink></td>
            </tr>
        </>
    )
}

export default EmployeeModalTableLoop;
