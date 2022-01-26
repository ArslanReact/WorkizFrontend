import React from "react";
import { NavLink } from "react-router-dom";

const RecentLoop = (props) => {
    return (
        <>
            <li className="my-2">
                <div className="w-100 p-3 align-items-center d-flex">
                    <span className="mr-auto fontsize16 fontweightmeduim"><small className="d-block mb-2">{props.small}</small> {props.title}</span>
                    <span className="fontsize16 fontweightmeduim blusecolortext">{props.hashnumber} <small className="d-block lightgraycolortext fontsize14">{props.smallnumber}</small></span>
                </div>
            </li>
        </>
    );
}

export default RecentLoop;