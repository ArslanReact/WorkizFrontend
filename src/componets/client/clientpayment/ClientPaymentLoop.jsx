import React from 'react';


const ClientPaymentLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.estiname}</td>
                <td>{props.totalamount}</td>
                <td>{props.vildtill}</td>
                <td>{props.badgetext}</td>
                <td></td>
            </tr>
        </>
    )
}

export default ClientPaymentLoop;
