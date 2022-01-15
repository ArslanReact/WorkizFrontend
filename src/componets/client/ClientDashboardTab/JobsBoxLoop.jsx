import React from 'react';
import { NavLink } from "react-router-dom";

const JobsBoxLoop = (props) => {
    return (
        <>
            <li className="border_bodycolor_1 overflow-hidden mb-1">
                <NavLink to="#" className="w-100 p-3 align-items-center d-flex">
                    <span className="mr-auto fontsize16 fontweightmeduim">{props.title}</span>
                    <span className="fontsize24 fontweightmeduim">{props.countnumber}</span>
                </NavLink>
            </li>
        </>
    )
}

export default JobsBoxLoop;
