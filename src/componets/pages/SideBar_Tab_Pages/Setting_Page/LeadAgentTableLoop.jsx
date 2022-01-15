import React from 'react';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';

//
import crossicon from "../../../../assets/images/crossiconimg.svg";

const LeadAgentTableLoop = (props) => {
    const DeleteLeadAgent = (id) => {
        props.DeleteLeadAgent(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><NavLink onClick={() => DeleteLeadAgent(props.leadAgentid)} to="#" className="px-3 py-1 badgeredbg redcolortext border-radius-5 text_decoration_none"><img className="img-fluid mr-2" src={crossicon} alt="" />Remove</NavLink></td>
            </tr>
        </>
    )
}

export default LeadAgentTableLoop;