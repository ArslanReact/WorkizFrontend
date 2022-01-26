import React from 'react';
import { NavLink } from "react-router-dom";
import Globalsettings from "../../../../Globalsettings";
// 
import downloadicon from "../../../../../assets/images/download_1_icon.svg";

const InvoiceTabDataLoop = (props) => {
    return (
        <>
            <div className="w-100 d-table mb-3">
                <tr className="tolightgraycolor2bg border-radius-10 w-100 d-table">
                    <td>{props.invoicename}</td>
                    <td>{props.amount}</td>
                    <td><span className={"px-3 py-1 border-radius-100 fontsize14 " + props.badgebgcolor}>{props.badgetext}</span></td>
                    <td>
                        <div className="d-flex align-items-center">
                            <p className="m-0 fontsize14 mr-3">{props.time}</p>
                            <a href={Globalsettings.url+"api/all-invoices/download/"+props.id} className="btn paragraphcolor3bg"><img className="img-fluid" src={downloadicon} alt="" /></a>
                        </div>
                    </td>
                </tr>
            </div>
        </>
    )
}

export default InvoiceTabDataLoop;
