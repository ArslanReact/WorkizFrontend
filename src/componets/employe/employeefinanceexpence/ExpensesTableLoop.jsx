import React from 'react';

const ExpensesTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.itemname}</td>
                <td>{props.price}</td>
                <td>{props.purchacedate}</td>
                <td><span className={"badge px-3 py-2 border_radius_100 " + props.badgebgcolor}>{props.badgetext}</span></td>
                <td>--</td>
            </tr>
        </>
    )
}

export default ExpensesTableLoop;
