import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

// image import
import screen_51 from "../../assets/images/website/screen_51.png";
import screen_52 from "../../assets/images/website/screen_52.svg";
import screen_53 from "../../assets/images/website/screen_53.svg";
import screen_54 from "../../assets/images/website/screen_54.svg";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";

const Employees = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Employees Management</h5>
                            <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                        </div>
                        <div className="col-xl-6 col-lg-12 text-center"><img className="img-fluid" src={screen_51} alt="screen Scheduling" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_52} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Employee Listing</h6>
                                <p className="paragraph_grey1_text_color">View the list of all of your employees sorted according to their IDs, roles, and status. The head can also add new employees and export the data for further processing.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
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
                                <h6>Add Employee</h6>
                                <p className="paragraph_grey1_text_color">To add a new employee to the task list, the employer has to enter employee info such as ID, name, joining date, and other information. The manager can then view the time log of the employee.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_53} alt="screen_1" /></div>
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
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_54} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Employee Detail</h6>
                                <p className="paragraph_grey1_text_color">View details of the employees such as their name, email, tasks completed, hours worked, total days off, and other details.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employees;
