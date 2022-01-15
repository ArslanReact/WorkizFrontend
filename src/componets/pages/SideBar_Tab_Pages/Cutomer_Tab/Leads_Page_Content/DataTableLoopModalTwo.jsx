import React from 'react';
import { NavLink } from "react-router-dom";

const DataTableLoopModal_1 = (props) => {
    const DeleteLeadAgent = (id) => {
        props.DeleteLeadAgent(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink to="#" onClick={() => DeleteLeadAgent(props.leadAgentid)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">{props.remove}</NavLink></td>
            </tr>
        </>
    )
}

export default DataTableLoopModal_1;
