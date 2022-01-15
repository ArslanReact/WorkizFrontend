import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { FormLabel, Form } from "react-bootstrap";

// import component
import AttendanceTableLoop from "../employeeattendance/AttendanceTableLoop";
import TopBoxesLoop from "../employeeattendance/TopBoxesLoop";
import dateFormat from 'dateformat';
import LoadingOverlay from 'react-loading-overlay';
const Employee_Attendance = () => {
    const [isLoading, setLoading] = useState(false);
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    // 
    const AttendanceTableLoopArray = [
        {
            key: "0",
            date: "15-03-2021",
            badgetext2: "Monday",
            badgebgcolor2: "badgegreen3bg badgegreencolor",
            badgestatus: "Absent",
            badgebgstatus: "badgeredbg redcolortext",
            clocktime: "--",
            clockout: "--",
            vildtill: "11-03-2021",
            othertext: "Details",
        },
    ]
    const [TableData, setTableData] = useState({
        TableData_Array: []
    });    
    // 
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
        {
            key: "0",
            toptitle: "Total Working Days",
            counternumber: "0",
            classnth: "nth_1",
        },
        {
            key: "1",
            counternumber: "0",
            toptitle: "Days Present",
            classnth: "nth_2",
        },
        {
            key: "2",
            counternumber: "0",
            toptitle: "Days Late",
            classnth: "nth_3",
        },
        {
            key: "3",
            counternumber: "0",
            toptitle: "Half Day",
            classnth: "nth_4",
        },
        {
            key: "4",
            counternumber: "0",
            toptitle: "Days Absent",
            classnth: "nth_5",
        },
        {
            key: "5",
            counternumber: "0",
            toptitle: "Holidays",
            classnth: "nth_6",
        },
    ]});
    let temp_state = { ...state };
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    var absentday = 0;
    const [GlobalData, setGlobalData] = useState({
        GlobalData_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/attendances/' + companyid+'/'+userid)
            .then((response) => {

                if((response.data.data.totalWorkingDays - response.data.data.daysPresent) < 0){
                    absentday = 0;
                }else{
                    absentday = response.data.data.totalWorkingDays - response.data.data.daysPresent;
                }
                temp_state.TopBoxesArray[0].counternumber = response.data.data.totalWorkingDays;
                temp_state.TopBoxesArray[1].counternumber = response.data.data.daysPresent;
                temp_state.TopBoxesArray[2].counternumber = response.data.data.daysLate;
                temp_state.TopBoxesArray[3].counternumber = response.data.data.halfDays;
                temp_state.TopBoxesArray[4].counternumber = absentday;
                temp_state.TopBoxesArray[5].counternumber = response.data.data.holidays;
                setTopBoxArray(temp_state);
                setTableData({ TableData_Array: response.data.data.attendances ? response.data.data.attendances : [], });
                setGlobalData({ GlobalData_Array: response.data.data.globalarray[0] ? response.data.data.globalarray[0] : [], });
            });
    }, []);
    // Custom Date Range
    const handleSubmit = (evt) => {
        setLoading(true);
        axios.get(Globalsettings.url + 'api/member/attendances/refresh-count/'+StartDate+'/'+EndDate+'/'+companyid+'/'+userid)
            .then((response) => {
                if((response.data.totalWorkingDays - response.data.daysPresent) < 0){
                    absentday = 0;
                }else{
                    absentday = response.data.totalWorkingDays - response.data.daysPresent;
                }
                temp_state.TopBoxesArray[0].counternumber = response.data.totalWorkingDays;
                temp_state.TopBoxesArray[1].counternumber = response.data.daysPresent;
                temp_state.TopBoxesArray[2].counternumber = response.data.daysLate;
                temp_state.TopBoxesArray[3].counternumber = response.data.halfDays;
                temp_state.TopBoxesArray[4].counternumber = absentday;
                temp_state.TopBoxesArray[5].counternumber = response.data.holidays;
                setTopBoxArray(temp_state);
            });
        axios.get(Globalsettings.url + 'api/member/attendances/employeeData/'+StartDate+'/'+EndDate+'/'+companyid+'/'+userid)
            .then((response) => {
                setTableData({ TableData_Array: response.data.data ? response.data.data : [], });
                setLoading(false);
            });
        evt.preventDefault();
    }        
    return (
        <>
        <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="container-fluid mb-3">
                <h4 className="main_title">Attendance</h4>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="card card_dashboard card-body">
                    <FormLabel className="mb-2 lightgraycolortext fontweightregular">Select Date Range</FormLabel>
                    <div className="all_calendar">
                        <Form onSubmit={handleSubmit}>
                            <div class="input-group date">
                                <Form.Control className="border_lightbluecolor_1" type="date" value={StartDate} onChange={e => setStartDate(e.target.value)} />
                                <div className="input-between-date">
                                    TO
                                </div>
                                <Form.Control className="border_lightbluecolor_1" type="date" value={EndDate} onChange={e => setEndDate(e.target.value)} />
                                <button type="submit" className="btn_calendar">Apply</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                    {state.TopBoxesArray.map((val) => {
                        return (
                            <TopBoxesLoop
                                key={val.key}
                                counternumber={val.counternumber}
                                toptitle={val.toptitle}
                                classnth={val.classnth}
                            />
                        )
                    })}
                </div>
            </div>
            {/*  */}
            <div className="table-sm-responsive data_table_profile">
                <table className="table m-0">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Clock In</th>
                            <th scope="col">Clock Out</th>
                            <th scope="col">Others</th>
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
        </>
    )
}

export default Employee_Attendance;
