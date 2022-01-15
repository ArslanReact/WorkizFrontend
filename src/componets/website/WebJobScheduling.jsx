import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// image import
import screen_11 from "../../assets/images/website/screen_11.png";
import screen_12 from "../../assets/images/website/screen_12.png";
import screen_13 from "../../assets/images/website/screen_13.png";
import screen_14 from "../../assets/images/website/screen_14.png";
import screen_70 from "../../assets/images/website/screen_70.png";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";


const WebJobScheduling = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Easily Schedule Jobs</h5>
                            <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                        </div>
                        <div className="col-xl-6 col-lg-12"><img className="img-fluid" src={screen_11} alt="screen Scheduling" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_12} alt="screen_1" /></div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Quickly Schedule, Manage, and Update</h6>
                                <p className="paragraph_grey1_text_color">Manage and monitor your daily work tasks with a simple drag-and-drop calendar. With this efficient software, you can plan work schedules according to your business requirements. With EasyManage you can get multiple views such as day, week, month, or year to manage your team's working schedule. It gives a clear view of your employee's availability.</p>
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
                                <h6>Manage Task Board Filter</h6>
                                <p className="paragraph_grey1_text_color">With EasyManage you can divide a job into multiple categories. The employee can determine the progress of the project and make improvements based on notes.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_13} alt="screen_1" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_70} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Add New Task</h6>
                                <p className="paragraph_grey1_text_color">Employees can create new tasks by naming the project and titles. For convenience, the user can also add a description, set visibility setting, timer, and other features.</p>
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
                                <h6>Job Scheduleing In Monthly Base </h6>
                                <p className="paragraph_grey1_text_color">View the working status of each employee on monthly basis. This makes it easier to assign tasks to employees and monitor their progress.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_14} alt="screen_1" /></div>
                                <span className="vector_top_right bottom left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebJobScheduling;
