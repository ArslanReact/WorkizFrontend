import React from 'react'

const TaskContent = (props) => {
    return (
        <>
            <tr>
                <th scope="row">
                    <span className="fontsize14 ">{props.td1}</span>
                </th>
                <td>{props.td3}</td>
                <td>{props.td4}</td>
                <td>{props.td5}</td>
            </tr>
        </>
    )
}

export default TaskContent;
