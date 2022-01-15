import React from 'react';
import { Form, Col, Row, Button, FormLabel, NavItem, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// impges import
import videoicon from "../../assets/images/website/videoicon.svg";
import timeicon from "../../assets/images/website/timeicon.svg";
import frameicon1 from "../../assets/images/website/frameicon1.svg";
import frameicon2 from "../../assets/images/website/frameicon2.svg";
import frameicon3 from "../../assets/images/website/frameicon3.svg";
import frameicon4 from "../../assets/images/website/frameicon4.svg";
import arrowsmall from "../../assets/images/website/arrowsmall.svg";
import arrowsmallsea from "../../assets/images/website/arrowsmallsea.svg";
import circlearrowdarkblue from "../../assets/images/website/circlearrowdarkblue.svg";
import circlearrowdarkseablue from "../../assets/images/website/circlearrowdarkseablue.svg";
import screen_702 from "../../assets/images/website/screen_702.svg";
import vectorline1 from "../../assets/images/website/vectorline1.svg";
import vectorline2 from "../../assets/images/website/vectorline2.svg";
import vectorline3 from "../../assets/images/website/vectorline3.svg";

const Academies = () => {
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Academy</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="text-center mb-3">
                        <h5 className="mb-3 fontsize42 fontweightbold text-center drkblue_text_color">Welcome to the Easy Manage</h5>
                        <p className="fontsize18 paragraph_blue_text_color">Whether you’re just getting started, or you’ve been using EasyManage for some time, here you’ll find the resources you need to become a EasyManage pro in just a few steps. </p>
                    </div>
                    <Col xl={6} className="mx-auto mb-5">
                        <div className="text-center d-flex justify-content-between">
                            <Form.Group className="d-flex align-items-center" controlId="formBasicCheckmanager">
                                <Form.Check type="radio" aria-label=" I’m an owner / manager" />
                                <FormLabel className="m-0 ms-2 fontweightbold blue_text_color fontsize18">I’m an owner / manager</FormLabel>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center" controlId="formBasicChecktechnician">
                                <Form.Check type="radio" aria-label=" I’m a technician" />
                                <FormLabel className="m-0 ms-2 fontweightbold blue_text_color fontsize18">I’m a technician</FormLabel>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center" controlId="formBasicCheckdispatcher">
                                <Form.Check type="radio" aria-label=" I’m a dispatcher" />
                                <FormLabel className="m-0 ms-2 fontweightbold blue_text_color fontsize18">I’m a dispatcher</FormLabel>
                            </Form.Group>
                        </div>
                    </Col>
                    {/*  */}
                    <div className="text-center">
                        <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="seablue_bg_color btn">Get Started</NavLink>
                    </div>
                </div>
            </div>
            <div className="acadmey">
                <div className="text-center screen_absolute"><img className="img-fluid" src={screen_702} alt="icon" /></div>
                <Col xl={9} lg={10} className="col-10 mx-auto">
                    <Row className="align-items-center">
                        <Col xl={5} lg={12}>
                            <small className="fontsize18 body_text_color">First Time</small>
                            <h4 className="fontweightbolder fontsize38 seablue_text_color"> Getting Started with EasyManage</h4>
                            <div className="d-flex align-items-center">
                                <p className="m-0 fontsize14 body_text_color me-4"><img className="img-fluid me-2" src={videoicon} alt="icon" />7 Videos</p>
                                <p className="m-0 fontsize14 body_text_color"><img className="img-fluid me-2" src={timeicon} alt="icon" />28 min</p>
                            </div>
                            <p className="py-4"><img width="200" className="img-fluid" src={frameicon1} alt="icon" /></p>
                            <p className="fontsize18 body_text_color">This is where you’ll learn all the fundamentals, and how Workiz can help you streamline your business, as we go through your daily workflow:</p>
                            <div className="py-4">
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Getting jobs by phone, text message, or website</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> EasyManage’s Online Booking</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> EasyManage’s Service Chatbot</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Scheduling and managing jobs</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Sending estimates and invoices</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Getting paid online</NavItem>
                            </div>
                            <p className="fontsize18 body_text_color">We highly recommend finishing this section before moving on to any of the advanced lessons.</p>
                            <NavLink to="#" className="seablue_text_color d-flex align-items-center fontsize18 text-decoration-underline">Start Step 1 <img className="img-fluid ms-2" src={arrowsmallsea} alt="icon" /></NavLink>
                        </Col>
                        <Col xl={7} lg={12} className="d-none d-xl-block"><img className="img-fluid" src={vectorline1} alt="icon" /></Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl={6} lg={12} className="d-none d-xl-block"><img className="img-fluid" src={vectorline2} alt="icon" /></Col>
                        <Col xl={6} lg={12}>
                            <small className="fontsize18 body_text_color">Second Step</small>
                            <h4 className="fontweightbolder fontsize38 seablue_text_color"> Setting Things Up</h4>
                            <div className="d-flex align-items-center">
                                <p className="m-0 fontsize14 body_text_color me-4"><img className="img-fluid me-2" src={videoicon} alt="icon" />10 Videos</p>
                                <p className="m-0 fontsize14 body_text_color"><img className="img-fluid me-2" src={timeicon} alt="icon" />36 min</p>
                            </div>
                            <p className="py-4"><img width="200" className="img-fluid" src={frameicon2} alt="icon" /></p>
                            <p className="fontsize18 body_text_color">In this course, you’ll discover how to:</p>
                            <div className="py-4">
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Customize your job form to reflect your workflow and the services you provide</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Create and send your clients branded invoices, estimates, and personalized notifications</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Stay organized by adding teammates, using job tags, and setting invoice line items</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Get more clients by setting up Workiz Service Chatbot and Online Booking Widget</NavItem>
                            </div>
                            <NavLink to="#" className="seablue_text_color d-flex align-items-center fontsize18 text-decoration-underline">Start Step 2 <img className="img-fluid ms-2" src={arrowsmallsea} alt="icon" /></NavLink>
                        </Col>
                    </Row>
                    <Row className="align-items-center">
                        <Col xl={5} lg={12}>
                            <small className="fontsize18 body_text_color">Third Step</small>
                            <h4 className="fontweightbolder fontsize38 seablue_text_color"> Improve Your Business Communication with EasyManage Service Phone</h4>
                            <div className="d-flex align-items-center">
                                <p className="m-0 fontsize14 body_text_color me-4"><img className="img-fluid me-2" src={videoicon} alt="icon" />5 Videos</p>
                                <p className="m-0 fontsize14 body_text_color"><img className="img-fluid me-2" src={timeicon} alt="icon" />18 min</p>
                            </div>
                            <p className="py-4"><img width="400" className="img-fluid" src={frameicon3} alt="icon" /></p>
                            <p className="fontsize18 body_text_color">Learn how to set up EasyManage’s built-in phone system and manage all of your jobs and calls from one platform. </p>
                            <div className="py-4">
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Never miss a call with EasyManage’s integrated Service Phone</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Save dispatchers' time by avoiding multiple platforms</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Ensure your techs are giving great customer service in the field with Call Masking and Call Recording</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Optimize your advertising budget with Call Tracking</NavItem>
                            </div>
                            <NavLink to="#" className="seablue_text_color d-flex align-items-center fontsize18 text-decoration-underline">Start Step 3 <img className="img-fluid ms-2" src={arrowsmallsea} alt="icon" /></NavLink>
                        </Col>
                        {/* <Col xl={7} lg={12} className="d-none d-xl-block"><img className="img-fluid" src={vectorline3} alt="icon" /></Col> */}
                    </Row>
                    <Row className="align-items-center">
                        <Col xl={6} lg={12} className="d-none d-xl-block"><img className="img-fluid" src={vectorline3} alt="icon" /></Col>
                        <Col xl={6} lg={12}>
                            <small className="fontsize18 body_text_color">Fourth Step</small>
                            <h4 className="fontweightbolder fontsize38 seablue_text_color"> Supercharge Your Business with Powerful Apps & Integrations</h4>
                            <div className="d-flex align-items-center">
                                <p className="m-0 fontsize14 body_text_color me-4"><img className="img-fluid me-2" src={videoicon} alt="icon" />4 Videos</p>
                                <p className="m-0 fontsize14 body_text_color"><img className="img-fluid me-2" src={timeicon} alt="icon" />12 min</p>
                            </div>
                            <p className="py-4"><img width="200" className="img-fluid" src={frameicon4} alt="icon" /></p>
                            <p className="fontsize18 body_text_color">Connect EasyManage with all your favorite tools so that you can manage everything in one place.</p>
                            <div className="py-4">
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Build customer loyalty</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Keep your accounting up-to-date</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Track your team members and inventory</NavItem>
                                <NavItem className="fontsize16 py-2 body_text_color"><img className="img-fluid me-2" src={arrowsmall} alt="icon" /> Manage franchises across multiple locations</NavItem>
                            </div>
                            <NavLink to="#" className="seablue_text_color d-flex align-items-center fontsize18 text-decoration-underline">Start Step 4 <img className="img-fluid ms-2" src={arrowsmallsea} alt="icon" /></NavLink>
                        </Col>
                    </Row>
                    <Row className="pt-5 mt-5 align-items-center">
                        <Col xl={6} lg={12}>
                            <Card.Body className="light2blue_bg_color d-flex align-items-center border_radius_10 p-4">
                                <div>
                                    <h4 className="fontsize34 body_text_color fontweightbold">Tech Training</h4>
                                    <p className="m-0 body_text_color fontsize18">Discover the technician's workflow on the app</p>
                                </div>
                                <NavLink to="#" className="ms-auto"><img className="img-fluid" src={circlearrowdarkblue} alt="icon" /></NavLink>
                            </Card.Body>
                        </Col>
                        <Col xl={6} lg={12}>
                            <Card.Body className="light2blue_bg_color d-flex align-items-center border_radius_10 p-4">
                                <div>
                                    <h4 className="fontsize34 body_text_color fontweightbold">Dispatcher Training</h4>
                                    <p className="m-0 body_text_color fontsize18">Discover the dispatcher's workflow</p>
                                </div>
                                <NavLink to="#" className="ms-auto"><img className="img-fluid" src={circlearrowdarkseablue} alt="icon" /></NavLink>
                            </Card.Body>
                        </Col>
                    </Row>
                </Col>
            </div>
        </>
    )
}

export default Academies;