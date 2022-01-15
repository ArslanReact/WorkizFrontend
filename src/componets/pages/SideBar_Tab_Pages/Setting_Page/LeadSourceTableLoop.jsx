import React from 'react';
import { Button } from "react-bootstrap";
import editiconimg from "../../../../assets/images/editimgicon.svg";
import crossimg from "../../../../assets/images/crossiconimg.svg";


const LeadSourceTableLoop = (props) => {
    const DeleteLeadSource = (id) => {
        props.DeleteLeadSource(id);
    }
    const UpdateLeadSource = (id) => {
        props.UpdateLeadSource(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td>
                    <Button onClick={() => UpdateLeadSource(props.leadsourceid)} variant="" className="w-40px h-40px mr-3 badgelightbluebg"><img src={editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => DeleteLeadSource(props.leadsourceid)} variant="" className="w-40px h-40px badgeredbg"><img src={crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr >
        </>
    )
}

export default LeadSourceTableLoop;