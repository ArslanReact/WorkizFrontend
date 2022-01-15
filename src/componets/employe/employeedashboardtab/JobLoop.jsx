import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


// 
import vertical_bars from "../../assets/images/vertical_bars.svg";
import editiconimg from "../../assets/images/editiconimg.svg";
import viewdetailiconimg from "../../assets/images/icon_17.svg";
import granttcharticonimg from "../../assets/images/granttchart.svg";
import statisticsiconimg from "../../assets/images/statistics.svg";
import archiveiconimg from "../../assets/images/archive.svg";
import crossiconimg from "../../assets/images/cross.svg";
import plusiconimg from "../../assets/images/plusicon.svg";


const JobLoop = (props) => {
    return (
        <>
            <div className="col-xl-3 col-lg-6 mb-4">
                <div className="card-body card card_dashboard whitecolorbg pb-2">
                    <div className="d-flex align-items-center dropdown for_all">
                        <p className="fontsize14 m-0">{props.top_date}</p>
                        <NavLink to="#" className="ml-auto" data-bs-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                        <div className="dropdown-menu m-0 dropdown-menu-right">
                            <NavLink to={`${process.env.PUBLIC_URL}/edit`} className="dropdown-item fontsize14"><img className="img-fluid mr-2" src={editiconimg} alt="" /> Edit</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={viewdetailiconimg} alt="" /> View Details</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/grantt_chart`} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={granttcharticonimg} alt="" /> Grantt Chart</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/Public_grantt_chart`} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={statisticsiconimg} alt="" /> Public Grantt Chart</NavLink>
                            <NavLink onClick={() => sweattest(true)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={archiveiconimg} alt="" /> Archive</NavLink>
                            <NavLink onClick={() => sweatdelete(true)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={crossiconimg} alt="" /> Delete</NavLink>
                        </div>
                    </div>
                    <div className="py-4 d-flex align-items-center">
                        <div>
                            <h4 className="mb-2"><NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="fontsize22 mb-1 blackcolortext">{props.title}</NavLink></h4>
                            <small>{props.title_small}</small>
                            <span className={"d-flex justify-content-center mt-2 px-3 py-2 text-center fontsize12 fontweightmeduim border-radius-100 " + props.badge_bg}>{props.badge_text}</span>
                        </div>
                        <div className="ml-auto w-100px">
                            <CircularProgressbar
                                value={props.percentage_update}
                                text={`${props.percentage_update}%`}
                                styles={buildStyles({
                                    rotation: 0.50,
                                    strokeLinecap: 'butt',
                                    textSize: '18px',
                                    fontWeight: 'bold',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(${props.pathcolor}, ${props.percentage_update / 10})`,
                                    textColor: `${props.text_color}`,
                                    trailColor: `${props.tailbgcolor}`,
                                })}
                            />
                        </div>
                    </div>
                    <div className="card-footer d-flex align-items-center py-2 px-0">
                        <div className="d-flex align-items-center">
                            <div className="d-inline-flex">
                                <span className=""><img className="img-fluid" width="35" src={props.avatariconimg_01} alt="" /></span>
                                <span className="m-minus-left-15"><img className="img-fluid" width="35" src={props.avatariconimg_02} alt="" /></span>
                                <span className="m-minus-left-15"><img className="img-fluid" width="35" src={props.avatariconimg_03} alt="" /></span>
                            </div>
                            <NavLink to={`${process.env.PUBLIC_URL}/add_job_member`} className="ml-2 blusecolorbg border-radius-100 w-30px h-30px text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink>
                        </div>
                        <div className="ml-auto"><span className={"px-3 py-1 fontsize14 border-radius-100 " + props.bg_color}>{props.weekly_text}</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobLoop;

// 
function sweattest() {
    swal({
        title: "Are you sure that you want to create the credit note?",
        text: "When creating credit note from non paid invoice, the credit note amount will get applied for this invoice.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}
// 
function sweatdelete() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover the deleted recurring invoice!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}