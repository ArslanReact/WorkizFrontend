import React, { useState, useEffect } from 'react';
import Globalsettings from "../Globalsettings";
import axios from 'axios';
import { Nav, Form, FormLabel, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

// image import
import icon1 from "../../assets/images/website/icon_4.svg";
import icon2 from "../../assets/images/website/icon_5.svg";
import icon3 from "../../assets/images/website/icon_6.svg";
import twitter from "../../assets/images/website/twitter_vector.svg";
import linkedin from "../../assets/images/website/linkedin_vector.svg";
import fb from "../../assets/images/website/fb_vector.svg";
import youtube from "../../assets/images/website/youtube_vector.svg";

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [isLoading, setLoading] = useState(false);
    const[fname, setfname] = useState('');
    const[lname, setlname] = useState('');
    const[phone, setphone] = useState('');
    const[email, setemail] = useState('');
    const[msg, setmsg] = useState('');

    const SubmitForm = (evt) => {
        setLoading(true);
        axios.post(Globalsettings.url + 'api/contact/store', {
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            msg: msg
        }).then((response) => {
            toast.success("Thanks for contacting us. We will catch you soon.");
            setLoading(false);
            setfname('');
            setlname('');
            setphone('');
            setemail('');
            setmsg('');
        });
        evt.preventDefault();        
    }    
    return (
        <>
            <ToastContainer closeButton={true} position="top-right" />
            <LoadingOverlay active={isLoading} spinner text='Please Wait...' />
            <div className="top_banner py-5 text-center">
                <h5>Contact Us</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-11 mx-auto mb-5">
                    <div className="main_head text-center mb-xl-5">
                        <h4 className="">Feel free to contact us or just say hi!</h4>
                    </div>
                </div>
                {/*  */}
                <div className="col-10 col-xl-7 mx-auto">
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0 text-center">
                            <p><img className="img-fluid" src={icon1} alt="icon" /></p>
                            <p className="fontsize18 paragraph_grey1_text_color">Location</p>
                            <p className="fontsize24 drkblue_text_color fontweightbold">56 12th Ave, New York, NY 10011</p>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0 text-center">
                            <p><img className="img-fluid" src={icon2} alt="icon" /></p>
                            <p className="fontsize18 paragraph_grey1_text_color">Contact</p>
                            <p className="m-0"><Nav.Link href="mailto:easymanage@.come" className="fontsize24 p-0 drkblue_text_color fontweightbold">easymanage@.come</Nav.Link></p>
                            <p className="m-0"><Nav.Link href="tel:(779) 564-1593" className="fontsize24 p-0 drkblue_text_color fontweightbold">(779) 564-1593</Nav.Link></p>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0 text-center">
                            <p><img className="img-fluid" src={icon3} alt="icon" /></p>
                            <p className="fontsize18 paragraph_grey1_text_color">Social Media</p>
                            <p className="m-0 fontsize24 p-0 drkblue_text_color fontweightbold"> Follow on Social Media</p>
                            <p className="m-0 d-flex align-items-center soial">
                                <Nav.Link href="#" className="me-4 soial-link"><div className="tooltip_hvr drkblue_text_color">Twitter</div><img className="img-fluid" src={twitter} alt="Twitter" /></Nav.Link>
                                <Nav.Link href="#" className="me-4 soial-link"><div className="tooltip_hvr drkblue_text_color">linkedin</div><img className="img-fluid" src={linkedin} alt="Linkedin" /></Nav.Link>
                                <Nav.Link href="#" className="me-4 soial-link"><div className="tooltip_hvr drkblue_text_color">Facebook</div><img className="img-fluid" src={fb} alt="Facebook" /></Nav.Link>
                                <Nav.Link href="#" className="me-4 soial-link"><div className="tooltip_hvr drkblue_text_color">Youtube</div><img className="img-fluid" src={youtube} alt="Youtube" /></Nav.Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-5 paragraph_grey2_bg_color">
                <div className="col-10 col-xl-9 mx-auto">
                    <div className="main_head text-center mb-5">
                        <h4 className="">Get In Touch With US</h4>
                    </div>
                    {/*  */}
                    <Form onSubmit={SubmitForm} className="row mt-4">
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">First Name</FormLabel>
                                <Form.Control type="text" className="h-50px" name="" id="" required value={fname} onChange={(e) => setfname(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Last Name</FormLabel>
                                <Form.Control type="text" className="h-50px" name="" id="" required value={lname} onChange={(e) => setlname(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Email</FormLabel>
                                <Form.Control type="email" className="h-50px" name="" id="" required value={email} onChange={(e) => setemail(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col-xl-6 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Phone</FormLabel>
                                <Form.Control type="number" className="h-50px" name="" id="" required value={phone} onChange={(e) => setphone(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col-xl-12 col-lg-6 mb-4">
                            <Form.Group>
                                <FormLabel className="paragraph_grey1_text_color mb-2">Your Message</FormLabel>
                                <Form.Control type="text" as="textarea" rows={6} className="" name="" id="" required value={msg} onChange={(e) => setmsg(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col-12">
                            <Button variant="" type="submit" className="d-inline-block btnweb fontsize16 drkblue_text_color">Send Message</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ContactUs;
