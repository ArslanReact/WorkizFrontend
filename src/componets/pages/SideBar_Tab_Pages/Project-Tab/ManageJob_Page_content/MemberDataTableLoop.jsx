import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";

const MemberDataTableLoop = (props) => {
    return (
        <>
            <tr className="tolightredcolorbg">
                <td>
                    <div className="d-flex align-items">
                        <p className="m-0 overflow-hidden border-radius-100"><img className="img-fluid" src={props.avatarimg} alt="" /></p>
                        <div className="ml-4">
                            <h6>{props.title}</h6>
                            <p className="m-0 paragraphcolor1text fontsize14">{props.paragraph}</p>
                        </div>
                    </div>
                </td>
                <td><NavLink onClick={() => sweattest(true)} className="border-radius-10 d-inline-block badgeredbg p-3" to="#"><img width="10" className="img-fluid" src={props.crossicon} alt="" /></NavLink></td>
            </tr>
        </>
    )
}

export default MemberDataTableLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted recurring invoice!",
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