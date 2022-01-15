import React from 'react';
import Globalsettings from "../../Globalsettings";
import { NavLink } from "react-router-dom";
// 
import downloadicon from "../../../assets/images/download_1_icon.svg";

const InvoiceTabDataLoop = (props) => {
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var uid = obj.id;
        var companyid = obj.company_id;
    return (
        <>
            <div className="w-100 d-table mb-3">
                <tr className="tolightgraycolor2bg border-radius-10 w-100 d-table">
                    <td><NavLink to={`${process.env.PUBLIC_URL}/viewdetail/`+props.invid} className="text_decoration_none">{props.invoicename}</NavLink></td>
                    <td>{props.amount}</td>
                    <td><span className={"px-3 py-1 border-radius-100 fontsize14 " + props.badgebgcolor}>{props.badgetext}</span></td>
                    <td>
                        <div className="d-flex align-items-center">
                            
                            <a href={Globalsettings.url+"api/client/project-invoice/download/"+props.invid+'/'+ companyid + '/' + uid} target="_blank" className="btn paragraphcolor3bg mr-2"><img className="img-fluid" src={downloadicon} alt="" /></a>
                            <p className="m-0 fontsize14 mr-3">{props.time}</p>
                        </div>
                    </td>
                </tr>
            </div>
        </>
    )
}

export default InvoiceTabDataLoop;
