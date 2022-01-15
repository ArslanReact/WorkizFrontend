import React, { useEffect } from 'react';
import { InputGroup, Form } from "react-bootstrap";

// import component
import SupportLoop from "../support/SupportLoop";

// image import
import avatar01 from "../../../assets/images/website/avatar_1.svg";
import avatar02 from "../../../assets/images/website/avatar_2.svg";

const Support = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    // SupportLoopArray
    const SupportLoopArray = [
        {
            key: "0",
            title: "Getting Started",
            title2: "Getting started with EasyManage work flow",
            text1: "8 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "1",
            title: "Team Management",
            title2: "Getting started with EasyManage work flow",
            text1: "3 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "2",
            title: "Documents",
            title2: "Getting started with EasyManage work flow",
            text1: "2 articles in this collection",
            text2: "Written by Topaz Eitan",
            avatar1: avatar01,
            avatar2: avatar02,
            noimage: "d-none",
        },
        {
            key: "2",
            title: "Payments",
            title2: "Getting started with EasyManage work flow",
            text1: "4 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "3",
            title: "FAQ",
            title2: "Commonly asked questions about EasyManage",
            text1: "13 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "4",
            title: "Inventory",
            title2: "Getting started with EasyManage work flow",
            text1: "3 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "5",
            title: "Estimates",
            title2: "Getting started with EasyManage work flow",
            text1: "5 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "6",
            title: "Customization",
            title2: "Getting started with EasyManage work flow",
            text1: "6 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "6",
            title: "EasyManage Phone",
            title2: "Getting started with EasyManage work flow",
            text1: "15 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "7",
            title: "Marketing",
            title2: "Market your business",
            text1: "3 articles in this collection",
            text2: "Written by Dan",
            avatar1: avatar01,
            avatar2: avatar02,
            noimage1: "d-none",
        },
        {
            key: "8",
            title: "Invoicing",
            title2: "All about creating, managing, and sending invoice.",
            text1: "12 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "8",
            title: "Team",
            title2: "Find out more about team features, restrictions, and more.",
            text1: "5 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "8",
            title: "Integrations",
            title2: "Connect EasyManage with third-party applications",
            text1: "13 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
            avatar1: avatar01,
            avatar2: avatar02,
        },
        {
            key: "9",
            title: "Client Management",
            title2: "Manage your clients efficiently",
            text1: "6 articles in this collection",
            text2: "Written by Dan",
            avatar1: avatar01,
            avatar2: avatar02,
            noimage: "d-none",
        },
        {
            key: "9",
            title: "EasyManage Service Chatbot",
            title2: "Manage your clients efficiently",
            text1: "2 articles in this collection",
            text2: "Written by Topaz Eitan ",
            avatar1: avatar01,
            avatar2: avatar02,
            noimage1: "d-none",
        },
        {
            key: "10",
            title: "General Settings",
            title2: "Manage your clients efficiently",
            text1: "5 articles in this collection",
            text2: "Written by Dan ",
            avatar1: avatar01,
            avatar2: avatar02,
            noimage: "d-none",
        },
        {
            key: "11",
            title: "Job settings",
            title2: "Manage your clients efficiently",
            text1: "2 articles in this collection",
            text2: "Written by Dan ",
            avatar1: avatar01,
            avatar2: avatar02,
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Support</h5>
            </div>
            {/*  */}
            <div className="py-5 faq">
                <div className="col-10 col-xl-9 mx-auto">
                    <h4 className="mb-4 fontsize28 fontweightbold drkblue_text_color">Advice and answers from the EasyManage Team</h4>
                    <div className="p-4 border_radius_10 search_filter paragraph_grey2_bg_color">
                        <InputGroup className="mb-0 h-70px border_radius_15">
                            <Form.Control
                                name=""
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
                        </InputGroup>
                    </div>
                    {/*  */}
                    <div className="row mt-4">
                        {SupportLoopArray.map((val) => {
                            return (
                                <SupportLoop
                                    key={val.key}
                                    title={val.title}
                                    title2={val.title2}
                                    text1={val.text1}
                                    text2={val.text2}
                                    avatar1={val.avatar1}
                                    avatar2={val.avatar2}
                                    noimage={val.noimage}
                                    noimage1={val.noimage1}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Support;
