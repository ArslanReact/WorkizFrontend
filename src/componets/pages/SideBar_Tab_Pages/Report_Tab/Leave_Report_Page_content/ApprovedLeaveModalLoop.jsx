import React from 'react';

const ApprovedLeaveModalLoop = (props) => {
    return (
        <>
            <tr>
                <td width="20%">
                    <p className="fontsize14">{props.type_name}</p>
                </td>
                <td width="20%">
                    <p className="fontsize14">{props.date}</p>
                </td>
                <td><p className="m-0 fontsize14">{props.reason}</p></td>
            </tr>
        </>
    )
}

export default ApprovedLeaveModalLoop;
