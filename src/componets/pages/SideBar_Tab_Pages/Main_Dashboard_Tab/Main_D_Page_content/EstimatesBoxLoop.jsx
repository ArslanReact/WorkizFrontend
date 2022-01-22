import React from 'react';
import { NavLink } from "react-router-dom";

const EstimatesBoxLoop = (props) => {
    return (
        <>
            <li className="border_bodycolor_1 overflow-hidden mb-1">
                <div className="w-100 p-3 align-items-center d-flex">
                    <span className="mr-auto fontsize16 fontweightmeduim">{props.text1} <small className="d-block mt-2">{props.smalltext}</small></span>
                    <span className="fontsize24 fontweightmeduim">{props.countnumber}</span>
                </div>
            </li>
        </>
    )
}

export default EstimatesBoxLoop;
