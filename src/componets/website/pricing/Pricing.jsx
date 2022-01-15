import React, { useState, useEffect } from 'react';
import Globalsettings from "../../Globalsettings";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import { NavLink } from "react-router-dom";
// components attached
import MonthlyLoop from "./MonthlyLoop";
import AnnualyLoop from "./AnnualyLoop";

import ClientLoop from "../homepage/ClientLoop";

// 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// 
// import icon1 from "../../../assets/images/website/questionmark_vector_1.svg";
import icon2 from "../../../assets/images/website/check_vector.svg";
import icon3 from "../../../assets/images/website/cross_vector.svg";
import avatar_01 from "../../../assets/images/website/avatar_1.svg";
import avatar_02 from "../../../assets/images/website/avatar_2.svg";
import avatar_03 from "../../../assets/images/website/avatar_3.svg";

const Pricing = () => {
    const [Packages, setPackages] = useState({ Packages_Array: [] });
    const [packageFeatures, setpackageFeatures] = useState({ packageFeatures_Array: [] });
    useEffect(() => {
        axios.get(Globalsettings.url + 'api/pricing')
            .then((response) => {
                setPackages({ Packages_Array: response.data.packages ? response.data.packages : [], });
                setpackageFeatures({ packageFeatures_Array: response.data.packageFeatures ? response.data.packageFeatures : [], });
            });
    }, []);
    // 
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    // const EasySchduledLoopArray = [
    //     {
    //         key: "0",
    //         data_1: "Scheduling",
    //         data_2: icon1,
    //         data_3: icon2,
    //         data_5: icon2,
    //         data_4: icon2,
    //     },
    // ]
    // PaidTableLoop
    // const PaidTableLoopArray = [
    //     {
    //         key: "0",
    //         data_1: "Credit Card Processing",
    //         data_2: icon1,
    //         data_3: "2.99%",
    //         data_5: "2.79%",
    //         data_4: "2.69%",
    //     },
    // ]
    // ManagementTableLoopArray
    // const ManagementTableLoopArray = [
    //     {
    //         key: "0",
    //         data_1: "Team Messaging",
    //         data_2: icon1,
    //         data_3: icon2,
    //         data_5: icon3,
    //         data_4: icon2,
    //     },
    // ]
    // CustomerTableLoop
    // const CustomerTableLoopArray = [
    //     {
    //         key: "0",
    //         data_1: "Chat & Email Support",
    //         data_2: icon1,
    //         data_3: icon2,
    //         data_5: icon3,
    //         data_4: icon2,
    //     },
    // ]
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
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Pricing</h5>
            </div>
            {/*  */}
            <div className="py-5 pricing_content">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="main_head text-center mb-4">
                        <h4>Affordable Pricing</h4>
                        <p>Start your 14-day free trial today. No credit card required</p>
                    </div>
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
                                <div class="card-body">
                                <div className="pb-lg-5 pb-4 text-center">
                                        <p className="m-0 fontsize22 drkblue_text_color fontweightbold">Need a Larger Plan? <NavLink to={`${process.env.PUBLIC_URL}/contact_us`} className="fontsize22 text-decoration-underline seablue_text_color">Contact Us</NavLink> for details!</p>
                                    </div>
                                <div class="col-xxl-9 col-xl-9 col-lg-10 mx-auto">
                                <div class="price-wrap border row gx-0 justify-content-center">
                                    <div class="diff-table col-lg-4 col-md-4 col-12">
                                        <div class="price-top">
                                            <div class="price-top title">
                                                <b>Compare Features</b>
                                            </div>
                                            <div class="price-content">
                                                <ul className="list-unstyled">
                                                    <li>Max Employees</li>
                                                    <li>Max Storage</li>
                                                    {packageFeatures.packageFeatures_Array.map((val) => {
                                                        return (
                                                            <li>
                                                                {val}
                                                            </li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div class="all-plans col-12 col-lg-8 col-md-8 col-sm-8">
                                        <div class="row gx-0 flex-nowrap justify-content-end flex-wrap overflow-auto row-scroll">
                                            {Packages.Packages_Array.map((val, index) => {
                                                var data = JSON.parse(val.module_in_package);
                                                var result = [];
                                                for (var i in data)
                                                    result.push(data[i]);
                                                return (
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-12 package-column">
                                                        <div class="pricing-table price-@if($item->is_recommended == 1)pro @endif">
                                                            <div class="price-top">
                                                                <div class="price-top title">
                                                                    <b class="mb-0">{val.name}</b>
                                                                </div>
                                                            </div>
                                                            <div class="price-content">
                                                                <ul className="list-unstyled">
                                                                    <li>
                                                                        {val.max_employees}
                                                                    </li>
                                                                    <li>
                                                                        {val.max_storage_size === "-1" ? "Unlimited" : val.max_storage_size}
                                                                    </li>

                                                                    {packageFeatures.packageFeatures_Array.map((vals) => {
                                                                        return (
                                                                            <li>
                                                                                {result.includes(vals) ?
                                                                                    <img className="img-fluid" src={icon2} alt="question_icon" width="18" />
                                                                                    :
                                                                                    <img className="img-fluid" src={icon3} alt="question_icon" width="18" />
                                                                                }
                                                                            </li>
                                                                        )
                                                                    })
                                                                    }
                                                                    <li>
                                                                        <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb mt-3">Free Trail</NavLink>
                                                                    </li>                                                                    
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                </div>
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
                                {/*  */}

                                <div class="card-body">
                                    <div className="pb-lg-5 pb-4 text-center">
                                        <p className="m-0 fontsize22 drkblue_text_color fontweightbold">Need a Larger Plan? <NavLink to={`${process.env.PUBLIC_URL}/contact_us`} className="fontsize22 text-decoration-underline seablue_text_color">Contact Us</NavLink> for details!</p>
                                    </div>
                                <div class="col-xxl-9 col-xl-9 col-lg-10 mx-auto">
                                <div class="price-wrap border row gx-0 justify-content-center">
                                    <div class="diff-table col-lg-4 col-md-4 col-sm-4 col-12">
                                        <div class="price-top">
                                            <div class="price-top title">
                                                <b>Compare Features</b>
                                            </div>
                                            <div class="price-content">
                                                <ul className="list-unstyled">
                                                    <li>Max Employees</li>
                                                    <li>Max Storage</li>
                                                    {packageFeatures.packageFeatures_Array.map((val) => {
                                                        return (
                                                            <li>
                                                                {val}
                                                            </li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="all-plans col-12 col-lg-8 col-md-8 col-sm-8">
                                        <div class="row gx-0 flex-nowrap flex-wrap overflow-auto row-scroll justify-content-end">
                                            {Packages.Packages_Array.map((val, index) => {
                                                var data = JSON.parse(val.module_in_package);
                                                var result = [];
                                                for (var i in data)
                                                    result.push(data[i]);
                                                return (
                                                    <div class="col-lg-4 col-md-4 col-sm-4 col-12 package-column">
                                                        <div class="pricing-table price-@if($item->is_recommended == 1)pro @endif">
                                                            <div class="price-top">
                                                                <div class="price-top title">
                                                                    <b class="mb-0">{val.name}</b>
                                                                </div>
                                                            </div>
                                                            <div class="price-content">
                                                                <ul className="list-unstyled">
                                                                    <li>
                                                                        {val.max_employees}
                                                                    </li>
                                                                    <li>
                                                                        {val.max_storage_size === "-1" ? "Unlimited" : val.max_storage_size}
                                                                    </li>

                                                                    {packageFeatures.packageFeatures_Array.map((vals) => {
                                                                        return (
                                                                            <li>
                                                                                {result.includes(vals) ?
                                                                                    <img className="img-fluid" src={icon2} alt="question_icon" width="18" />
                                                                                    :
                                                                                    <img className="img-fluid" src={icon3} alt="question_icon" width="18" />
                                                                                }
                                                                            </li>
                                                                        )
                                                                    })
                                                                    }
                                                                    <li>
                                                                        <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb mt-3">Free Trail</NavLink>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>
                                </div>
                                </div>
                            </TabPanel>                            
                        </Tabs>
                    </div>
                    {/*  */}


                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 testimonials mb-5">
                <div className="col-xl-11 col-10 mx-auto mb-4">
                    <div className="main_head text-center mt-xl-5">
                        <h4 className="text-white">500+ Companies Have Switched to EasyManage</h4>
                    </div>
                    {/*  */}
                    <div className="row pt-lg-4 mb-xl-5">
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
        </>
    )
}

export default Pricing;
