import React from 'react';
import { Button } from "react-bootstrap";

const ParticipationTable = (props) => {
    return (
        <>
            <tr>
                <td>
                    <div className="d-flex align-items-center">
                        <img className="img-fluid mr-3 avatar" src={props.avatarimg} alt="" />
                        <div>
                            <h4 className="fontsize14 mb-1 blackcolortext">{props.title}</h4>
                            <span className="greencolortext">{props.designation_name}</span>
                        </div>
                    </div>
                </td>
                
                <td><div className="mb-2">Late</div> <span className="badgeredbg d-inline-block fontsize14 redcolortext px-3 py-1 border-radius-100">{props.badgeth_1text}</span></td>
                <td><div className="mb-2">Half Day</div> <span className="badgeredbg d-inline-block fontsize14 redcolortext px-3 py-1 border-radius-100">{props.badgeth_1text}</span></td>
                <td><div className="mb-2">Clock In</div> {props.badgeth_2text}</td>
                <td><div className="mb-2">Clock Out</div> {props.badgeth_3text}</td>
                <td>
                    <div className="mb-2">Other</div>
                    <div className="d-inline-flex align-items-center">
                        <div className="d-block">
                            <p className="m-0 fontsize14">{props.clockinIP} <span className="paragraphcolor1text">{props.spantext1}</span></p>
                            <p className="m-0 fontsize14">{props.clockoutIP} <span className="paragraphcolor1text">{props.spantext2}</span></p>
                            <p className="m-0 fontsize14">{props.workingfrom} <span className="paragraphcolor1text">{props.spantext3}</span></p>
                        </div>
                        {/* <Button type="button" variant="" className="ml-3 px-3 fontsize14 border_redcolor_1 border-radius-100 py-1">Delete</Button> */}
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ParticipationTable;
