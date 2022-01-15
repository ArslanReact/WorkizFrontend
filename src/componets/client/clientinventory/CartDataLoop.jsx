import React from 'react';
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";



const CartDataLoop = (props) => {
    return (
        <>
            <tr>
            <td>
                <div className="d-flex align-items-center">
                    <NavLink to="#" className="mb-2"><div className="d-flex align-items-center"><div className="avatar mr-2"><img className="img-fluid" src={props.avatarimg} alt="avatar" /></div><p className="m-0 blackcolortext">{props.title}</p></div></NavLink>
                </div>
                <p className="m-0 blackcolortext">{props.description}</p>
            </td>
            <td>
                <Form.Control className="" style={{ width: "100px" }} type="text" placeholder="" />
            </td>
            <td>
                <Form.Control className="" style={{ width: "100px" }} type="number" placeholder="" />
            </td>
            <td>{props.unitprice}</td>
            <td>{props.tax}</td>
            <td>{props.amount}</td>
            </tr>
        </>
    )
}

export default CartDataLoop;
