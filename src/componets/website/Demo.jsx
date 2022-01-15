import React, { useState, useEffect } from 'react';
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { Nav, Modal, FormLabel, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import { NavLink } from "react-router-dom";
// images attached
import check from "../../assets/images/website/check_vector.svg";
import video_img from "../../assets/images/website/wallpaper_img.svg";

const Demo = () => {
    const [isLoading, setLoading] = useState(false);
    const[name, setname] = useState('');
    const[phone, setphone] = useState('');
    const[email, setemail] = useState('');
    const[company, setcompany] = useState('');
    const[industory, setindustory] = useState('');
    const[companysize, setcompanysize] = useState('');
    const[date, setdate] = useState('');
    const[time, settime] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [navbarModolTask, setnavbarModolTask] = React.useState(false);
    const SubmitForm = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/demo/store', {
            name: name,
            phone: phone,
            email: email,
            company: company,
            industory: industory,
            companysize: companysize,
            datedata: date,
            timedata: time
        }).then((response) => {
            toast.success("Thank you for your message. It has been sent.");
            setLoading(false);
            setname('');
            setemail('');
            setphone('');
            setcompany('');
            setindustory('');
            setcompanysize('');
            setdate('');
            settime('');
        });
        evt.preventDefault();        
    }
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="top_banner py-5 text-center">
                <h5>Demo</h5>
            </div>
            {/*  */}
            <div className="pt-5 pricing_content">
                <div className="col-10 col-xl-10 col-lg-11 mx-auto">
                    <div className="main_head text-center mb-4">
                        <h4>Is Easy Manage Right For Your Business?</h4>
                        <p>The all-in-one solution for service professionals. Providing you with all the business tools you need.</p>
                    </div>
                    {/*  */}
                    <ul className="list-unstyled d-flex align-items-center row justify-content-between">
                        <li className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <Nav.Item className="border_radius_10 d-flex py-3 align-items-center justify-content-center paragraph_grey2_bg_color">
                                <h5 className="m-0 drkblue_text_color fontsize18"><img className="me-2 img-fluid" src={check} alt="check" />Easily Manage Your Team</h5>
                            </Nav.Item>
                        </li>
                        <li className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <Nav.Item className="border_radius_10 d-flex py-3 align-items-center justify-content-center paragraph_grey2_bg_color">
                                <h5 className="m-0 drkblue_text_color fontsize18"><img className="me-2 img-fluid" src={check} alt="check" />Quickly Increase Your Revenue</h5>
                            </Nav.Item>
                        </li>
                        <li className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <Nav.Item className="border_radius_10 d-flex py-3 align-items-center justify-content-center paragraph_grey2_bg_color">
                                <h5 className="m-0 drkblue_text_color fontsize18"><img className="me-2 img-fluid" src={check} alt="check" />Effortlessly Win Repeat Customers</h5>
                            </Nav.Item>
                        </li>
                    </ul>
                    {/*  */}
                    <div className="col-7 col-xl-9 mx-auto mt-5">
                        <div className="border_radius_30 position-relative paragraph_grey2_bg_color overflow-hidden">
                            <NavLink class="video-play-button" to="#" onClick={() => setnavbarModolTask(true)}><span></span></NavLink>
                            <img className="img-fluid w-100" src={video_img} alt="video_img" />
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="pt-5 pb-5">
                <div className="d-flex row gx-0">
                    <div className="col-xxl-9 col-lg-9 border-radius-15  mx-auto paragraph_grey2_bg_color">
                        <div className="card-body p-5 h-100">
                            <div className="main_head text-center mb-xl-5">
                                <h4 className="">Schedule a Demo Request</h4>
                            </div>
                            {/*  */}
                            <Form onSubmit={SubmitForm} className="row mt-4">
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Your Name</FormLabel>
                                        <Form.Control type="text" className="h-50px" name="" id="" placeholder="Your name" required value={name} onChange={(e) => setname(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Phone Number</FormLabel>
                                        <Form.Control type="number" className="h-50px" name="" id="" placeholder="Number" required value={phone} onChange={(e) => setphone(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Email Address</FormLabel>
                                        <Form.Control type="email" className="h-50px" name="" id="" placeholder="Your Email" required value={email} onChange={(e) => setemail(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Company Name</FormLabel>
                                        <Form.Control type="text" className="h-50px" name="" id="" placeholder="Company" required value={company} onChange={(e) => setcompany(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Industry</FormLabel>
                                        <Form.Select className="h-50px" aria-label="Default select example" required value={industory} onChange={(e) => setindustory(e.target.value)}>
                                            <option value="">Select Industry</option>
                                            <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                                            <option value="Alarm & Security">Alarm & Security</option>
                                            <option value="Appliance Repair">Appliance Repair</option>
                                            <option value="Carpet Cleaning">Carpet Cleaning</option>
                                            <option value="Computer Repair">Computer Repair</option>
                                            <option value="Construction">Construction</option>
                                            <option value="Electrician">Electrician</option>
                                            <option value="Garage Door">Garage Door</option>
                                            <option value="Handyman">Handyman</option>
                                            <option value="HVAC">HVAC</option>
                                            <option value="Installation">Installation</option>
                                            <option value="IT Services">IT Services</option>
                                            <option value="Junk Removal">Junk Removal</option>
                                            <option value="Landscaping">Landscaping</option>
                                            <option value="Lawn Car">Lawn Car</option>
                                            <option value="Locksmiths">Locksmiths</option>
                                            <option value="Maid & Cleaning">Maid & Cleaning</option>
                                            <option value="Moving">Moving</option>
                                            <option value="Painting">Painting</option>
                                            <option value="Pest Control">Pest Control</option>
                                            <option value="Plumbing">Plumbing</option>
                                            <option value="Pressure Washing">Pressure Washing</option>
                                            <option value="Property Mainten">Property Mainten</option>
                                            <option value="Roofing">Roofing</option>
                                            <option value="Snow Removal">Snow Removal</option>
                                            <option value="Towing">Towing</option> 
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Compny Size</FormLabel>
                                        <Form.Select className="h-50px" aria-label="Default select example" required value={companysize} onChange={(e) => setcompanysize(e.target.value)}>
                                            <option value="">Select Compay Size</option>
                                            <option value="1">Just me</option>
                                            <option value="2_5">2 - 5 people</option>
                                            <option value="6_10">6 - 10 people</option>
                                            <option value="11+">11 or More</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-xl-12 col-lg-12 mb-4">
                                    <h4 className="m-0 fontsize20 drkblue_text_color fontweightbold">What time works best for you?</h4>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Date</FormLabel>
                                        <Form.Control type="date" className="h-50px" name="" id="" required value={date} onChange={(e) => setdate(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Time</FormLabel>
                                        <Form.Control type="time" className="h-50px" name="" id="" required value={time} onChange={(e) => settime(e.target.value)} />
                                    </Form.Group>
                                </div>
                                <div className="col-12">
                                    <Button variant="" type="submit" className="d-inline-block btnweb fontsize16 drkblue_text_color">Schedule a Demo</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            {/* task categor */}
            <MyVerticallyCenteredModalnavbarModol
                show={navbarModolTask}
                onHide={() => setnavbarModolTask(false)}
            />
        </>
    )
}

export default Demo;
// drag filter modal
function MyVerticallyCenteredModalnavbarModol(props) {
    return (
        <>
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" className="navbarModol" centered>
                <Modal.Header closeButton className="p-0 d-flex align-items-center">
                    <Modal.Title id="contained-modal-title-vcenter">Video</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">Video</Modal.Body>
            </Modal>
        </>
    );
}
