import React from 'react';
import { Accordion } from "react-bootstrap";
// componet import
import FaqLoop from "../faq/FaqLoop";

// images import
import avatar_01 from "../../../assets/images/website/avatar_1.svg";

const Faq = () => {
    const FaqLoopArray = [
        {
            key: "0",
            title: "How to set up two-factor authentication (2FA)",
            avatar: avatar_01,
            paragraph: "Lorem ipsum",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Faq</h5>
            </div>
            {/*  */}
            <div className="py-5 faq">
                <div className="col-10 col-xl-9 mx-auto">
                    <Accordion defaultActiveKey="0">
                        {FaqLoopArray.map((val) => {
                            return (
                                <FaqLoop
                                    key={val.key}
                                    title={val.title}
                                    avatar={val.avatar}
                                    paragraph={val.paragraph}
                                    designation={val.designation}
                                    time={val.time}
                                />
                            )
                        })}
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default Faq;
