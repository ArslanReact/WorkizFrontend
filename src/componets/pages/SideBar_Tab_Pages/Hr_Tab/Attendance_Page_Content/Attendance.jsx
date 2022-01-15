import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import DOMPurify from 'dompurify';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer, toast } from 'react-toastify';
//
import "react-google-flight-datepicker/dist/main.css";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../../../../../node_modules/react-tabs/style/react-tabs.css";

// 
import ParticipationTabTopBoxes from "../../Hr_Tab/Attendance_Page_Content/ParticipationTabTopBoxes";
import ParticipationTabTopBoxes_Array from "../../Hr_Tab/Attendance_Page_Content/ParticipationTabTopBoxes_Array";
import ParticipationTable from "../../Hr_Tab/Attendance_Page_Content/ParticipationTable";
import ParticipationTable_Array from "../../Hr_Tab/Attendance_Page_Content/ParticipationTable_Array";

// 
import plusicon from "../../../../../assets/images/plusicon.svg";


const Attendance = () => {
    var loopno = 1;
    const [isLoading, setLoading] = useState(false);
       // get company id from session
       let obj = JSON.parse(localStorage.getItem('data'));
       var companyid = obj.company_id;
       var userid = obj.id;
    var d = new Date();
    var m = d.getMonth() + 1;
    var y = d.getFullYear();
    const [monthval, setmonthval] = useState(m);
    const [year, setyear] = useState(y);
    const [empvalue, setempvalue] = useState(0);
    const [emplist, setemplist] = useState({
        emplist_Array: []
    }, []);
    const [attdetails, setattdetails] = useState('');
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/attendances/summary/'+companyid)
            .then((response) => {
                setemplist({ emplist_Array: response.data.employees ? response.data.employees : [], });
                setmonthval(response.data.month);
                setyear(response.data.year);
            })
            .catch((error) => {
                //  history.push('/signin');
            });

        axios.post(Globalsettings.url + 'api/admin/attendances/summaryData', {
            userId: empvalue,
            month: monthval,
            year: year
        })
            .then((response) => {
                setattdetails(response.data.data);
            })
            .catch((error) => {
                //  history.push('/signin');
            });
    }, [])
    const AttSummarySubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/summaryData', {
            userId: empvalue,
            month: monthval,
            year: year
        })
        .then((response) => {
            setattdetails(response.data.data);
            setLoading(false);
        })
        .catch((error) => {
            toast.error("somthing went wrong!");
        });        
        evt.preventDefault();
    }
    // Years List
    var yearslist = [];
    for (var i = year; i >= year - 4; i--) {
        yearslist.push(<option value={i}>{i}</option>);
    }
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });  
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [attuser, setattuser] = useState('');
    const [totalworkingday, settotalworkingday] = useState('');
    const [dayspresent, setdayspresent] = useState('');
    const [lateday, setlateday] = useState('');
    const [halfday, sethalfday] = useState('');
    const [daysabsent, setdaysabsent] = useState('');
    const [holidays, setholidays] = useState('');
    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/refresh-count/'+companyid+'/'+userid,{
            startDate: StartDate,
            endDate: EndDate,
            attuser: attuser
        })
        .then((response) => {
            settotalworkingday(response.data.totalWorkingDays);
            setdayspresent(response.data.daysPresent);
            setlateday(response.data.daysLate);
            sethalfday(response.data.halfDays);
            setdaysabsent(response.data.absentDays);
            setholidays(response.data.holidays);
            setLoading(false);
        });

        axios.get(Globalsettings.url + 'api/admin/attendances/employeeData/'+companyid+'/'+userid,{
            StartDate: StartDate,
            EndDate: EndDate,
            attuser: attuser
        })
        .then((response) => {
            setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
            setLoading(false);
        });
        evt.preventDefault();
    }
    const attandancebyuser = () => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/refresh-count/'+companyid+'/'+userid,{
            StartDate: StartDate,
            EndDate: EndDate,
            attuser: attuser
        })
        .then((response) => {
            settotalworkingday(response.data.totalWorkingDays);
            setdayspresent(response.data.daysPresent);
            setlateday(response.data.daysLate);
            sethalfday(response.data.halfDays);
            setdaysabsent(response.data.absentDays);
            setholidays(response.data.holidays);
            setLoading(false);
        });


        axios.get(Globalsettings.url + 'api/admin/attendances/employeeData/'+companyid+'/'+userid,{
            StartDate: StartDate,
            EndDate: EndDate,
            attuser: attuser
        })
        .then((response) => {
            setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
            setLoading(false);
        });
        
    }
    const [AttDate, setAttDate] = useState('');
    const [totalemployee, settotalemployee] = useState('');
    const [totalpresent, settotalpresent] = useState('');
    const [totalabsent, settotalabsent] = useState('');
    const [TableData1, setTableData1] = useState({
        TableData_Array1: []
    });  
    const attandancebydate = () => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/dateAttendanceCount/'+companyid+'/'+userid,{
            date: AttDate
        })
        .then((response) => {
            settotalemployee(response.data.totalAbsent);
            settotalpresent(response.data.totalPresent);
            settotalabsent(response.data.totalAbsent);
            setLoading(false);
        });
        axios.post(Globalsettings.url + 'api/admin/attendances/byDateData/'+companyid+'/'+userid,{
            AttDate: AttDate
        })
        .then((response) => {
            setTableData1({ TableData_Array1: response.data.data ? response.data.data : [], });
            setLoading(false);
        });
    }
    const handleAttSubmit = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/admin/attendances/dateAttendanceCount/'+companyid+'/'+userid,{
            date: AttDate
        })
        .then((response) => {
            settotalemployee(response.data.totalAbsent);
            settotalpresent(response.data.totalPresent);
            settotalabsent(response.data.totalAbsent);
            setLoading(false);
        });
        axios.post(Globalsettings.url + 'api/admin/attendances/byDateData/'+companyid+'/'+userid,{
            AttDate: AttDate
        })
        .then((response) => {
            setTableData1({ TableData_Array1: response.data.data ? response.data.data : [], });
            setLoading(false);
        });
        evt.preventDefault();
    }
    return (
        <>
        <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-4">
                <div className="d-block d-xl-flex align-items-center">
                    <h4 className="main_title mb-3 mb-xl-0">Attendance</h4>
                    <div className="btn-group ml-auto">
                        <NavLink to={`${process.env.PUBLIC_URL}/create_attendance`} className="btn btn_blue mr-3"><img className="img-fluid" src={plusicon} alt="" /> Mark Attendance</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4 full_page_tabs">
                <Tabs>
                    <TabList className="react-tabs__tab-list d-flex justify-content-between">
                        <Tab>Summary</Tab>
                        <Tab onClick={() => attandancebyuser()}>Presences Of A Member</Tab>
                        <Tab onClick={() => attandancebydate()}>Participation By Date</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="card card-body">
                            <Form onSubmit={AttSummarySubmit}>
                                <div className="row align-items-center mb-4">
                                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="mb-3">Employee Name</Form.Label>
                                            <Form.Control className="transparent_form h-50px" as="select" value={empvalue} onChange={e => setempvalue(e.target.value)}>
                                                <option value="">All Employee</option>
                                                {emplist.emplist_Array.map((val) => {
                                                    return (
                                                        <option value={val.id}>{val.name}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="mb-3">Select Month</Form.Label>
                                            <Form.Control className="transparent_form h-50px" as="select" value={monthval} onChange={e => setmonthval(e.target.value)}>
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="mb-3">Select Year</Form.Label>
                                            <Form.Control className="transparent_form h-50px" as="select" value={year} onChange={e => setyear(e.target.value)} >
                                                {yearslist}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-3 col-lg-12 mb-4 mb-lg-0">
                                        <Button type="submit" style={{marginTop:'37px'}} variant="" className="w-100 h-50px border-radius-10 btn btn_blue">Apply</Button>
                                    </div>
                                </div>
                            </Form>
                            {/*  */}
                            <div className="table-sm-responsive clent_data_table">
                                {<div  className="row" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(attdetails) }} />}
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card card-body">
                       
                        <Form onSubmit={handleSubmit}>
                        <div className="row align-items-center">
                            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                            <Form.Label className="mb-3">Select Date Range</Form.Label>
                                <div class="input-group date">
                                    <Form.Control className="transparent_form h-50px"  type="date" required value={StartDate} onChange={e => setStartDate(e.target.value)} />
                                    <div className="input-between-date">
                                        TO
                                    </div>
                                    <Form.Control className="transparent_form h-50px"  type="date" required value={EndDate} onChange={e => setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="mb-3">Employee Name</Form.Label>
                                            <Form.Control className="transparent_form h-50px" as="select" required value={attuser} onChange={(e) => setattuser(e.target.value)}>
                                                <option value="">Select Employee</option>
                                                {emplist.emplist_Array.map((val) => {
                                                    // if(loopno == 1){
                                                    //     setattuser(val.id);
                                                    // }
                                                    // loopno++;
                                                    return (
                                                        <option value={val.id}>{val.name}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                            <div className="col-xl-4 col-lg-12">
                                <Button type="submit" style={{marginTop:'37px'}} variant="" className="w-100 h-50px border-radius-10 btn btn_blue">Apply</Button>
                            </div>
                            </div>
                        </Form>
                                                
                            {/*  */}
                            <div className="row my-4">
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center badgegreenbg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 greencolorbg">{totalworkingday}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Total Working Days</h5>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center badgelightbluebg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 lightbluecolorbg">{dayspresent}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Days Present</h5>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center badgepinkbg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 redcolorbg">{lateday}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Days Late</h5>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center badgebluebg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 blusecolorbg">{halfday}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Half Day</h5>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center badgeyellowbg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 yelowcolorbg">{daysabsent}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Days Absent</h5>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 mb-4 mb-lg-0">
                                    <div className="p-3 border-radius-15 d-flex align-items-center lightlasercolorbg">
                                        <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 purplecolorbg">{holidays}</div>
                                        <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Holidays</h5>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div className="table-sm-responsive clent_data_table">
                                <table className="table m-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Clock In</th>
                                            <th>Clock Out</th>
                                            <th>Others</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.entries(TableData.TableData_Array).map(([key, val], i) => {
                            var attendancedata = [];
                            attendancedata.push(val.attendance);
                            var holidaydata = [];
                            holidaydata.push(val.holiday);
                            var leavedata = [];
                            leavedata.push(val.leave);
                            if(val.attendance == 'nodata'){
                                return(
                                    <tr>
                                        <td align="left">
                                            <p className="m-0 fontsize14">{val.date}</p>
                                            <span className="badge border_radius_100 px-3 py-1 badgegreen3bg badgegreencolor">{val.dayname}</span>
                                        </td>
                                        {val.holiday == 'nodata' && val.leave == 'nodata' ?
                                            <td><span className="badge border_radius_100 px-3 py-1 badgeredbg redcolortext">Absent</span></td>
                                            :
                                            val.leave != 'nodata' ?
                                            <td><span className="badge border_radius_100 px-3 py-1 badgeyellowbg yellowcolortext">Leave</span></td>
                                            :
                                            <td><span className="badge border_radius_100 px-3 py-1 badgegreen3bg badgegreencolor">Holiday</span></td>
                                        } 
                                        <td>--</td>
                                        <td>--</td>
                                        <td>
                                        {val.holiday != 'nodata' && val.leave == 'nodata' ?
                                            <p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2 holi">{holidaydata[0].occassion}</p>
                                            :
                                            val.leave != 'nodata' ?
                                            <p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2">{leavedata[0].reason}</p>
                                            :
                                            '--'
                                        }
                                        </td>

                                    </tr>
                                );
                            }else{
                                return (
                                    <tr>
                                        <td align="left">
                                            <p className="m-0 fontsize14">{val.date}</p>
                                            <span className="badge border_radius_100 px-3 py-1 badgegreen3bg badgegreencolor">{val.dayname}</span>
                                        </td>
                                        <td><span className="badge border_radius_100 px-3 py-1 badgegreen3bg badgegreencolor">Present</span></td>
                                        {attendancedata.map((val) => {
                                            return(
                                                <>
                                                <td>{val.clock_in_time != null ? val.clock_in_time : '--'}</td>
                                                <td>{val.clock_out_time != null ? val.clock_out_time : '--'}</td>
                                                <td>
                                                    {val.clock_in_ip == null ? '--' :<p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2">Clock In IP: {val.clock_in_ip}</p>}
                                                    {val.clock_out_ip == null ? '--' :<p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2">Clock In IP: {val.clock_out_ip}</p>}
                                                    {val.working_from == null ? '--' :<p className="m-0 badge px-3 py-2 green_text_color border_radius_100 border_greencolor_2">Work From: {val.working_from}</p>}
                                                </td>
                                                </>
                                            )
                                        })}
                                    </tr> 
                                );
                            }
                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="card card-body">
                            <Form onSubmit={handleAttSubmit}>
                                <div className="row align-items-center">
                                    <div className="col-xl-6 col-lg-12 mb-4 mb-lg-0">
                                        <Form.Group controlId="exampleForm.ControlSelect2">
                                            <Form.Label className="mb-3">Attendance Date</Form.Label>
                                            <Form.Control type="date" className="transparent_form h-50px" required value={AttDate} onChange={e => setAttDate(e.target.value)} />
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6 col-lg-12">
                                        <Button type="submit" variant="" style={{marginTop:'37px'}} className="w-100 h-50px border-radius-10 btn btn_blue">Apply</Button>
                                    </div>
                                </div>
                            </Form>
                            {/*  */}
                            <div className="row my-4">
                                <div className="row my-4">
                                    <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                        <div className="p-3 border-radius-15 d-flex align-items-center badgegreenbg">
                                            <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 greencolorbg">{totalemployee}</div>
                                            <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Total Employees</h5>
                                        </div>
                                    </div>                                
                                    <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                        <div className="p-3 border-radius-15 d-flex align-items-center badgelightbluebg">
                                            <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 lightbluecolorbg">{totalpresent}</div>
                                            <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Present</h5>
                                        </div>
                                    </div>                                
                                    <div className="col-xl-4 col-lg-4 mb-4 mb-lg-0">
                                        <div className="p-3 border-radius-15 d-flex align-items-center badgepinkbg">
                                            <div className="mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 redcolorbg">{totalabsent}</div>
                                            <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">Days Absent</h5>
                                        </div>
                                    </div>   
                                </div>                             
                            </div>
                            {/*  */}
                            <div className="table-sm-responsive clent_data_table">
                                <table className="table m-0">
                                    <tbody>
                                        {TableData1.TableData_Array1.map((val) => {
                                            return (
                                                <ParticipationTable
                                                    key={val.key}
                                                    avatarimg={val.image_url}
                                                    title={val.name}
                                                    designation_name={val.designation_name}
                                                    attendance={val.attendance}
                                                    th_1={val.th_1}
                                                    badgeth_1text={val.badgeth_1text}
                                                    th_2={val.th_2}
                                                    th_3={val.th_3}
                                                    badgeth_2text={val.badgeth_2text}
                                                    th_4={val.th_4}
                                                    badgeth_3text={val.badgeth_3text}
                                                    th_5={val.th_5}
                                                    clockinIP={val.clockinIP}
                                                    spantext1={val.spantext1}
                                                    clockoutIP={val.clockoutIP}
                                                    spantext2={val.spantext2}
                                                    workingfrom={val.workingfrom}
                                                    spantext3={val.spantext3}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}

export default Attendance;
