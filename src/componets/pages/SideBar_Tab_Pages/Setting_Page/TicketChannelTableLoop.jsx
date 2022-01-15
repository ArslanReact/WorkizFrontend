import React from 'react';
import { Button } from "react-bootstrap";

import editiconimg from "../../../../assets/images/editimgicon.svg";
import crossimg from "../../../../assets/images/crossiconimg.svg";
const TicketChannelTableLoop = (props) => {
    const DeleteLeaveType = (id) => {
        props.DeleteLeaveType(id);
    }
    const EditLeaveType = (id) => {
        props.EditLeaveType(id);
    }
    return (
        <>
            <tr>
                <td width="300"><span className={"px-3 py-1 border-radius-100 " + props.badgebgcolor}>{props.badgetext}</span></td>
                <td width="300"><span>{props.noofleave}</span></td>
                <td width="300">
                    <Button variant="" onClick={() => EditLeaveType(props.leavetypeid)} className="w-40px h-40px mr-3 badgegreenbg"><img src={editiconimg} className="img-fluid" alt="" /></Button>
                    <Button onClick={() => DeleteLeaveType(props.leavetypeid)} variant="" className="w-40px h-40px badgeredbg"><img src={crossimg} className="img-fluid" alt="" /></Button>
                </td>
            </tr>
        </>
    )
}

export default TicketChannelTableLoop;