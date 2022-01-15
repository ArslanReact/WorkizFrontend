import React, { useEffect } from 'react';
import { Accordion } from "react-bootstrap";
// componet import
import FaqLoop from "../faq/FaqLoop";

// images import
import avatar_01 from "../../../assets/images/website/avatar_1.svg";

const Faq = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // FaqLoopArray
    const FaqLoopArray = [
        {
            key: "0",
            title: "What is EasyManage?",
            avatar: avatar_01,
            paragraph: "EasyManage is a simple and easy-to-use Service management software that aids businesses to manage and organizing their processes. It is embedded with advanced technology that allows users to schedule, assign, create invoices, send payments, and communicate with clients.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "0",
        },
        {
            key: "1",
            title: "How much does it cost?",
            avatar: avatar_01,
            paragraph: "EasyManage is a simple and easy-to-use Service management software that aids businesses to manage and organizing their processes. It is embedded with advanced technology that allows users to schedule, assign, create invoices, send payments, and communicate with clients.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "1",
        },
        {
            key: "2",
            title: "How long does it take to set up EasyManage?",
            avatar: avatar_01,
            paragraph: "EasyManage is a simple software to start with. The user does not have to download or install anything on his computer. Just create an account on EasyManage and start your business tasks.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "2",
        },
        {
            key: "3",
            title: "Can I use any mobile device to access my EasyManage account?",
            avatar: avatar_01,
            paragraph: "EasyManage is mobile-friendly software. The user can access their account from any device.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "3",
        },
        {
            key: "4",
            title: "How do I pay?",
            avatar: avatar_01,
            paragraph: "Our payment cycle starts on the 1st of every month. The customer can choose to pay either by Debit or Credit card.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "4",
        },
        {
            key: "5",
            title: "Do I need to sign any contract?",
            avatar: avatar_01,
            paragraph: "There is no need to sign a contract. You can start using EasyManage by simply subscribing to a plan. The user has the right to cancel the subscription anytime.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "5",
        },
        {
            key: "6",
            title: "Do I need to sign any contract?",
            avatar: avatar_01,
            paragraph: "There is no need to sign a contract. You can start using EasyManage by simply subscribing to a plan. The user has the right to cancel the subscription anytime.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "6",
        },
        {
            key: "7",
            title: "I’m not a techie person, will I have a hard time using your software?",
            avatar: avatar_01,
            paragraph: "No, our software is user-friendly. You can easily use this software.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "7",
        },
        {
            key: "8",
            title: "Can I import my client’s data to your software?",
            avatar: avatar_01,
            paragraph: "Yes, you can import your customer's data via MS Excel files.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "8",
        },
        {
            key: "9",
            title: "Do I need to give user login to all my technicians?",
            avatar: avatar_01,
            paragraph: "EasyManage is software that provides you the facility of creating technicians without giving them credentials. The employer can communicate with his employees via text or email.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "9",
        },
        {
            key: "10",
            title: "How secure is EasyManage?",
            avatar: avatar_01,
            paragraph: "EasyManage is a secure software that uses SSL Encryption. SSL Encryption is also used by many successful sites such as Amazon, Netflix, eBay, and others. With Google Cloud Platform, we offer you a top network of data centers to store your data.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "10",
        },
        {
            key: "11",
            title: "Can EasyManage integrate with QuickBooks Online?",
            avatar: avatar_01,
            paragraph: "EasyManage can seamlessly work with QuickBooks Online. The software can sync clients, employees, items, services, payments, proposals, and invoice data into your QuickBooks account.",
            designation: "Written by Jonny White",
            time: "12 apr, 2020",
            keyevent: "11",
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
                                    keyevent={val.keyevent}
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
