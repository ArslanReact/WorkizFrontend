import React from 'react';
import { InputGroup, Form } from "react-bootstrap";

// import component
import SupportLoop from "../support/SupportLoop";

// image import
import avatar01 from "../../../assets/images/website/avatar_1.svg";
import avatar02 from "../../../assets/images/website/avatar_2.svg";

const Support = () => {
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
            title: "Getting Started",
            title2: "Getting started with EasyManage work flow",
            text1: "8 articles in this collection",
            text2: "Written by Topaz Eitan and Dan",
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
                <div className="col-10 col-xl-11 mx-auto">
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
