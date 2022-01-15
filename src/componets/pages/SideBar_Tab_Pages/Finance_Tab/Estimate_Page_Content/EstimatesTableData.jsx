import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import iconimg from "../../../../../assets/images/dotoption.svg";
import download_icon from "../../../../../assets/images/download_icon.svg";
import viewiconimg from "../../../../../assets/images/viewiconimg.svg";
import fileduplicateicon from "../../../../../assets/images/fileduplicate.svg";
import sendicon from "../../../../../assets/images/sendicon.svg";
import Globalsettings from "../../../../Globalsettings";
import deleteicon from "../../../../../assets/images/deleteiconimg.svg";
import createinvoiveicon from "../../../../../assets/images/invoice.svg";
import editicon from "../../../../../assets/images/editiconimg.svg";
import avatarimg from "../../../../../assets/images/avatar_05.svg"
const EstimatesTableData = (props) => {
    const DeleteEstimate = (id) => {
        props.DeleteEstimate(id);
    }
    const CancelEstimate = (id) => {
        props.CancelEstimate(id);
    }
    const SendEstimate = (id) => {
        props.SendEstimate(id);
    }
        return (
            <>
                <tr>
                    <td>{props.count_number}</td>
                    <td><NavLink to={`${process.env.PUBLIC_URL}/estimate_invoice/`+props.estimateid} target="_blank">{props.estimateno}</NavLink></td>
                    <td>
                        <h4 className="fontsize14 blackcolortext">{props.clientname}</h4>
                    </td>
                    <td>{props.price}</td>
                    <td>{props.validtil}</td>
                    <td>
                        <p className="m-0 mb-2"><span className={"px-3 py-1 border-radius-100 text-center " + props.statusbg}>{props.status}</span></p>
                        {props.send_status == 0 && props.status != 'draft' && props.status != 'canceled' &&
                        <p className="m-0"><span className="px-3 py-1 border-radius-100 mt-2 bluecolortext text-center badgebluebg">Not Send</span></p>}
                    </td>
                    <td className="dropdown dropdown_table" width="80">
                        <NavLink to="#" role="button" className="btn_dropdown_table" data-bs-toggle="dropdown" data-toggle="dropdown"><img className="img-fluid" src={iconimg} alt="" /></NavLink>
                        <div className="dropdown-menu dropdown-menu-right">
                            <ul className="list-unstyled">

                                {props.status != 'draft' && <li><a href={Globalsettings.url + "api/admin/finance/estimates/download/"+props.estimateid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={download_icon} alt="" /> Download</a></li>}
                                <li><NavLink to={`${process.env.PUBLIC_URL}/estimate_invoice/`+props.estimateid} className="nav-link text_decoration_none"><img className="img-fluid mr-1" src={viewiconimg} alt="" /> View</NavLink></li>
                                <li><NavLink to="#" onClick={() => SendEstimate(props.estimateid)} className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={sendicon} alt="" /> Send</NavLink></li>
                                {/* {props.status == 'waiting' || props.status == 'draft' &&
                                // <li><NavLink to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={editicon} alt="" /> Edit</NavLink></li>
                                } */}
                                {props.festimateid == props.estimateid &&
                                 <li><NavLink to="#"  onClick={() => DeleteEstimate(props.estimateid)} className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={deleteicon} alt="" /> Delete</NavLink></li>
}
                                 {props.status == 'waiting' &&
                                <>
                                {/* <li><NavLink to="#" className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={createinvoiveicon} alt="" /> Create Invoice</NavLink></li> */}
                                <li><NavLink to="#" onClick={() => CancelEstimate(props.estimateid)} className="nav-link text_decoration_none"><img className="img-fluid mr-1" width="15" src={createinvoiveicon} alt="" /> Cancel Estimate</NavLink></li>
                                </>}
                            </ul>
                        </div>
                    </td>
                </tr>
            </>
        )
}

export default EstimatesTableData;
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