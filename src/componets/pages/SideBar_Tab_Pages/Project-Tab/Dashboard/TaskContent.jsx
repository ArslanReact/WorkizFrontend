import React from 'react'

const TaskContent = (props) => {
    return (
        <>
            <tr>
                <th scope="row">
                    <span className={"fontsize14 " + props.tdradiobtn}><span className="mr-3"><input type="radio" defaultChecked="checked" name="radio1" /></span> {props.td1}</span>
                </th>
                <td>{props.td2}</td>
                <td>{props.td3}</td>
                <td><span className={props.classtexttdnth}>{props.td4}</span></td>
                <td><span className={"badge px-3 py-2 border-radius-100 " + props.classtdnth}>{props.td5}</span></td>
            </tr>
        </>
    )
}

export default TaskContent;
