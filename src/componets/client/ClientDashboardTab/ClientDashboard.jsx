import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
// Props_componets_folder
import TopBoxesLoop from './TopBoxesLoop';

// 
import refresh_icon from "../../../assets/images/refresh_icon.svg";

import top_icon_1 from "../../../assets/images/top_icon_1.svg";
import top_icon_15 from "../../../assets/images/top_icon_15.svg";
import top_icon_16 from "../../../assets/images/top_icon_16.svg";
const ClientDashboard = () => {
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
                iconimg: top_icon_15,
                altburger: "top_icon_15",
                toptitle: "Unresolved Tickets",
                color: "nth_2",
                topnumber: "0",
            },
            {
                key: "2",
                iconimg: top_icon_16,
                altburger: "top_icon_16",
                toptitle: "Paid Amount",
                color: "nth_3",
                topnumber: "0",
            },
            {
                key: "3",
                iconimg: top_icon_16,
                altburger: "top_icon_16",
                toptitle: "Outstanding Amount",
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
        axios.get(Globalsettings.url + 'api/client/dashboard/' + companyid+'/'+userid)
            .then((response) => {
                temp_state.TopBoxesArray[0].topnumber = response.data.data.counts.totalProjects;
                temp_state.TopBoxesArray[1].topnumber = response.data.data.counts.totalUnResolvedTickets;
                temp_state.TopBoxesArray[2].topnumber = response.data.data.counts.totalPaidAmount;
                temp_state.TopBoxesArray[3].topnumber = response.data.data.counts.totalUnpaidAmount;
                setTopBoxArray(temp_state);
                setActivityList({ ActivityList_Array: response.data.data.projectActivities ? response.data.data.projectActivities : [], });
            });
    }, [])
    return (
        <>
            <div className="container-fluid top-boxes mb-4">
                <h4 className="main_title mb-4">Client Dashboard</h4>
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
                    <div className="col-xl-12 col-lg-12 mb-xl-0 mb-4">
                        <div className="card card_dashboard">
                            <div className="card-header d-flex align-items-center p-2 p-lg-3">
                                <h5 className="card-title fontsize20 blackcolortext mb-0">Activity</h5>
                                <div className="ml-auto">
                                    <NavLink to="#" className="mr-4"><img className="img-fluid" width="18" src={refresh_icon} alt="refresh_icon" /></NavLink>
                                </div>
                            </div>
                            <div className="card-body px-4 client-dashboard-activity">
                                    <ul className="list-unstyled px-2 boxes-style3">
                                        {ActivityList.ActivityList_Array.map((val) => {
                                            return (
                                                <li className="my-2">
                                                    <NavLink to={`${process.env.PUBLIC_URL}/client_viewdetails/`+val.project_id} className="w-100 p-3 align-items-center d-flex">
                                                        <span className="mr-auto fontsize16 fontweightmeduim"><small className="d-block mb-2">{val.project_name}</small> {val.activity}</span>
                                                        <span className="fontsize16 fontweightmeduim blusecolortext"><ReactTimeAgo date={val.date} locale="en-US"/></span>
                                                    </NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientDashboard;