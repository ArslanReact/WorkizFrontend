import React from 'react';
import { Button} from "react-bootstrap";
import editiconimg from "../../../../assets/images/editimgicon.svg";
import crossimg from "../../../../assets/images/crossiconimg.svg";
//

const LeadStatusTableLoop = (props) => {
    const DeleteLeadStatus = (id) => {
        props.DeleteLeadStatus(id);
    }
    const UpdateLeadStatus = (id) => {
        props.UpdateLeadStatus(id);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><span className="border-radius-10 badge w-30px h-30px" style={{background: props.badgecolor}}>&nbsp;</span></td>
                <td>
                    <Button onClick={() => UpdateLeadStatus(props.lstatusid)} variant="" className="w-40px h-40px mr-3 border_lightbluecolor_1 badgelightbluebg"><img src={editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => DeleteLeadStatus(props.lstatusid)} variant="" className="w-40px h-40px badgeredbg"><img src={crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr >
        </>
    )
}

export default LeadStatusTableLoop;