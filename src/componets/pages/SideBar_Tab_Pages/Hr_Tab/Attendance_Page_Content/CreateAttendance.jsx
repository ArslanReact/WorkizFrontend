import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import {Button,Card,Row } from "react-bootstrap";
import axios from 'axios';
import { FormLabel } from 'react-bootstrap';
import { Form } from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
import $ from "jquery";
// 
import CreateAttendanceLoop from "../../Hr_Tab/Attendance_Page_Content/CreateAttendanceLoop";
import CreateAttendanceLoopArray from "../../Hr_Tab/Attendance_Page_Content/CreateAttendanceLoopArray";
import DOMPurify from 'dompurify';

const CreateAttendance = () => {
    const [isLoading, setLoading] = useState(false);
    const [AttDate, setAttDate] = useState('');
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });  
    useEffect(() => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/data/'+companyid,{
            AttDate:AttDate
        })
        .then((response) => {
            setLoading(false);
            setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
        })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!");
        });
    }, []);
    const SubmitForm = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/data/'+companyid,{
            AttDate:AttDate
        })
        .then((response) => {
            setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong!");
        });
        evt.preventDefault();
    }

    const attsave = (id) => {
        var userId = id;
        var clockInTime = $('#clock-in-'+userId).val();
        var clockInIp = $('#clock-in-ip-'+userId).val();
        var clockOutTime = $('#clock-out-'+userId).val();
        var clockOutIp = $('#clock-out-ip-'+userId).val();
        var workingFrom = $('#working-from-'+userId).val();
        var date = $('#attendance_date').val();

        var late = 'no';
        if($('#late-'+userId).is(':checked')){
            late = 'yes';
        }
        var halfDay = 'no';
        if($('#halfday-'+userId).is(':checked')){
            halfDay = 'yes';
        }
        axios.post(Globalsettings.url + 'api/admin/attendances/store/'+companyid,{
            user_id: userId,
            clock_in_time: clockInTime,
            clock_in_ip: clockInIp,
            clock_out_time: clockOutTime,
            clock_out_ip: clockOutIp,
            late: late,
            half_day: halfDay,
            working_from: workingFrom,
            AttDate: AttDate
        })
        .then((response) => {
            toast.error("Attendance Save Successfully");
            axios.post(Globalsettings.url + 'api/admin/attendances/data/'+companyid,{
                AttDate:AttDate
            })
            .then((response) => {
                setLoading(false);
                setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Something went wrong!");
            });
        });
    }
    return (
        <>
        <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <h4 className="main_title mb-4">Attendance</h4>
                <Form onSubmit={SubmitForm}>
                <div className="row">
                    <div className="col-lg-6">
                        <FormLabel className="mb-2">Attendance Date</FormLabel>
                        <Form.Control type="date" className="transparent_form h-50px" required value={AttDate} onChange={e => setAttDate(e.target.value)} placeholder="" />       
                    </div>
                    <div className="col-lg-6">
                        <Button type="submit" style={{marginTop:'30px'}} variant=""  className="w-100 h-50px border-radius-10 btn btn_blue">Apply</Button>
                    </div>
                </div>
                </Form>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                {TableData.TableData_Array.map((val) => {
                    return(
                        <Card className="card_dashboard mb-3 p-2">
                            <Card.Body>
                                <Row>
                                    <div className='col-xxl-3 col-xl-3 col-lg-6'>
                                        <div className="d-flex align-items-center">
                                            <img className="img-fluid mr-3 avatar" src={val.image_url} alt="" />
                                            <div className='mt-3 mt-xl-0'>
                                                <h4 className="fontsize14 mb-1 blackcolortext mb-2">{val.name} 
                                                {val.clock_in > 0 ? 
                                                <span className="px-3 py-1 border-radius-100 ml-2 greencolortext badgegreenbg">Present</span>
                                                :
                                                <span className="px-3 py-1 border-radius-100 ml-2 redcolortext badgepinkbg">Absent</span>
                                                }
                                                </h4>
                                                <span className="greencolortext">{val.designation_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xxl-3 col-xl-3 col-lg-6'>
                                        <div className="form-group mb-3">
                                            <FormLabel className="mb-2">Clock In</FormLabel>
                                            <Form.Control type="time" id={"clock-in-"+val.id} className="transparent_form form-control h-45px" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <FormLabel className="mb-2">Clock Out</FormLabel>
                                            <Form.Control type="time" id={"clock-out-"+val.id} className="transparent_form form-control h-45px" placeholder="" />
                                        </div>
                                    </div>
                                    <div className='col-xxl-3 col-xl-3 col-lg-6'>
                                        <div className="form-group mb-3">
                                            <FormLabel className="mb-2">Clock In IP</FormLabel>
                                            <Form.Control type="text" name="clock_in_ip" id={"clock-in-ip-"+val.id} className="transparent_form form-control h-45px" placeholder="111.119.187.9" />
                                        </div>
                                        <div className="form-group">
                                            <FormLabel className="mb-2">Clock Out IP</FormLabel>
                                            <Form.Control type="text" name="clock_out_ip" id={"clock-out-ip-"+val.id} className="transparent_form form-control h-45px" placeholder="111.119.187.9" />
                                        </div>
                                    </div>
                                    <div className='col-xxl-3 col-xl-3 col-lg-6'>
                                        <div className="d-xl-flex align-items-center mb-3">
                                            <div className="form-group mr-xl-4">
                                                <FormLabel className="mb-2">Late</FormLabel>
                                                <input type="checkbox"  class="js-switch change-module-setting" data-color="#ed4040" id={"late-"+val.id}  />
                                                
                                            </div>
                                            <div className="form-group mt-3 mt-xl-0">
                                                <FormLabel className="mb-2">{val.label_text_workingfrom}</FormLabel>
                                                <Form.Control type="text" className="transparent_form form-control h-45px"  name="working_from" id={"working-from-"+val.id}  placeholder="Office" />
                                            </div>
                                        </div>
                                        <div className="d-xl-flex align-items-center mb-3">
                                            <div className="form-group mr-xl-4">
                                                <FormLabel className="mb-2">Half Day</FormLabel>
                                                <input type="checkbox"  class="js-switch change-module-setting" data-color="#ed4040" id={"halfday-"+val.id}  />
                                            </div>
                                            <div className="form-group mt-3 mt-xl-0">
                                                <Button type="button" onClick={() => attsave(val.id)} variant="" className="m-0 w-100px btn btn_blue">Save</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>                        
                    )
                })}
            </div>
        </>
    )
}

export default CreateAttendance;
{/* <>
<div id="attendance-table" className="row mb-3" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(val.id) }} />
</> */}