import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import { NavLink } from "react-router-dom";
// import Flickity from 'react-flickity-component';
import OwlCarousel from 'react-owl-carousel';

// components attached
import MonthlyLoop from "../pricing/MonthlyLoop";
import AnnualyLoop from "../pricing/AnnualyLoop";
import ClientLoop from "../homepage/ClientLoop";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
import avatar_01 from "../../../assets/images/website/avatar_1.svg";
import avatar_02 from "../../../assets/images/website/avatar_2.svg";
import avatar_03 from "../../../assets/images/website/avatar_3.svg";
const Home = () => {
    // optionsprojects
    const optionsprojects = {
        margin: 15,
        responsiveClass: true,
        nav: false,
        dots: false,
        autoplay: true,
        navText: ["Prev", "Next"],
        smartSpeed: 300,
        loop: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 1,
            },
            700: {
                items: 1,
            },
            1000: {
                items: 2,

            },
            1500: {
                items: 3,

            },
        },
    };
    // ClientLoopArray
    const ClientLoopArray = [
        {
            key: "0",
            paragraph: "EasyManage is a great app that has made our company efficiently manage its tasks. We can easily keep a record of our employees and the projects we are working on.",
            title_name: "John Reeves",
            small_name: "Marketing Manager",
            avatar_img: avatar_01,
        },
        {
            key: "1",
            paragraph: "With this impressive app, our businesses processes are speed up. Our employees have 24/7 access to the software through which they can manage their work calendar easily.",
            title_name: "Milton Austin",
            small_name: "Sales Manager",
            avatar_img: avatar_02,
        },
        {
            key: "2",
            paragraph: "This app is fast and has spectacular functions. Our company had gained 10% more customers in last few months. We are able to maintain a real-time record of existing and proposed projects.",
            title_name: "Martha Rojas",
            small_name: "Director",
            avatar_img: avatar_03,
        },
    ]
    const [Packages, setPackages] = useState({ Packages_Array: [] });
    const [packageFeatures, setpackageFeatures] = useState({ packageFeatures_Array: [] });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/pricing')
            .then((response) => {
                setPackages({ Packages_Array: response.data.packages ? response.data.packages : [], });
                setpackageFeatures({ packageFeatures_Array: response.data.packageFeatures ? response.data.packageFeatures : [], });
            });
    }, []);
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
                        <p>Accelerate your business growth with EasyManage software. Schedule your daily tasks and efficiently manage your processes.</p>
                    </div>
                    {/*  */}
                    <div className="row pt-4">
                        <div className="col-xxl-4 col-xl-4 px-lg-5 col-lg-12 text-center">
                            <p className=""><img className="img-fluid" src={icon_1} alt="icon" /></p>
                            <h5 className="fontsize24 drkblue_text_color fontweightbold">Better Decisions</h5>
                            <p className="paragraph_grey1_text_color fontsize18">EasyManage allows the employees to manage their work calendar with drag-and-drop functions. The user can list all of his projects and streamline his daily tasks.</p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 px-lg-5 col-lg-12 text-center">
                            <p className=""><img className="img-fluid" src={icon_2} alt="icon" /></p>
                            <h5 className="fontsize24 drkblue_text_color fontweightbold">Faster Enrollments</h5>
                            <p className="paragraph_grey1_text_color fontsize18">With fast software, employees can enroll according to their designations. Instead of manually enrolling, employees make their selections and calculations, based on the available options.</p>
                        </div>
                        <div className="col-xxl-4 col-xl-4 px-lg-5 col-lg-12 text-center">
                            <p className=""><img className="img-fluid" src={icon_3} alt="icon" /></p>
                            <h5 className="fontsize24 drkblue_text_color fontweightbold">24/7 Access</h5>
                            <p className="paragraph_grey1_text_color fontsize18">The user has access to the CMS system anytime anywhere. It enables the employees to catch up on tasks after work hours.</p>
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
                                <h6>Project Management Is a Highly Effective Tool</h6>
                                <p className="paragraph_grey1_text_color">With EasyManage you can communicate with other team members. Scalable software that provides a detailed report of your ongoing projects, working time, status, and budget. This helps in determining the progress status of the project.</p>
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
                                <p className="paragraph_grey1_text_color">Organize your client's and employee's data with an efficient CRM system. EasyManage is an exceptional software with which you can monitor the progress of your conversions and take steps to improve the user experience.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn seablue_bg_color">Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>HR Management, Attendance, Timesheet Time Tracking</h6>
                                <p className="paragraph_grey1_text_color">Now it is easy for the HR manager to keep a track of his employees. The app provides the manager with a complete list of employees sorted according to the department. The head can view attendance details, reports, finance, and much more.</p>
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
                                <h6>Finance Management, Customer's data Management Tool</h6>
                                <p className="paragraph_grey1_text_color">With a finance management function, the company can manage the transactions smoothly. The manager can keep a complete record of invoices, estimates, proposals, and the status of payments. Every function provides a detailed view of the progress of the project.</p>
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
                        <h4 className="text-white">Testimonials</h4>
                    </div>
                    {/*  */}
                    <div className="mt-lg-5 mt-4">
                        <OwlCarousel className='owl-theme h-100' {...optionsprojects}>
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
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-lg-9 col-10 mx-auto mb-4">
                    <div className="main_head text-center pt-lg-5 pt-4">
                        <h4>Join Us and Let's Study With your Friends</h4>
                        <p>Manage all of your organization's tasks with a single app.</p>
                    </div>
                </div>
                {/*  */}
                <div className="pricing_content py-lg-5">
                    <div className="col-xl-11 col-lg-9 col-10 mx-auto">
                    <div className='text-center'>
                        <Tabs className="web_pricing_tabs">
                            <TabList>
                                <Tab>Annualy</Tab>
                                <Tab>Monthly</Tab>
                                
                            </TabList>

                            <TabPanel>
                                <div className="row mt-xl-5 mb-xl-5 mt-4 mb-4 align-items-center justify-content-center">
                                    {Packages.Packages_Array.map((val, index) => {
                                        return (
                                            <AnnualyLoop
                                                key={index}
                                                packagename={val.name}
                                                price={val.annual_price}
                                                description={val.description}
                                                maxuser={val.max_employees}
                                                most='Most Popular'
                                                none={val.none}
                                            />
                                        )
                                    })}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row mt-xl-5 mb-xl-5 mt-4 mb-4 align-items-start justify-content-center">
                                    {Packages.Packages_Array.map((val, index) => {
                                        return (
                                            <MonthlyLoop
                                                key={index}
                                                packagename={val.name}
                                                price={val.monthly_price}
                                                description={val.description}
                                                maxuser={val.max_employees}
                                                most='Most Popular'
                                                none={val.none}
                                            />
                                        )
                                    })}
                                </div>
                            </TabPanel>

                        </Tabs>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
