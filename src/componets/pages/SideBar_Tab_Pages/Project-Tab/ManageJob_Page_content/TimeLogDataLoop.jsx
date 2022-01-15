import React from 'react';
import swal from 'sweetalert';
import { Modal, Button, Form, FormLabel, } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TimeLogDataLoop = (props) => {
    const [modalShowEditLog, setModalShowEditLog] = React.useState(false);
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>
                   <h4 className="ml-3 fontsize14 blackcolortext">{props.titlename}</h4>
                </td>

                <td>{props.starttime}</td>
                <td>{props.endtime}</td>
                <td><span className="greencolortext">{props.hourtime}</span></td>
                <td>{props.memoname}</td>
                <td>{props.adminname}</td>
            </tr>
            {/* task categor */}
        </>
    )
}

export default TimeLogDataLoop;