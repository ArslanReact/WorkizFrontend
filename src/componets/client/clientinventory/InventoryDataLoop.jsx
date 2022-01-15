import React from 'react';
import { NavLink } from "react-router-dom";

import viewimg from "../../../assets/images/viewimg.svg";
import plusimg from "../../../assets/images/plusicon.svg";
const InventoryDataLoop = (props) => {
    
    const Addtocart = (pid) => {
        props.Addtocart(pid);
    }
    const ProductDetails = (pid) => {
        props.ProductDetails(pid);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                    <div className="d-flex align-items-center">
                        {/* <p className="m-0 avatar_table"><NavLink className="d-block" to="#"><img className="img-fluid" src={props.avatar} alt="avatar" /></NavLink></p> */}
                        <p className="mb-0 ml-2">{props.name}</p>
                    </div>
                </td>
                <td>{props.currency_symbolmain}{props.price}</td>
                <td>
                    <NavLink to="#" onClick={() => ProductDetails(props.pid)} className="px-3 mr-3 py-2 paragraph_grey3_bg_color border_radius_5 text-white">View <img className="img-fluid ml-2" src={viewimg} alt="view icon" /></NavLink>
                    <NavLink to="#" onClick={() => Addtocart(props.pid)}   className="px-3 py-2 green_bg_color border_radius_5 text-white add-product">Add Product <img className="img-fluid ml-2" src={plusimg} alt="plus icon" /></NavLink>
                </td>
            </tr>
        </>
    )
}

export default InventoryDataLoop;