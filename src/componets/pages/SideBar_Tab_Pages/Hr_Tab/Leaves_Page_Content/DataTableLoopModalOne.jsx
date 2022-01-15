import React from 'react';
import { NavLink } from "react-router-dom";

const DataTableLoopModal_1 = (props) => {
    const leaveTypeRemove = (id) => {
        props.DeleteLeaveType(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink to="#" onClick={() => leaveTypeRemove(props.ltid)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">{props.remove}</NavLink></td>
            </tr>
        </>
    )
}

export default DataTableLoopModal_1;
