import React from 'react';

const ManageRoleModalLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.name}</td>
                <td><span className="redcolortext">{props.default_text}</span></td>
            </tr>
        </>
    )
}

export default ManageRoleModalLoop;
