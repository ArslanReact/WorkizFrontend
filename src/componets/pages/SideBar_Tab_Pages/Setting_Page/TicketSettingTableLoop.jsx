import React from 'react';
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import swal from 'sweetalert';

const TicketSettingTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>
                    <NavLink to="#" className="d-flex align-items-center">
                        <img className="mr-3" src={props.avatarimg} alt="" />
                        <h6 className="m-0 fontsize14 blackcolortext">{props.title}</h6>
                    </NavLink>
                </td>
                <td>
                    <Form.Control className="transparent_form h-25px px-1 fontsize14 w-100px" as="select">
                        <option>No Group Assign</option>
                        <option>Sales</option>
                        <option>Code</option>
                        <option>Management</option>
                    </Form.Control>
                </td>
                <td>
                    <Form.Control className="transparent_form h-25px px-1 fontsize14 w-100px" as="select">
                        <option>Enable</option>
                        <option>Disable</option>
                    </Form.Control>
                </td>
                <td>
                    <Button onClick={() => sweattest(true)} variant="" className="w-40px h-40px badgeredbg"><img src={props.crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr>
        </>
    )
}

export default TicketSettingTableLoop;
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