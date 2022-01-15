import React from 'react';
import { NavLink } from "react-router-dom";

// 
import DiscussionDataLoop from "../../Project-Tab/ManageJob_Page_content/DiscussionDataLoop";
import DiscussionDataLoop_Array from "../../Project-Tab/ManageJob_Page_content/DiscussionDataLoop_Array";
import chaticon from "../../../../../assets/images/chaticon.svg";
const View_Sub_Detail = () => {
    return (
        <>
            <div className="container-fluid mb-4">
                <div className="d-flex align-items-center">
                    <h4 className="main_title">Discussion Sub Page</h4>
                    <div className="btn-group ml-auto dropdown for_all">
                        <NavLink to="/view_details" className="btn w-100px btn_blue mr-3"> Back</NavLink>
                        <NavLink to="#" className="btn w-100px btn_blue lightbluecolorbg"> Reply</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container-fluid">
                <div className="card card_dashboard car-body">
                    <div className="table-sm-responsive clent_data_table">
                        <table className="table m-0 table-borderless">
                            <tbody>
                                {DiscussionDataLoop_Array.map((val) => {
                                    return (
                                        <DiscussionDataLoop
                                            key={val.key}
                                            avatarimg={val.avatarimg}
                                            title={val.title}
                                            admintext={val.admintext}
                                            description={val.description}
                                            number={val.number}
                                            name={val.name}
                                            badgebgcolor={val.badgebgcolor}
                                            crossicon={val.crossicon}
                                        />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*  */}
        </>
    )
}

export default View_Sub_Detail;
