import React, { useState, useEffect } from 'react';
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import swal from 'sweetalert';
import Calendar from "@ericz1803/react-google-calendar";

// Props_componets_folder
import RecentLoop from "./RecentLoop";
import RecentArray from './RecentArray';
import TopBoxesLoop from './TopBoxesLoop';
import EstimatesBoxLoop from './EstimatesBoxLoop';
import EstimatesBoxLoopArray from './EstimatesBoxLoopArray';
import JobsBoxLoop from './JobsBoxLoop';
import JobsBoxLoopArray from './JobsBoxLoopArray';
import InvoicesBoxLoop from './InvoicesBoxLoop';
import InvoicesBoxLoopArray from './InvoicesBoxLoopArray';

// 
import drop_icon from "../../../../../assets/images/drop_icon.svg";
import refresh_icon from "../../../../../assets/images/refresh_icon.svg";
import symbol_icon_1 from "../../../../../assets/images/symbol_icon_1.svg";
import symbol_icon_2 from "../../../../../assets/images/symbol_icon_2.svg";

import top_icon_1 from "../../../../../assets/images/top_icon_1.svg";
import top_icon_2 from "../../../../../assets/images/top_icon_2.svg";
import top_icon_3 from "../../../../../assets/images/top_icon_3.svg";
import top_icon_4 from "../../../../../assets/images/top_icon_4.svg";
import invoiceimg1 from "../../../../../assets/images/invoiceimg1.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
const Dashboard = () => {
    const API_KEY = "YOUR_API_KEY";
    let calendars = [
        { calendarId: "YOUR_CALENDAR_ID" },
        {
            calendarId: "YOUR_CALENDAR_ID_2",
            color: "#B241D1"
        }
    ];
    const [TotalProjects, setTotalProjects] = useState(0);
    const [TotalClients, setTotalClients] = useState(0);
    const [GraphLebels, setGraphLebels] = useState('');
    const [GraphDataset, setGraphDataset] = useState('');
    const [state, setTopBoxArray] = useState({
        TopBoxesArray: [
            {
                key: "0",
                iconimg: top_icon_1,
                altburger: "top_icon_1",
                toptitle: "Total Employees",
                color: "nth_1",
                topnumber: "0",
            },
            {
                key: "1",
                iconimg: top_icon_2,
                altburger: "top_icon_2",
                toptitle: "Unpaid Invoices",
                color: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                iconimg: top_icon_3,
                altburger: "top_icon_3",
                toptitle: "Pending Tasks",
                color: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                iconimg: top_icon_4,
                altburger: "top_icon_4",
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
        axios.get(Globalsettings.url + 'api/admin/dashboard/' + companyid+'/'+userid)
            .then((response) => {
                setTotalProjects(response.data.data.counts.totalProjects);
                setTotalClients(response.data.data.counts.totalClients);
                temp_state.TopBoxesArray[0].topnumber = response.data.data.counts.totalEmployees;
                temp_state.TopBoxesArray[1].topnumber = response.data.data.counts.totalUnpaidInvoices;
                temp_state.TopBoxesArray[2].topnumber = response.data.data.counts.totalPendingTasks;
                temp_state.TopBoxesArray[3].topnumber = response.data.data.counts.totalCompletedTasks;
                setGraphLebels(response.data.data.chartLebel);
                setGraphDataset(response.data.data.chartDataset);
                setTopBoxArray(temp_state);
            });
    }, [])
    return (
        <>
            <h4 className="main_title mb-4 px-4">Dashboard</h4>
            <div className="container-fluid top-boxes mb-4">
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
                    <div className="col-xl-5 col-lg-6 mb-xl-0 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Recent Earnings</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>

                                </div>
                            </div>
                            <div className="card-body px-4">
                                <div className="chart-heigh-bar">
                                    <Bar
                                        data={{
                                            animationEnabled: false,
                                            duration: false,
                                            labels: GraphLebels,
                                            datasets: [
                                                {
                                                    label: 'Earning',
                                                    data: GraphDataset,
                                                    borderColor: 'rgb(28, 166, 210)',
                                                    backgroundColor: 'rgb(28, 166, 210)',
                                                    fill: true
                                                }
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Today</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-2">
                                <ul className="list-unstyled px-2 boxes-style">
                                    <li className="border_bodycolor_1 overflow-hidden mb-1">
                                        <NavLink to="#" className="w-100 p-3 align-items-center d-flex">
                                            <span className="mr-auto fontsize16 fontweightmeduim">Sales</span>
                                            <span className="fontsize24 fontweightmeduim">$200</span>
                                        </NavLink>
                                    </li>
                                    <li className="border_bodycolor_1 overflow-hidden mb-1">
                                        <NavLink onClick={() => sweattest(true)} to="#" className="w-100 p-3 align-items-center d-flex">
                                            <span className="mr-auto fontsize16 fontweightmeduim">Collected</span>
                                            <span className="fontsize24 fontweightmeduim">$22,000</span>
                                        </NavLink>
                                    </li>
                                    <li className="border_bodycolor_1 overflow-hidden mb-1">
                                        <NavLink to="#" className="w-100 p-3 align-items-center d-flex">
                                            <span className="mr-auto fontsize16 fontweightmeduim">Jobs Done</span>
                                            <span className="fontsize24 fontweightmeduim">33</span>
                                        </NavLink>
                                    </li>
                                    <li className="border_bodycolor_1 overflow-hidden mb-1">
                                        <NavLink to="#" className="w-100 p-3 align-items-center d-flex">
                                            <span className="mr-auto fontsize16 fontweightmeduim">Jobs Canceled</span>
                                            <span className="fontsize24 fontweightmeduim">2</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                        <div className="card-body whitecolorbg mb-3 align-items-center d-flex">
                            <div className="mr-auto">
                                <h4 className="m-0 fontsize34 blackcolortext fontweightbold">{TotalProjects}+</h4>
                                <p className="m-0 fontsize18 lightgraycolortext">Projects</p>
                            </div>
                            <div className=""><img className="img-fluid" width="52" src={symbol_icon_1} alt="symbol_icon_1" /></div>
                        </div>
                        <div className="card-body whitecolorbg mb-3 align-items-center d-flex">
                            <div className="mr-auto">
                                <h4 className="m-0 fontsize34 blackcolortext fontweightbold">{TotalClients}+</h4>
                                <p className="m-0 fontsize18 lightgraycolortext">Clients</p>
                            </div>
                            <div className=""><img className="img-fluid" width="52" src={symbol_icon_2} alt="" /></div>
                        </div>
                        <div className="card-body whitecolorbg mb-3 align-items-center d-flex">
                            <div className="mr-auto">
                                <h4 className="m-0 fontsize34 blackcolortext fontweightbold">{TotalProjects}+</h4>
                                <p className="m-0 fontsize18 lightgraycolortext">Projects</p>
                            </div>
                            <div className=""><img className="img-fluid" width="52" src={symbol_icon_1} alt="symbol_icon_1" /></div>
                        </div>
                    </div>
                </div>
            </div>
 
            {/*  */}
            <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Jobs</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-2">
                                <ul className="list-unstyled px-2 boxes-style">
                                    {JobsBoxLoopArray.map((val) => {
                                        return (
                                            <JobsBoxLoop
                                                key={val.key}
                                                title={val.title}
                                                countnumber={val.countnumber}
                                            />
                                        )
                                    })}
                                </ul>
                                <NavLink to={`${process.env.PUBLIC_URL}/manage-job`} className="btn viewall mt-4">View All</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Estimates</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-2">
                                <ul className="list-unstyled px-2 boxes-style2">
                                    {EstimatesBoxLoopArray.map((val) => {
                                        return (
                                            <EstimatesBoxLoop
                                                key={val.key}
                                                text1={val.text1}
                                                smalltext={val.smalltext}
                                                countnumber={val.countnumber}
                                            />
                                        )
                                    })}
                                </ul>
                                <NavLink to={`${process.env.PUBLIC_URL}/estimates`} className="btn viewall mt-4">View All</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Recent Activities</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-2">
                                <ul className="list-unstyled px-2 boxes-style3">
                                    {RecentArray.map((val) => {
                                        return (
                                            <RecentLoop
                                                key={val.key}
                                                small={val.small}
                                                title={val.title}
                                                hashnumber={val.hashnumber}
                                                smallnumber={val.smallnumber}
                                            />
                                        )
                                    })}
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard h-100">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Invoices</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        {/* <NavLink to="#" className="dropdown-item fontsize14">Edit</NavLink> */}
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-2 d-block text-center align-items-center">
                                
                                    <div className=""><img width="200" className="img-fluid" src={invoiceimg1} alt="" /></div>
                                    <div className="paragraphcolor1text">Track your invoice and past due payments</div>
                            </div>
                            <div className='card-footer'>
                                <div className="d-flex align-items-center justify-content-between">
                                    <NavLink to={`${process.env.PUBLIC_URL}/invoice`} className="m-0 btn viewall">View All</NavLink>
                                    <NavLink to={`${process.env.PUBLIC_URL}/add_invoice`} className="m-0 btn viewall blusecolorbg"><img className="img-fluid" src={plusicon} alt="" /></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            {/* <div className="container-fluid mb-4">
                <div className="row">
                    <div className="col-xl-6 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Leaves</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                        
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-4">
                                <Calendar apiKey={API_KEY} calendars={calendars} />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Jobs By Status</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                    <NavLink to="#" className="" role="button" data-toggle="dropdown"><img className="img-fluid" width="10" src={drop_icon} alt="drop_icon" /></NavLink>
                                    <div className="dropdown-menu m-0 dropdown-menu-right">
                                       
                                        <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14">Delete</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-4">Chart</div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Dashboard;


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