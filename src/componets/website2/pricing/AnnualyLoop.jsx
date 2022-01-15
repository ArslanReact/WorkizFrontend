import React from 'react';
import { NavLink } from "react-router-dom";

// images attached
import questionmark from "../../../assets/images/website/questionmark_vector.svg";

const AnnualyLoop = (props) => {
    return (
        <>
            <div className="col-xl-4 col-lg-12 mb-5 mb-lg-0">
                <div className="card card-body p-3 p-xl-5 border_radius_30 h-100 text-center">
                    <div className={"most " + props.none}>{props.most}</div>
                    <h5 className="">{props.packagename}</h5>
                    <p><small className="seablue_text_color fontweightbold fontsize20">$</small> <strong className="price">{props.price}</strong> <small className="drkblue_text_color fontweightbold fontsize20">/Month</small></p>
                    <hr />
                    <div className="mb-4">Up to 2 Pro Users <span className="ms-2"><NavLink to="#" className="mytooltip">
                        <div className="tooltip_content5">Lorem Ipsum</div>
                        <img className="img-fluid" src={questionmark} alt="questionmark" />
                    </NavLink></span></div>
                    <p class="mb-0">Billed Annualy</p>
                </div>
            </div>
        </>
    )
}

export default AnnualyLoop;
