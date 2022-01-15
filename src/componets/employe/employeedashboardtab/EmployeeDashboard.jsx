import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { Table, InputGroup, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';

// Props_componets_folder
import TopBoxesLoop from '../employeedashboardtab/TopBoxesLoop';
import OverDueLoop from "../employeedashboardtab/OverDueLoop";
// 
import refresh_icon from "../../../assets/images/refresh_icon.svg";

import top_icon_1 from "../../../assets/images/top_icon_1.svg";
import top_icon_17 from "../../../assets/images/top_icon_17.svg";
import top_icon_18 from "../../../assets/images/top_icon_18.svg";
import avataricon from "../../../assets/images/user-1.jpg";
import moment from 'moment';
import $ from "jquery";
const EmployeeDashboard = () => {
    const today = Date().toLocaleString();
    const[noClockIn, setnoClockIn] = useState('');
    const[checkTodayHoliday, setcheckTodayHoliday] = useState('');
    const[todayTotalClockin, settodayTotalClockin] = useState('');
    const[maxAttandenceInDay, setmaxAttandenceInDay] = useState('');
    const[currenntClockIn, setcurrenntClockIn] = useState({currenntClockInArray:[]});
    const[globalsettings, setglobalsettings] = useState({globalsettingsArray:[]});
    const[pendingTasks, setpendingTasks] = useState({pendingTasksArray:[]});
    const[manualip, setmanualip] = useState('');
 

    const [ActivityList, setActivityList] = useState({ ActivityList_Array: []  });
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_1",
                toptitle: "Total Projects",
                color: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                iconimg: top_icon_17,
                altburger: "top_icon_17",
                toptitle: "Hours Logged",
                color: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                iconimg: top_icon_18,
                altburger: "top_icon_18",
                toptitle: "Pending Tasks",
                color: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                iconimg: top_icon_18,
                altburger: "top_icon_18",
                toptitle: "Completed Tasks",
                color: "nth_4",
                topnumber: "0",
            }
        ]
    });
    let temp_state = { ...state };
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    var userid = obj.id;
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/member/dashboard/' + companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.data.totalProjects;
                temp_state.TopBoxesArray[1].topnumber = response.data.data.counts.totalHoursLogged;
                temp_state.TopBoxesArray[2].topnumber = response.data.data.counts.totalPendingTasks;
                temp_state.TopBoxesArray[3].topnumber = response.data.data.counts.totalCompletedTasks;
                setTopBoxArray(temp_state);
                setActivityList({ ActivityList_Array: response.data.data.projectActivities ? response.data.data.projectActivities : [], });
                setnoClockIn(response.data.data.noClockIn);
                setcheckTodayHoliday(response.data.data.checkTodayHoliday);
                settodayTotalClockin(response.data.data.todayTotalClockin);
                setmaxAttandenceInDay(response.data.data.maxAttandenceInDay);
                setcurrenntClockIn({ currenntClockInArray: response.data.data.currenntClockIn ? response.data.data.currenntClockIn : [], });
                setglobalsettings({ globalsettingsArray: response.data.data.globalarray[0] ? response.data.data.globalarray[0] : [], });
                setpendingTasks({ pendingTasksArray: response.data.data.pendingTasks ? response.data.data.pendingTasks : [], });
                axios.get("http://jsonip.com").then((response) => { setmanualip(response.data.ip)});

            });
    }, [])

    return (
        <>
            <div className="container-fluid top-boxes mb-4">
                <h4 className="main_title mb-4">Dashboard</h4>
                <div className="row">
                    {state.TopBoxesArray.map((val) => {
                        return (
                            <TopBoxesLoop
                                key={val.key}
                                iconimg={val.iconimg}
                                altburger={val.altburger}
                                toptitle={val.toptitle}
                                color={val.color}
                                topnumber={val.topnumber}
                            />
                        )
                    })}
                </div>
            </div>
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-xl-0 mb-4">
                        <div className="card h-100 card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Attendance</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className=""><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                </div>
                            </div>
                            <div className="card-body p-3 p-xl-5">
                                <div className="p-3 bodycolorbg border_radius_10">
                                {noClockIn != '' ?

                                   checkTodayHoliday != '' ?
                                        todayTotalClockin < maxAttandenceInDay ?
                                            <Table borderedless className="m-0">
                                                <tbody>
                                                    <tr>
                                                        <td><strong>CLOCK IN</strong></td>
                                                        <td><strong>Clock In IP</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {currenntClockIn.currenntClockInArray.length > 0 ?
                                                            
                                                                moment(currenntClockIn.currenntClockInArray.clock_in_time.toLocaleString('en-US', { timeZone: globalsettings.globalsettingsArray.timezone })).format(globalsettings.globalsettingsArray.time_format)
                                                                :
                                                                moment(today.toLocaleString('en-US', { timeZone: globalsettings.globalsettingsArray.timezone })).format(globalsettings.globalsettingsArray.time_format)
                                                            }
                                                        </td>
                                                        <td>
                                                            {currenntClockIn.currenntClockInArray.length > 0 ?
                                                                currenntClockIn.currenntClockInArray.clock_in_ip
                                                                :
                                                                manualip
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            
                                        :
                                            <div class="col-xs-12">
                                                <div class="alert alert-info">@lang('modules.attendance.maxColckIn')</div>
                                            </div>
                                    :
                                    <div class="col-xs-12">
                                    <div class="alert alert-info alert-dismissable">
                                            <b>@lang('modules.dashboard.holidayCheck') d.</b> </div>
                                    </div>
                                :                          
                                   <div class="col-xs-12 text-center">
                                        <h4><i class="ti-alert text-danger"></i></h4>
                                        <h4>@lang('messages.officeTimeOver')</h4>
                                    </div>
                                }
                                </div>
                                <div className="mt-4">
                                    <InputGroup className="mb-0 border_greencolor_1 border_radius_10">
                                        <FormControl placeholder="Username" className="h-45px border_radius_10" aria-label="Username" aria-describedby="basic-addon1" />
                                        <InputGroup.Text id="basic-addon1" className="green_bg_color border_radius_10 border_greencolor_1 text-white">Clock In</InputGroup.Text>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Overdue Tasks</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className=""><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                </div>
                            </div>
                            <div className="card-body px-4">
                                <Table className="invice_data_table table-borderedless m-0">
                                    <thead>
                                        <tr>
                                            <th>Sr No</th>
                                            <th>Title</th>
                                            <th>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingTasks.pendingTasksArray.length > 0 ?
                                            pendingTasks.pendingTasksArray.map((val,index) => {
                                            return (
                                                <OverDueLoop
                                                    key={val.key}
                                                    counter={index+1}
                                                    heading={val.heading}
                                                    priority={val.priority}
                                                    due_date={val.due_date}
                                                    dateformat={globalsettings.globalsettingsArray.date_format}
                                                />
                                            )
                                        })
                                        :
                                            <tr>
                                                <td colSpan="2"></td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeDashboard;


// 
function sweattest() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted recurring invoice!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}