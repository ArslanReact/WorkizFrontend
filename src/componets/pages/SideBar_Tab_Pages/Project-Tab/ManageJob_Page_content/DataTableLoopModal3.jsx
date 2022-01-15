import React from 'react';
import { NavLink } from "react-router-dom";

const DataTableLoopModal3 = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink to="#" className="text_decoration_none border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">{props.remove}</NavLink></td>
            </tr>
        </>
    )
}

export default DataTableLoopModal3;
