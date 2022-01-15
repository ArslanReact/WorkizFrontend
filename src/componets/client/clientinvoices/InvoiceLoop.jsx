import React from 'react';

const InvoiceLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name} <p className="m-0 fontsize12">{props.smallname}</p></td>
                <td>{props.time}</td>
                <td>{props.unitprice}</td>
                <td>{props.price}</td>
            </tr>
        </>
    )
}

export default InvoiceLoop;
