import React from 'react';
import { NavLink } from "react-router-dom";

// images attached
import questionmark from "../../../assets/images/website/questionmark_vector.svg";
import checkicon from "../../../assets/images/website/check_seablue_vector.svg";

const YearlyLoop = (props) => {
    return (
        <>
            <div className="col-xl-5 ps-xl-5 col-lg-6">
                <div className="card card-body p-3 p-xl-5 border_radius_30 h-100 text-center">
                    <h5 className="">Perofessional</h5>
                    <p>For Established Service Businesses</p>
                    <p><small className="seablue_text_color fontweightbold fontsize20">$</small> <strong className="price">{props.price}</strong> <small className="drkblue_text_color fontweightbold fontsize20">/Yearly</small></p>
                    <hr />
                    <div>Up to 15 Pro Users <span className="ms-2"><NavLink to="#" className="mytooltip">
                        <div className="tooltip_content5">Lorem Ipsum</div>
                        <img className="img-fluid" src={questionmark} alt="questionmark" />
                    </NavLink></span></div>
                    <p className="drkblue_text_color fontweightmeduim"><img className="me-2 img-fluid" src={checkicon} alt="check" />Phone, Chat and Email support</p>
                    <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btn btnweb mt-3">Get Started</NavLink>
                </div>
            </div>
        </>
    )
}

export default YearlyLoop;
