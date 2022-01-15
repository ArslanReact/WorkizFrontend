import React from 'react';
import { Nav, Form, FormLabel, Button } from "react-bootstrap";

// image import
import arrow from "../../../assets/images/website/arrow_left.svg";

const ApplyPosition = () => {
    return (
        <>
            <div className="py-5">
                <div className="col-10 col-xl-9 mx-auto">
                    <Nav.Link href="/careers" className="p-0 fontsize18 blue_text_color d-flex align-items-center"><img className="me-2 img-fluid" src={arrow} alt="arrow" /> Back to all positions</Nav.Link>
                    <div className="mt-5">
                        <h5 className="fontsize30 blue_text_color fontweightbold">Product Designer </h5>
                        <p className="fontsize20 paragraph_grey1_text_color">Permanent employee, Full-time</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-5 paragraph_grey2_bg_color">
                <div className="col-10 col-xl-9 mx-auto">
                    <h5 className="fontsize20 drkblue_text_color fontweightbold">we are looking forward to hearing from you</h5>
                    <p className="fontsize16 paragraph_grey1_text_color">Thank you for your interest in EasyManage. Please fill out the following short form.</p>
                    {/*  */}
                    <Form className="row mt-4">
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">First Name</FormLabel>
                                <Form.Control type="text" className="h-50px" name="" id="" placeholder="Your name" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Last Name</FormLabel>
                                <Form.Control type="text" className="h-50px" name="" id="" placeholder="Last name" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Last Name</FormLabel>
                                <Form.Control type="email" className="h-50px" name="" id="" placeholder="Your Email" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Phone</FormLabel>
                                <Form.Control type="number" className="h-50px" name="" id="" placeholder="Number" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Available From</FormLabel>
                                <Form.Control type="number" className="h-50px" name="" id="" placeholder="00" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Expected Salary</FormLabel>
                                <Form.Control type="number" className="h-50px" name="" id="" placeholder="00" />
                            </Form.Group>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <h5 className="fontsize20 drkblue_text_color fontweightbold">Documents</h5>
                            <p className="fontsize16 paragraph_grey1_text_color">Please upload your CV (max. 20 MB in total).</p>
                        </div>
                        <div className="col-xl-12 col-lg-12 mb-4">
                            <div className="d-flex align-items-center">
                                <Form.Check type="checkbox" label="" />
                                <FormLabel className="ms-2 mb-0">I hereby confirm that I have read and understood the <strong className="blue_text_color">Data privacy statement</strong>.</FormLabel>
                            </div>
                        </div>
                        <div className="col-12">
                            <Button variant="" type="button" className="d-inline-block btnweb fontsize16 drkblue_text_color">Schedule a Demo</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ApplyPosition;
