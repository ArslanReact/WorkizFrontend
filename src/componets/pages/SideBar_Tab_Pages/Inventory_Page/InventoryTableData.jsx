import React from 'react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import iconimg from "../../../../assets/images/dotoption.svg";
import editiconimg from "../../../../assets/images/editiconimg.svg";
import deleteiconimg from "../../../../assets/images/deleteiconimg.svg";
const InventoryTableData = (props) => {
    const DeleteProduct = (id) => {
        props.DeleteProduct(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td>{props.price}</td>
                <td><span className="badgegreenbg greencolortext px-3 py-1 border-radius-100">{props.allow}</span></td>
                <td className="dropdown dropdown_table" width="80">
                    <NavLink to="#" data-bs-toggle="dropdown" role="button" className="btn_dropdown_table" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                    <div className="dropdown-menu dropdown-menu-right">
                        <ul className="list-unstyled">
                            <li><NavLink to={`${process.env.PUBLIC_URL}/edit_inventory/`+props.pid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={editiconimg} alt="" /> Edit</NavLink></li>
                            <li><NavLink onClick={() => DeleteProduct(props.pid)} to="#" className="nav-link text_decoration_none"><img width="15" className="img-fluid mr-1" src={deleteiconimg} alt="" /> Delete</NavLink></li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default InventoryTableData;

// 
function sweattest() {
    swal({
        title: "Are you sure that you want to create the credit note?",
        text: "When creating credit note from non paid invoice, the credit note amount will get applied for this invoice.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}