import React, { useEffect } from 'react';
import { Button } from "react-bootstrap";

// image import
import screen_59 from "../../assets/images/website/screen_59.svg";
import screen_60 from "../../assets/images/website/screen_60.svg";
import screen_61 from "../../assets/images/website/screen_61.svg";
import screen_62 from "../../assets/images/website/screen_62.svg";
import screen_63 from "../../assets/images/website/screen_63.svg";
import screen_64 from "../../assets/images/website/screen_64.svg";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";

const WebAttendance = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Attendance Management</h5>
                            <Button type="button" className="mt-4 d-inline-flex seablue_bg_color btnweb" variant="">Get Started</Button>
                        </div>
                        <div className="col-xl-6 col-lg-12"><img className="img-fluid" src={screen_59} alt="screen Scheduling" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_60} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Attendance</h6>
                                <p className="paragraph_grey1_text_color">View attendance details of your employees. The Attendance system helps the manager keep track of which employees were present, late, or working for half day. The clock records the timing when the employee started and stopped working.</p>
                                <Button type="button" variant="" className="d-inline-block seablue_bg_color btnweb">Get Started</Button>
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
                                <h6>Attendance by Date</h6>
                                <p className="paragraph_grey1_text_color">The employer can also view the attendance details of the employee's date-wise. It helps in keeping track of how many employees were working and on leave on a specific date.</p>
                                <Button type="button" variant="" className="d-inline-block seablue_bg_color btnweb">Get Started</Button>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_61} alt="screen_1" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_62} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Attendance by Member</h6>
                                <p className="paragraph_grey1_text_color">Track the attendance reports of your employees with date, status, Clock In, Out, and other details. The employer can edit or delete the reports if no longer needed.</p>
                                <Button type="button" variant="" className="d-inline-block seablue_bg_color btnweb">Get Started</Button>
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
                                <h6>Persence Details</h6>
                                <p className="paragraph_grey1_text_color">Get complete details of your employee's presence. Track the activity time and view how many hours the employee was on duty.</p>
                                <Button type="button" variant="" className="d-inline-block seablue_bg_color btnweb">Get Started</Button>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_63} alt="screen_1" /></div>
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
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_64} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Attendance by Member</h6>
                                <p className="paragraph_grey1_text_color">The employees can mark their attendance by themselves. They can start their time, set working day, work from home, or office. If the employee forgets to mark his attendance he will be absent from work.</p>
                                <Button type="button" variant="" className="d-inline-block seablue_bg_color btnweb">Get Started</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebAttendance;
