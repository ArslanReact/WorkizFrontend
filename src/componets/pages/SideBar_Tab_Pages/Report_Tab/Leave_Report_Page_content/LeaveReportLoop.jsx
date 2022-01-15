import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';

// 
import ApprovedLeaveModalLoop from "../Leave_Report_Page_content/ApprovedLeaveModalLoop";
import ApprovedModalTopBoxes from "../Leave_Report_Page_content/ApprovedModalTopBoxes";
import exportimg from "../../../../../assets/images/exporticon1.svg";
import DOMPurify from 'dompurify';
const LeaveReportLoop = (props) => {
    const [modalShowViewOne, setModalShowViewOne] = React.useState(false);
    const [modaltitle, setmodaltitle] = React.useState('');
    const [approveddata, setapproveddata] = React.useState('');
    const [leave_types, setleave_types] = useState({
        leave_types_array: []
    });
    const [leavelist, setleavelist] = useState({
        leavelist_array: []
    });
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const ApprovedLeaveView = (id) => {
        axios.get(Globalsettings.url + 'api/admin/reports/leave-report/show/' + id + '?startDate=' + props.fromDate + '&endDate=' + props.toDate + '&companyid=' + companyid)
            .then((response) => {
                setleave_types({ leave_types_array: response.data.leave_types ? response.data.leave_types : [], });
                setleavelist({ leavelist_array: response.data.leaves ? response.data.leaves : [], });
                setapproveddata(response.data.data);
                setmodaltitle(response.data.modalHeader);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
        setModalShowViewOne(true);
    }
    const PendingLeaveView = (id) => {
        axios.get(Globalsettings.url + 'api/admin/reports/leave-report/pending-leaves/' + id + '?startDate=' + props.fromDate + '&endDate=' + props.toDate + '&companyid=' + companyid)
            .then((response) => {
                setleave_types({ leave_types_array: response.data.leave_types ? response.data.leave_types : [], });
                setleavelist({ leavelist_array: response.data.leaves ? response.data.leaves : [], });
                setapproveddata(response.data.data);
                setmodaltitle(response.data.modalHeader);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
        setModalShowViewOne(true);
    }
    const UpcomingLeaveView = (id) => {
        axios.get(Globalsettings.url + 'api/admin/reports/leave-report/upcoming-leaves/' + id + '?startDate=' + props.fromDate + '&endDate=' + props.toDate + '&companyid=' + companyid)
            .then((response) => {
                setleave_types({ leave_types_array: response.data.leave_types ? response.data.leave_types : [], });
                setleavelist({ leavelist_array: response.data.leaves ? response.data.leaves : [], });
                setapproveddata(response.data.data);
                setmodaltitle(response.data.modalHeader);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
        setModalShowViewOne(true);
    }
    return (
        <>
            <tr>
                <td>{props.countnumber}</td>
                <td>{props.employeename}</td>
                <td>
                    {/* <span data-pk={props.id} className="mr-3 px-3 py-1 border-radius-100 greencolortext badgegreenbg">{props.approvedLeave}</span> */}
                <NavLink onClick={() => ApprovedLeaveView(props.id)} to="#" className="greencolortext">View</NavLink></td>
                <td>
                    {/* <span data-pk={props.id} className="mr-3 px-3 py-1 border-radius-100 yelowcolortext badgeyellowbg">{props.pendingLeave}</span> */}
                <NavLink onClick={() => PendingLeaveView(props.id)} className="yelowcolortext" to="#">View</NavLink></td>
                <td>
                    {/* <span data-pk={props.id} className="mr-3 px-3 py-1 border-radius-100 lightbluecolortext badgelightbluebg">{props.upcomingLeave}</span> */}
                    <NavLink onClick={() => UpcomingLeaveView(props.id)} to="#" className="lightbluecolortext">View</NavLink></td>
                
            </tr>
            {/* task categor */}
            <Modal show={modalShowViewOne} onHide={() => setModalShowViewOne(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">{modaltitle} Leaves Details</Modal.Title>
                </Modal.Header>
                {<div className="row" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(approveddata) }} />}
                <Modal.Body className="p-0">
                    <ul className="list-unstyled row my-4">
                        {leave_types.leave_types_array.map((val, index) => {
                            return (
                                <ApprovedModalTopBoxes
                                    key={index}
                                    circlebdcolor={val.color === 'success' ? "greencolorbg" : val.color === "danger" ? "redcolorbg" : val.color === "info" ? "yelowcolorbg" : "bluecolorbg"}
                                    circletext={val.leaves.length}
                                    title={val.type_name}
                                />
                            )
                        })}
                    </ul>
                    <div className="table-sm-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Type of Leave</th>
                                    <th>Date</th>
                                    <th>Reason For Absence</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leavelist.leavelist_array.length > 0 ?
                                    leavelist.leavelist_array.map((val, index) => {
                                        return (
                                            <ApprovedLeaveModalLoop
                                                key={index}
                                                type_name={val.type_name}
                                                date={val.date != null ? val.date : 'N/A'}
                                                reason={val.reason}
                                            />
                                        )
                                    })
                                    :
                                    <tr>
                                        <td>No Record Found!</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button variant="" className="w-100px graycolorbg fontsize14" onClick={() => setModalShowViewOne(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LeaveReportLoop;