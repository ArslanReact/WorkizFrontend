import React from 'react';
// import ProgressBar from "../../../../node_modules/bootstrap-progress-bar";
import { ProgressBar } from 'react-bootstrap';

const F_Estimate_Overview = (props) => {
    return (
        <>

            <li className="d-flex align-items-center">
                <div className={"mr-auto " + props.btn_img_1}><img className="img-fluid" src={props.btn_img} alt={props.btn_img_alt} /></div>
                <div className="w-100 ml-4 progressBar">
                    <span className="mb-2 d-block fontsize14 fontweightmeduim">{props.progress_heading}</span>
                    <ProgressBar variant={" " + props.variant} className={" " + props.color_progress} now={props.now_update} />
                    <div className="d-flex align-items-center mt-2">
                        <span className="mr-auto fontsize14">{props.draft_update}</span>
                        <span className="fontsize14">{props.progress_update}</span>
                    </div>
                </div>
            </li>
        </>
    )
}

export default F_Estimate_Overview;
