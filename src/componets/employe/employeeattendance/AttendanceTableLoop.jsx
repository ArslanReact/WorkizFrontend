import React from 'react';

const ClientCreditNote = (props) => {
    return (
        <>
            <tr>
                <td align="left">
                    <p className="m-0 fontsize14">{props.date}</p>
                    <span className={"badge border_radius_100 px-3 py-1 " + props.badgebgcolor2}>{props.badgetext2}</span>
                </td>
                <td><span className={"badge border_radius_100 px-3 py-1 " + props.badgebgstatus}>{props.badgestatus}</span></td>
                <td>{props.clocktime}</td>
                <td>{props.clockout}</td>
                <td><p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2">{props.othertext}</p></td>
            </tr>
        </>
    )
}

export default ClientCreditNote;
