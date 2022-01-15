import React from 'react';
import { NavLink } from "react-router-dom";
import Flickity from 'react-flickity-component';

// components attached
import MonthlyLoop from "../homepage/MonthlyLoop";
import MonthlyLoopArray from "../homepage/MonthlyLoopArray";
import YearlyLoop from "../homepage/YearlyLoop";
import YearlyLoopArray from "../homepage/YearlyLoopArray";
import ClientLoop from "../homepage/ClientLoop";
import ClientLoopArray from "../homepage/ClientLoopArray";

// 
import Toggle from 'react-toggle';

// images attached
import screen_1 from "../../../assets/images/website/screen_1.png";
import screen_2 from "../../../assets/images/website/screen_2.png";
import screen_3 from "../../../assets/images/website/screen_3.png";
import screen_4 from "../../../assets/images/website/screen_4.png";
import screen_69 from "../../../assets/images/website/screen_69.png";
import icon_1 from "../../../assets/images/website/icon_1.svg";
import icon_2 from "../../../assets/images/website/icon_2.svg";
import icon_3 from "../../../assets/images/website/icon_3.svg";
import frame_vector_1 from "../../../assets/images/website/frame_vector_1.svg";
import frame_vector_2 from "../../../assets/images/website/frame_vector_2.svg";
import frame_vector_3 from "../../../assets/images/website/frame_vector_3.svg";

const Home = () => {
    const flickityOptions = {
        prevNextButtons: false,
        pageDots: false,
        autoPlay: 1500,
        groupCells: 1,
    }
    return (
        <>
            <div className="align-items-center pb-5">
                <div className="top_banner min_h py-5">
                    <div className="col-10 col-xl-11 mx-auto">
                        <div className="row align-items-start text-center">
                            <div className="col-xl-12 col-lg-12">
                                <h5 className="">Get Work Done From Anywhere.</h5>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image_absolute"><img className="img-fluid" src={screen_69} alt="sreen" /></div>
            </div>
            {/*  */}
            <div className="pb-lg-5 pb-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="main_head text-center mb-4">
                        <h4>A Better EasyMange Experience For All</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                    </div>
                    {/*  */}
                    <div className="row pt-4">
                        <div className="col-xl-4 px-lg-5 col-lg-6 text-center">
                            <p className=""><img className="img-fluid" src={icon_1} alt="icon" /></p>
                            <h5 className="fontsize30 drkblue_text_color fontweightbold">Better Decisions</h5>
                            <p className="paragraph_grey1_text_color fontsize18">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
                        </div>
                        <div className="col-xl-4 px-lg-5 col-lg-6 text-center">
                            <p className=""><img className="img-fluid" src={icon_2} alt="icon" /></p>
                            <h5 className="fontsize30 drkblue_text_color fontweightbold">Faster Enrollments</h5>
                            <p className="paragraph_grey1_text_color fontsize18">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
                        </div>
                        <div className="col-xl-4 px-lg-5 col-lg-12 text-center">
                            <p className=""><img className="img-fluid" src={icon_3} alt="icon" /></p>
                            <h5 className="fontsize30 drkblue_text_color fontweightbold">24/7 Access</h5>
                            <p className="paragraph_grey1_text_color fontsize18">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</p>
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
                                <h6>Project Management Its a Highly Effective Tool</h6>
                                <p className="paragraph_grey1_text_color">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn seablue_bg_color">Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative"><img className="img-fluid" src={screen_2} alt="screen_1" /></div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                                <div className="position-relative"><img className="img-fluid" src={screen_3} alt="screen_1" /></div>
                                <span className="vector_top_left top left"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Customer Relationship Management System</h6>
                                <p className="paragraph_grey1_text_color">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn seablue_bg_color">Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>HR Management, Attendance, Timesheet Time Tracking</h6>
                                <p className="paragraph_grey1_text_color">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn seablue_bg_color">Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                                <div className="position-relative"><img className="img-fluid" src={screen_4} alt="screen_1" /></div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="row align-items-center">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top right"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative"><img className="img-fluid" src={screen_1} alt="screen_1" /></div>
                                <span className="vector_top_left bottom left"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Finance Management, Customer’s Data Management Tool</h6>
                                <p className="paragraph_grey1_text_color">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn seablue_bg_color">Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 testimonials">
                <div className="col-xl-11 col-10 mx-auto mb-4">
                    <div className="main_head text-center mt-xl-5">
                        <h4 className="text-white">500+ Companies Have Switched to EasyManage</h4>
                    </div>
                    {/*  */}
                    <div className="mt-lg-5 mt-4">
                        <Flickity options={flickityOptions}>
                            {ClientLoopArray.map((val) => {
                                return (
                                    <ClientLoop
                                        key={val.key}
                                        paragraph={val.paragraph}
                                        title_name={val.title_name}
                                        small_name={val.small_name}
                                        avatar_img={val.avatar_img}
                                    />
                                )
                            })}
                        </Flickity>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto mb-4">
                    <div className="main_head text-center pt-lg-5 pt-4">
                        <h4>Join Us And Let’s Study With Your Friends</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</p>
                    </div>
                </div>
                {/*  */}
                <div className="pricing_content py-lg-5">
                    <div className="col-xl-8 col-10 mx-auto">
                        <div className="text-center d-flex align-items-center justify-content-center">
                            <label className="drkblue_text_color fontweightbold">Monthly</label>
                            <label className="mx-3 d-flex align-items-center">
                                <Toggle />
                            </label>
                            <label className="drkblue_text_color fontweightbold">Yearly</label>
                        </div>
                        <div className="row mt-xl-5 mb-xl-5 mt-4 mb-4 align-items-center justify-content-center">
                            {MonthlyLoopArray.map((val) => {
                                return (
                                    <MonthlyLoop
                                        key={val.key}
                                        price={val.price}
                                    />
                                )
                            })}
                            {YearlyLoopArray.map((val) => {
                                return (
                                    <YearlyLoop
                                        key={val.key}
                                        price={val.price}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
