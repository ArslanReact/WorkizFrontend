import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

// image import
import screen_55 from "../../assets/images/website/screen_55.png";
import screen_56 from "../../assets/images/website/screen_56.png";
import screen_57 from "../../assets/images/website/screen_57.png";
import screen_58 from "../../assets/images/website/screen_58.svg";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";

const WebLeaves = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Leaves Management</h5>
                            <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                        </div>
                        <div className="col-xl-6 col-lg-12"><img className="img-fluid" src={screen_55} alt="screen Scheduling" /></div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 mt-5">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_56} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Leave Request</h6>
                                <p className="paragraph_grey1_text_color">The employees can request the employer with the reason. The software shows the number of leaves left for an employee. It is the choice of the employer to accept or reject the leave request.</p>
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
                                <h6>Leaves Listing</h6>
                                <p className="paragraph_grey1_text_color">The leave list shows the list of employees, their leave status, and type. It helps the employer to keep a record of why and when the employees are on leave.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_57} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_58} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Assign Leave</h6>
                                <p className="paragraph_grey1_text_color">The manager can assign leaves to the employees on basis of single, multiple, and half-day leave. The head has to maintain a record and mention reason for the absence of the employee along with the date.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebLeaves;
