import React from 'react';
import { NavLink } from "react-router-dom";

const Contact_Tab_Table = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to="#">{props.name}</NavLink></td>
                <td>{props.task}</td>
                <td>{props.email}</td>
                <td><span className={"px-3 py-1 border-radius-100 " + props.badgebgcolor}>{props.badgetext}</span></td>
            </tr>
        </>
    )
}

export default Contact_Tab_Table;
