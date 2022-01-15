import React from 'react';
import { Nav, Modal, FormLabel, Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// images attached
import check from "../../assets/images/website/check_vector.svg";
import video_img from "../../assets/images/website/wallpaper_img.svg";

const Demo = () => {
    const [navbarModolTask, setnavbarModolTask] = React.useState(false);
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Demo</h5>
            </div>
            {/*  */}
            <div className="pt-5 pricing_content">
                <div className="col-10 col-xl-11 mx-auto">
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
            <div className="pt-5 pb-5 h-100">
                <div className="d-flex row gx-0 h-100">
                    <div className="col-xl-6 blue_bg_color d-none d-xl-block h-100">
                        <div className="card-body p-5">zxc</div>
                    </div>
                    <div className="col-xl-6 paragraph_grey2_bg_color h-100">
                        <div className="card-body p-5">
                            <div className="main_head text-center mb-xl-5">
                                <h4 className="">Schedule a Demo Request</h4>
                            </div>
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
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Phone Number</FormLabel>
                                        <Form.Control type="number" className="h-50px" name="" id="" placeholder="Number" />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Email Address</FormLabel>
                                        <Form.Control type="email" className="h-50px" name="" id="" placeholder="Your Email" />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Company Name</FormLabel>
                                        <Form.Control type="text" className="h-50px" name="" id="" placeholder="Company" />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Industry</FormLabel>
                                        <Form.Select className="h-50px" aria-label="Default select example">
                                            <option>Select Industry</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Compny Size</FormLabel>
                                        <Form.Select className="h-50px" aria-label="Default select example">
                                            <option>Sekect Compay Size</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-xl-12 col-lg-12 mb-4">
                                    <h4 className="m-0 fontsize20 drkblue_text_color fontweightbold">What time works best for you?</h4>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Date</FormLabel>
                                        <Form.Control type="date" className="h-50px" name="" id="" placeholder="DD/MM/YY" />
                                    </Form.Group>
                                </div>
                                <div className="col-xl-6 col-lg-6 mb-4">
                                    <Form.Group>
                                        <FormLabel className="paragraph_grey1_text_color mb-2">Hour</FormLabel>
                                        <Form.Select className="h-50px" aria-label="Default select example">
                                            <option>Time</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className="col-12">
                                    <Button variant="" type="button" className="d-inline-block btnweb fontsize16 drkblue_text_color">Schedule a Demo</Button>
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
