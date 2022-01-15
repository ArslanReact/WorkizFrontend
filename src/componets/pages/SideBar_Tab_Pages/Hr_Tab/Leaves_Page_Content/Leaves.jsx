import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Globalsettings from "../../../../Globalsettings";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// 
import LeavesBox from "../../Hr_Tab/Leaves_Page_Content/LeavesBox";



// 
import activityicon from "../../../../../assets/images/activityicon.svg";
import plusicon from "../../../../../assets/images/plusicon.svg";
import calendaricon from "../../../../../assets/images/calendaricon.svg";



const Leaves = () => {
    // get company id from session
    let obj = JSON.parse(localStorage.getItem('data'));
    var companyid = obj.company_id;
    const [PendingLeave, setPendingLeave] = useState({
        PendingLeave_Array: []
    });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/admin/leaves/pending')
            .then((response) => {
                setPendingLeave({ PendingLeave_Array: response.data.pendingLeaves ? response.data.pendingLeaves : [], });
            });
    }, [])
    const leaveAccept = (id) => {
        axios.post(Globalsettings.url + 'api/admin/leaves/leaveAction', {
            leaveId: id,
            action: "approved",
        })
            .then((response) => {
                toast.success("Leave Successfully Accepted Mark!");
                axios.get(Globalsettings.url + 'api/admin/leaves/pending')
                    .then((response) => {
                        setPendingLeave({ PendingLeave_Array: response.data.pendingLeaves ? response.data.pendingLeaves : [], });
                    });
            })
            .catch((error) => {
            });
    }
    const leaveReject = (id, leavereason) => {
        axios.post(Globalsettings.url + 'api/admin/leaves/leaveAction', {
            leaveId: id,
            action: "rejected",
            reason: leavereason
        })
            .then((response) => {
                toast.success("Leave Successfully Rejected Mark!");
                axios.get(Globalsettings.url + 'api/admin/leaves/pending')
                    .then((response) => {
                        setPendingLeave({ PendingLeave_Array: response.data.pendingLeaves ? response.data.pendingLeaves : [], });
                    });
            })
            .catch((error) => {
            });
    }
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <>
            <ToastContainer />
            <div className="container-fluid top-boxes mb-4">
                <div className="d-xl-flex d-block align-items-center">
                    <h4 className="main_title d-flex mb-3 mb-xl-0"> Leaves <p className="mx-1 fontsize16 fontweightbold blusecolortext">{PendingLeave.PendingLeave_Array.length}</p> <p className="m-0 paragraphcolor1text">Pending Leaves</p></h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to={`${process.env.PUBLIC_URL}/all_leaves`} className="btn bg-white mr-3 blackcolortext btn_blue"><img className="img-fluid mr-2" src={activityicon} alt="" /> All Leaves </NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/calendar_leaves`} className="btn bg-white mr-3 blackcolortext btn_blue"><img className="img-fluid mr-2" src={calendaricon} alt="" /> Calendar View </NavLink>
                        <NavLink to={`${process.env.PUBLIC_URL}/assign_leaves`} className="btn btn_blue"><img className="img-fluid" src={plusicon} alt="" /> Assign Leave</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid top-boxes mb-4">
                <div className="row">
                    {PendingLeave.PendingLeave_Array.length > 0
                        ?
                        PendingLeave.PendingLeave_Array.map((val, index) => {
                            var types = [];
                            types.push(val.type);
                            var users = [];
                            users.push(val.user);
                            let count_number = index + 1;
                            var loIsDate = new Date(val.date);
                            var day = days[loIsDate.getDay()];
                            return (
                                <LeavesBox
                                    key={index}
                                    lid={val.id}
                                    count_number={count_number}
                                    type={types}
                                    user={users}
                                    now_update={val.now_update}
                                    color_progress={val.color_progress}
                                    progress_heading2={val.progress_heading2}
                                    variant={val.variant}
                                    leavetaken={val.leaves_taken_count}
                                    progress_heading={val.date + " (" + day + ")"}
                                    reason={val.reason}
                                    leaveAccept={leaveAccept}
                                    leaveReject={leaveReject}
                                />
                            )
                        })
                        :
                        <div className="container-fluid mb-4">
                            <div className="card card_dashboard card-body">No pending leaves remaining.</div>
                        </div>
                    }
                </div>
            </div>
            {/*  */}
        </>
    );
}

export default Leaves;
