import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Form, FormLabel, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
// import images
import checkicon from "../../../assets/images/checkicon.svg";
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery";
const EmployeeApplyLeaves = () => {
    const [isLoading, setLoading] = useState(true);
    const [Duration, setDuration] = useState('');
    const [ltype, setltype] = useState('');
    const [date, setdate] = useState('');
    const [fdate, setfdate] = useState('');
    const [tdate, settdate] = useState('');
    const [reason, setreason] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });
    const [leaveTypes, setleaveTypes] = useState({
        leaveTypes_Array: []
    });
    const [leaves, setleaves] = useState({
        leaves_Array: []
    });
    const [Global, setGlobal] = useState({
        Global_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/leaves/create/' + companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
                setleaveTypes({ leaveTypes_Array: response.data.data.leaveTypes ? response.data.data.leaveTypes : [], });
                setleaves({ leaves_Array: response.data.data.leaves ? response.data.data.leaves : [], });
                setGlobal({ Global_Array: response.data.data.globalarray ? response.data.data.globalarray : [], });
                setLoading(false);
            });
    }, []);  


    var disabledDates = [];
    leaves.leaves_Array.map((val)=>{
        disabledDates.push(val.leave_date);
    });

    const FormSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/member/leaves/store/'+ companyid+'/'+userid, {
            user_id: userid,
            leave_type_id: ltype,
            duration: Duration,
            leave_date: date,
            fdate: fdate,
            tdate: tdate,
            reason: reason,
            status: 'pending'
        }).then((response) => {
            toast.success("Leave application successfully send.");
            setltype('');
            setDuration('');
            setdate('');
            setfdate('');
            settdate('');
            setreason('');
            setLoading(false);
        })
        .catch((error) => {
            setLoading(true);
            toast.error("Something went wrong!")
        });
        evt.preventDefault();
    } 
    return (
        <>
        <ToastContainer />
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title">Assign Leaves</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard p-4">
                    <Form onSubmit={FormSubmit} id="leaveform">
                    <div className="row">
                        <div className="col-xl-4 mb-4">
                            <FormLabel className="mb-2">Leave Type <span className="star">*</span></FormLabel>
                            <Form.Select className="transparent_form h-45px" aria-label="Default select example" value={ltype} onChange={(e) => setltype(e.target.value)} required>
                                <option value="">Select Leave Type</option>
                                {leaveTypes.leaveTypes_Array.map((val)=>{
                                    return(
                                        <option value={val.leave_type.id}>{val.leave_type.type_name}</option>
                                    )
                                })}
                            </Form.Select>
                        </div>
                        <div className="col-xl-4 mb-4">
                            <FormLabel className="mb-2">Select Duration</FormLabel>
                            <div className="d-flex mt-3">
                                <div className="px-4"><Form.Check type="radio" checked={Duration === 'single'} value="single" onClick={(e) => setDuration(e.target.value)} label="Single" name="formHorizontalRadios" id="formHorizontalRadios1" /></div>
                                <div className="px-4"><Form.Check type="radio" checked={Duration === 'multiple'} value="multiple" onClick={(e) => setDuration(e.target.value)} label="Multiple" name="formHorizontalRadios" id="formHorizontalRadios1" /></div>
                                <div className="px-4"><Form.Check type="radio" checked={Duration === 'half day'} value="half day" onClick={(e) => setDuration(e.target.value)} label="Half Day" name="formHorizontalRadios" id="formHorizontalRadios1" /></div>
                            </div>
                        </div>
                        {Duration == 'single' &&
                        <div className="col-xl-12 mb-4">
                            <FormLabel className="mb-2">Date <span className="star">*</span></FormLabel>
                            <Form.Control type="date" value={date} onChange={(e) => setdate(e.target.value)} required className="transparent_form h-45px" />
                        </div>}
                        {Duration == 'half day' &&
                        <div className="col-xl-12 mb-4">
                            <FormLabel className="mb-2">Date <span className="star">*</span></FormLabel>
                            <Form.Control type="date" value={date} onChange={(e) => setdate(e.target.value)} required className="transparent_form h-45px" />
                        </div>}
                        {Duration == 'multiple' &&
                        <>
                        <div className="col-xl-6 mb-4">
                            <FormLabel className="mb-2">From Date <span className="star">*</span></FormLabel>
                            <Form.Control type="date" value={fdate} onChange={(e) => setfdate(e.target.value)} required className="transparent_form h-45px" />
                        </div>
                        <div className="col-xl-6 mb-4">
                            <FormLabel className="mb-2">From Date <span className="star">*</span></FormLabel>
                            <Form.Control type="date" value={tdate} onChange={(e) => settdate(e.target.value)} required className="transparent_form h-45px" />
                        </div>
                        </>
                        }
                        <div className="col-xl-12 mb-4">
                            <FormLabel className="mb-2">Reason for absence <span className="star">*</span></FormLabel>
                            <Form.Control as="textarea" rows={4} value={reason} onChange={(e) => setreason(e.target.value)} required />
                        </div>
                        <div className="col-xl-12 col-lg-12 text-start">
                            <div className="btn-group">
                                <Button type="submit" variant="" className="btn btn_blue w-100px"><img className="img-fluid mr-2" src={checkicon} alt="" /> Save</Button>
                            </div>
                        </div>
                    </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EmployeeApplyLeaves;
