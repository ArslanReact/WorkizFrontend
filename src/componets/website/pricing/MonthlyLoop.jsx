import React from 'react';
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

// images attached
import questionmark from "../../../assets/images/website/questionmark_vector.svg";
import check from "../../../assets/images/website/check_vector.svg";
// import checkicon from "../../../assets/images/website/check_seablue_vector.svg";

const MonthlyLoop = (props) => {
    return (
        <>
        {props.packagename !== 'Starter' && 
            <div className="col-xl-4  col-lg-6 mb-5 mb-xl-0">
                <Card className="border_radius_30 text-center h-100 overflow-auto">
                    <Card.Body className='px-3 py-4'>
                        {props.packagename === 'Medium' && <div className={"most " + props.none}>{props.most}</div>}
                        {/* <div className={"most " + props.none}>{props.most}</div> */}
                        <h5 className="">{props.packagename}</h5>
                        <div>
                            <p className="fontsize16">{props.description}</p>
                        </div>
                        <p><small className="seablue_text_color fontweightbold fontsize18">$</small> <strong className="price fontsize30">{props.price}</strong> <small className="drkblue_text_color fontweightbold fontsize20">/MO</small></p>
                    </Card.Body>
                    <Card.Footer className="py-4 body_bg_color">
                            <div className="mb-4">Up to {props.maxuser} Pro Users <span className="ms-2"><NavLink to="#" className="mytooltip">
                                <div className="tooltip_content5">Lorem Ipsum</div>
                                <img className="img-fluid" src={questionmark} alt="questionmark" />
                            </NavLink></span></div>
                            <p class="mb-0 fontsize18"><img src={check} width="25"  alt="" /> Chat & Email Support</p>
                            <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb mt-3">Free Trail</NavLink>
                        </Card.Footer>
                </Card>
            </div>
        }
        </>
    )
}

export default MonthlyLoop;
