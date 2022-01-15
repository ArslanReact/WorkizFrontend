import React from 'react';

const AttendanceReportLoop = (props) => {
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.employeename}</td>
                <td>{props.presenttext}</td>
                <td>{props.absenttext}</td>
                <td>{props.hourtime}</td>
                <td>{props.days}</td>
                <td>{props.halfdays}</td>
            </tr>
        </>
    )
}

export default AttendanceReportLoop;
