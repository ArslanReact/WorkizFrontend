import React from 'react';
import { NavLink } from "react-router-dom";

const DataTableLoopModal_1 = (props) => {
    const Delete = (id) => {
        props.DeleteLeadCategory(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink to="#" onClick={()=> Delete(props.id)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">Remove</NavLink></td>
            </tr>
        </>
    )
}

export default DataTableLoopModal_1;
