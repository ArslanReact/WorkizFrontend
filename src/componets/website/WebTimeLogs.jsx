import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

// image import
import screen_65 from "../../assets/images/website/screen_65.png";
import screen_66 from "../../assets/images/website/screen_66.svg";
import screen_67 from "../../assets/images/website/screen_67.svg";
import screen_68 from "../../assets/images/website/screen_68.svg";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";

const WebTimeLogs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Time Log Management</h5>
                            <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                        </div>
                        <div className="col-xl-6 col-lg-12"><img className="img-fluid" src={screen_65} alt="screen Scheduling" /></div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 mt-5">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_66} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Time Logs</h6>
                                <p className="paragraph_grey1_text_color">Get a detailed report about your employee's time log. When they started working, end time, the total working hours, earnings made, and other details. The manager can have a calendar view, create invoices, and export the data.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Time Log Create</h6>
                                <p className="paragraph_grey1_text_color">To create a time log, the employee has to select the project, task, starting, and date. The user also has to enter the description of the project if required.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_67} alt="screen_1" /></div>
                                <span className="vector_top_right bottom left"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_68} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Employee Time Logs</h6>
                                <p className="paragraph_grey1_text_color">With EasyManage it is convenient for the manager to view the time log of every employee individual. The software provides access to the manager to monitor the designation, the task assigned, hours worked, earnings made.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebTimeLogs;
