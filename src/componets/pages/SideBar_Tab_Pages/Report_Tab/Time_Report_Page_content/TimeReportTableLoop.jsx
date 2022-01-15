import React from 'react';
import { NavLink } from 'react-router-dom';

const TimeReportTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="">{props.projectname}</NavLink>{props.peojectname}</td>
                <td className="blusecolortext">{props.invoicename}</td>
                <td>{props.amount}</td>
                <td>{props.paidon}</td>
                <td>{props.badgetext}</td>
                <td>{props.remark}</td>
            </tr>
        </>
    )
}

export default TimeReportTableLoop;
