import React from 'react';
import { NavLink } from "react-router-dom";

const DataTableLoopModalOne = (props) => {
    const DeleteContracyType = (contractid) => {
        props.DeleteContracyType(contractid);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink to="#" onClick={() => DeleteContracyType(props.contractid)} className="border_lightredcolor_1 py-1 px-3 redcolortext fontsize14">{props.remove}</NavLink></td>
            </tr>
        </>
    )
}

export default DataTableLoopModalOne;
