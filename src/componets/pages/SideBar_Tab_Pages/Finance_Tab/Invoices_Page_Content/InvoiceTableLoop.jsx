import React from 'react';

const InvoiceTableLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.itemsnumber}</td>
                <td>{props.hsnsac_text}</td>
                <td>{props.qty_text}</td>
                <td>{props.unitprice}</td>
                <td>{props.price}</td>
            </tr>
        </>
    )
}

export default InvoiceTableLoop;
