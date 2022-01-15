import React from 'react';
import { Nav } from "react-bootstrap";

// image import
import arrow from "../../../assets/images/website/arrow_left.svg";
import arrow2 from "../../../assets/images/website/arrow_right.svg";

const ApplyPage = () => {
    return (
        <>
            <div className="py-5">
                <div className="col-10 col-xl-9 mx-auto">
                    <Nav.Link href="/careers" className="p-0 fontsize18 blue_text_color d-flex align-items-center"><img className="me-2 img-fluid" src={arrow} alt="arrow" /> Back to all positions</Nav.Link>
                    {/*  */}
                    <div className="mt-5">
                        <h5 className="fontsize30 blue_text_color fontweightbold">Product Designer </h5>
                        <p className="fontsize20 paragraph_grey1_text_color">Permanent employee, Full-time ·</p>
                        <div className="mt-5">
                            <h5 className="fontsize20 drkblue_text_color fontweightbold mb-3">What Are We Looking For? </h5>
                            <p className="fontsize18 paragraph_grey1_text_color">An innovative start-up with an exciting product in the field service industry is looking to expand. We are looking for an outstanding multi-disciplinary development team lead. A highly motivated individual with strong communication & people skills, who is comfortable in a fast-paced and results-oriented start-up. You are expected to be a team player and passionate about technology and problem-solving.</p>
                            <h5 className="fontsize20 mt-5 drkblue_text_color fontweightbold mb-3">Your Profile </h5>
                            <ul className="list-unstyled">
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" /> Experience managing a team and leading projects hands-on from start to finish</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" /> 2+ years of proven management experience</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" /> Experience building web applications from scratch in a production environment</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Passion for both client-side and server-side development</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />At least 3+ years experience with modern client-side technologies such as Angular/ReactJs/Vue.js... </li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />3+ years experience with server-side technologies such as PHP/JAVA/NodeJs/Python/...</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Experience with both SQL/NoSQL</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Experience in Agile development methodologies</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Excellent communications skills</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Familiarity with Linux systems</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />BA in Computer Science, Software, Engineering, or equivalent</li>
                                <li className="paragraph_grey1_text_color fontsize18 mb-2"><img className="me-2 img-fluid" src={arrow2} alt="arrow" />Effective written and oral communication skills in Hebrew English</li>
                            </ul>
                            <h5 className="fontsize20 mt-5 drkblue_text_color fontweightbold mb-3">Why Us? </h5>
                            <p className="fontsize18 paragraph_grey1_text_color">At EasyManage we live on the growing edge and believe that growth trumps everything else. This growth mindset guides every decision we make at EasyManage, from our hiring to our client growth strategy, to our product development and our service culture.</p>
                            <h5 className="fontsize20 mt-5 drkblue_text_color fontweightbold mb-3">About Us </h5>
                            <p className="fontsize18 paragraph_grey1_text_color">Who We Are</p>
                            <p className="fontsize18 paragraph_grey1_text_color">Founded in 2017, EasyManage is a business software for small to medium-sized on-demand field service businesses, such as locksmith, junk removal, carpet cleaning, and appliance repair.  </p>
                            <p className="fontsize18 paragraph_grey1_text_color">With EasyManage, field service pros can grow their business by ditching antiquated business management methods such as pen and paper, Excel spreadsheets, and Google Calendar.</p>
                            <p className="fontsize18 paragraph_grey1_text_color">EasyManage provides an easy-to-use platform that allows them to manage their scheduling, invoicing, payment processing, phone systems, and more.</p>
                            <Nav.Link href="/apply_position" className="d-inline-block border_radius_10 py-3 px-4 fontsize18 fontweightbold mt-4 drkblue_text_color seablue_bg_color">Apply for this position</Nav.Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplyPage;
