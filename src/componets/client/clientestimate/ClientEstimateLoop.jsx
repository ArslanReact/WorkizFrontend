import React from 'react';
import { NavLink } from "react-router-dom";
import Globalsettings from "../../Globalsettings";
// import images
import searchicon from "../../../assets/images/viewimg.svg";
import downloadicon from "../../../assets/images/downloadicon_white.svg";

const ClientCreditNote = (props) => {
        // get company id from session
        let obj = JSON.parse(localStorage.getItem('data'));
        var companyid = obj.company_id;
        var userid = obj.id;
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.estiname}</td>
                <td>{props.totalamount}</td>
                <td>{props.vildtill}</td>
                <td><p className={"m-0 badge px-3 py-2 border_radius_100 " + props.badgebgcolor}>{props.badgetext}</p></td>
                <td>
                    <NavLink to={`${process.env.PUBLIC_URL}/viewestimate/`+props.eid}  className="text-white btn px-3 py-1 paragraph_grey3_bg_color">View <img className="img-fluid ml-2" src={searchicon} alt="search icon" /></NavLink>
                    <a href={Globalsettings.url + 'api/client/estimates/download/'+companyid+'/'+userid+'/'+ props.eid} className="text-white btn px-3 py-1 blue_bg_color ml-3">Download <img className="img-fluid ml-2" src={downloadicon} alt="download icon" /></a>
                </td>
            </tr>
        </>
    )
}

export default ClientCreditNote;
