import React from 'react';
import { NavLink } from 'react-router-dom';

const FinanceReportTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td><NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.project_id} className="">{props.projectname}</NavLink>{props.peojectname}</td>
                <td>{props.invoicename}</td>
                <td>{props.amount}</td>
                <td>{props.paidon}</td>
                <td><span className={"border-radius-100 px-3 py-1 " + props.badgebgcolor}>{props.badgetext}</span></td>
                <td>{props.remark}</td>
            </tr>
        </>
    )
}

export default FinanceReportTableLoop;
