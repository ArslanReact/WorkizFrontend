import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";


// 
import chaticon from "../../../../../assets/images/chaticon.svg";


const DiscussionDataLoop = (props) => {
    return (
        <>
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <p className="m-0 mr-3"><img className="img-fluid avatar" src={props.avatarimg} alt="" /></p>
                        <div className="">
                            <h4 className="mb-1">
                                {props.project_id != null ?
                                    <NavLink to={`${process.env.PUBLIC_URL}/View_Sub_Detail/`+props.project_id+"/"+props.did} class="text-dark">{props.title.toUpperCase()}</NavLink>
                                :
                                    <NavLink to={`${process.env.PUBLIC_URL}/View_Sub_Detail/`+props.did} class="text-dark">{props.title.toUpperCase()}</NavLink>
                                }
                            </h4>
                            <p className="m-0 paragraphcolor1text fontsize14"><span className="text_decoration_none badge blusecolortext mr-2 badgebluebg">{props.admintext} {props.description}</span></p>
                        </div>
                    </div>
                </td>
                <td><img className="img-fluid" src={chaticon} alt="" /> {props.replycount}</td>
                <td><span className="mr-1 d-inline-block border-radius-100 w-15px h-10px">&nbsp;</span><span style={{color:props.badgebgcolor}}>{props.name}</span></td>
                
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