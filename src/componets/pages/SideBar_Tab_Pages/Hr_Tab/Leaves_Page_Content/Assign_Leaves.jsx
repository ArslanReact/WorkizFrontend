import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FormLabel, Button, Modal, Form } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';

// 
import DataTableLoopModalOne from "../../Hr_Tab/Leaves_Page_Content/DataTableLoopModalOne";

// 
import activityicon from "../../../../../assets/images/activityicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";

const Assign_Leaves = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [modalShowLeaveType, setModalShowLeaveType] = React.useState(false);
    const [leavetypeInput, setleavetypeInput] = useState('');
    const [noofleave, setnoofleave] = useState('');
    const history = useHistory();
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;

    const [member, setmember] = useState('');
    const [leavetype, setleavetype] = useState('');
    const [date, setdate] = useState('');
    const [multidate] = useState('');
    const [reason, setreason] = useState('');
    const [status, setstatus] = useState('');
    const [duration, setduration] = useState('');
    const onValueChange = (e) => {
        setduration(e.target.value);
    }
    const [AllLeaveTypes, setAllLeaveTypes] = useState({
        AllLeaveTypes_Array: []
    });
    const [EmpList, setEmpList] = useState({
        EmpList_Array: []
    });
    // Load Data
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/leaves/create/' + companyid)
            .then((response) => {
                setAllLeaveTypes({ AllLeaveTypes_Array: response.data.leaveTypes ? response.data.leaveTypes : [], });
                setEmpList({ EmpList_Array: response.data.employees ? response.data.employees : [], });
            })
            .catch((error) => {

            });
    }, [companyid])
    //Insert Employee
    const HandleSubmit = (evt) => {
        setLoading(true);
        const data = new FormData();
        data.append('user_id', member);
        data.append('leave_type_id', leavetype);
        data.append('duration', duration);
        data.append('leave_date', date);
        data.append('multi_date', multidate);
        data.append('reason', reason);
        data.append('status', status);
        axios.post(Globalsettings.url + 'api/admin/leaves/store', data).then(response => {
            toast.success("Leave Assign Successfully!");
            setLoading(false);
            setTimeout(() => { 
                history.push(`${process.env.PUBLIC_URL}/leaves`);
            }, 3000);
        });
        evt.preventDefault();
    }
    //Insert Leave Type
    const SubmitLeaveCatform = (evt) => {
        axios.post(Globalsettings.url + 'api/admin/leaveType/store', {
            type_name: leavetypeInput,
            leave_number: noofleave,
            color: "info",
            company_id: companyid,
        }).then(response => {
            toast.success("Leave Type Successfully Inserted!");
            setModalShowLeaveType(false);
            setAllLeaveTypes({ AllLeaveTypes_Array: response.data.leaveTypes ? response.data.leaveTypes : [], });
        });
        evt.preventDefault();
    }
    // Delete Leave Type
    const DeleteLeaveType = (id) => {
        axios.get(Globalsettings.url + 'api/admin/leaveType/destroy/' + id)
            .then((response) => {
                toast.success("Leave Type Successfully Deleted!");
                axios.get(Globalsettings.url + 'api/admin/leaves/create/' + companyid)
                    .then((response) => {
                        setAllLeaveTypes({ AllLeaveTypes_Array: response.data.leaveTypes ? response.data.leaveTypes : [], });
                        setEmpList({ EmpList_Array: response.data.employees ? response.data.employees : [], });
                    })
                    .catch((error) => {

                    });
            })
            .catch((error) => {
            });
    }
    return (
        <>
            <ToastContainer />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid top-boxes mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title d-flex mb-3 mb-xl-0"> Leaves </h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/all_leaves`} className="btn bg-white mr-3 blackcolortext btn_blue"><img className="img-fluid mr-2" src={activityicon} alt="" /> All Leaves </NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/calendar_leaves`} className="btn bg-white blackcolortext btn_blue"><img className="img-fluid mr-2" src={calendaricon} alt="" /> Calendar View </NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="card card_dashboard card-body">
                    <h4 className="main_title fontsize16 d-flex">Assign Leaves </h4>
                    <Form onSubmit={HandleSubmit}>
                        <div className="row mt-4">
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Choose Member</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" required value={member} onChange={e => setmember(e.target.value)}>
                                    <option value="">Choose Member</option>
                                    {EmpList.EmpList_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Leave Type <NavLink onClick={() => setModalShowLeaveType(true)} to="#" className="ml-3 fontsize12 px-2 py-1 purplecolorbg text-white border-radius-100">Add Leave Type</NavLink></FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" required value={leavetype} onChange={e => setleavetype(e.target.value)}>
                                    <option value="">Select Leave Type</option>
                                    {AllLeaveTypes.AllLeaveTypes_Array.map((val) => {
                                        return (
                                            <option value={val.id}>{val.type_name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-3">Select Duration </FormLabel>
                                <div className="form-group d-flex">
                                    <div className="form-check-inline d-flex align-items-center ms-4 me-0">
                                        <Form.Check type="radio" name="radio1" value="single" checked={duration === "single"} label="Single" onChange={onValueChange} required className="p-0 d-flex align-items-center" />
                                    </div>
                                    {/* <div className="form-check-inline d-flex align-items-center">
                                        <Form.Check type="radio" name="radio1" value="multiple" checked={duration === "multiple"} onChange={onValueChange} required className="p-0 d-flex align-items-center" />
                                        <FormLabel className="fontsize16 fontweightregular">Multiple </FormLabel>
                                    </div> */}
                                    <div className="form-check-inline d-flex align-items-center ms-4 ps-4">
                                        <Form.Check type="radio" name="radio1" value="half day" label="Half Day" checked={duration === "half day"} onChange={onValueChange} required className="p-0 d-flex align-items-center" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Date</FormLabel>
                                <Form.Control type="date" className="transparent_form h-45px" required value={date} onChange={e => setdate(e.target.value)} />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Reason for absence</FormLabel>
                                <Form.Control className="transparent_form" as="textarea" rows={5} required value={reason} onChange={e => setreason(e.target.value)} />
                            </div>
                            <div className="col-xl-12 col-lg-12 mb-4">
                                <FormLabel className="mb-2">Status</FormLabel>
                                <Form.Control className="transparent_form h-45px" as="select" required value={status} onChange={e => setstatus(e.target.value)}>
                                    <option value="approved" selected>Approved</option>
                                    <option value="pending">Pending</option>
                                </Form.Control>
                            </div>
                            <div className="col-xl-12 text-end col-lg-12">
                                <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            {/* task categor */}
            <Modal show={modalShowLeaveType} onHide={() => setModalShowLeaveType(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton className="d-flex align-items-center p-0">
                    <Modal.Title id="contained-modal-title-vcenter">Leave Type</Modal.Title>
                </Modal.Header>
                <Form onSubmit={SubmitLeaveCatform}>
                    <Modal.Body className="p-0 my-4">
                        <div class="table-sm-responsive">
                            <table class="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllLeaveTypes.AllLeaveTypes_Array.map((val, index) => {
                                        let number = index + 1;
                                        return (
                                            <DataTableLoopModalOne
                                                key={index}
                                                countnumber={number}
                                                ltid={val.id}
                                                name={val.type_name}
                                                DeleteLeaveType={DeleteLeaveType}
                                                remove="remove"
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="form-group">
                            <FormLabel className="mb-2">Leave Type</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="text" value={leavetypeInput} onChange={e => setleavetypeInput(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <FormLabel className="mb-2">No of Leaves</FormLabel>
                            <Form.Control className="transparent_form h-45px" type="number" value={noofleave} onChange={e => setnoofleave(e.target.value)} />
                        </div>

                    </Modal.Body>
                    <Modal.Footer className="p-0">
                        <Button variant="" className="w-100px graycolorbg blackcolortext" onClick={props.onHide}>Close</Button>
                        <Button variant="" type="submit" className="w-100px btn_blue">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}

export default Assign_Leaves;