import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";


// 
import chaticon from "../../../assets/images/chaticon.svg";


const DiscussionDataLoop = (props) => {
    return (
        <>
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <p className="m-0 mr-3"><img className="img-fluid" src={props.avatarimg} alt="" /></p>
                        <div className="">
                            <h4 className="mb-1"><NavLink to={`${process.env.PUBLIC_URL}/View_Sub_Detail`} className="text_decoration_none blackcolortext fontweightbold fontsize14">{props.title}</NavLink></h4>
                            <p className="m-0 paragraphcolor1text fontsize14"><NavLink to={`${process.env.PUBLIC_URL}/employee_detail`} className="text_decoration_none badge blusecolortext mr-2 badgebluebg">{props.admintext}</NavLink> {props.description}</p>
                        </div>
                    </div>
                </td>
                <td><img className="img-fluid" src={chaticon} alt="" /> {props.number}</td>
                <td><span className={"mr-1 d-inline-block border-radius-100 w-15px h-10px " + props.badgebgcolor}>&nbsp;</span>{props.name}</td>
                <td><NavLink to="#" onClick={() => sweattest(true)} className="border-radius-10 d-inline-block badgeredbg p-3" ><img width="10" className="img-fluid" src={props.crossicon} alt="" /></NavLink></td>
            </tr>
        </>
    )
}

export default DiscussionDataLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted record!",
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