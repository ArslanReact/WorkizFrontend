import React from 'react';

const LeadFormDataTable = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.fieldname}</td>
                <td>
                    <div className={"button m-0 top-0 " + props.notyes} id="button-1">
                        <input type="checkbox" className="checkbox" />
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default LeadFormDataTable;
