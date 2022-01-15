import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Globalsettings from "../../Globalsettings";

// 
import vertical_bars from "../../../assets/images/vertical_bars.svg";
import editiconimg from "../../../assets/images/editiconimg.svg";
import viewdetailiconimg from "../../../assets/images/icon_17.svg";
import granttcharticonimg from "../../../assets/images/granttchart.svg";
import statisticsiconimg from "../../../assets/images/statistics.svg";
import archiveiconimg from "../../../assets/images/archive.svg";
import crossiconimg from "../../../assets/images/cross.svg";
import plusiconimg from "../../../assets/images/plusicon.svg";


const JobLoop = (props) => {
    var users = [];
    {
        props.members.map((val) => {
            users.push(val.user);
        })
    }
    return (
        <>
            <div className="col-xxl-3 col-xl-6 col-lg-12 mb-4">
                <div className="card-body card card_dashboard whitecolorbg pb-2">
                    <div className="d-flex align-items-center dropdown for_all">
                        <p className="fontsize14 m-0">{props.top_date}</p>
                        <NavLink to="#" className="ml-auto" data-bs-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                        <div className="dropdown-menu m-0 dropdown-menu-right">
                            <NavLink to={`${process.env.PUBLIC_URL}/view_projectdetails/`+props.id} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={viewdetailiconimg} alt="" /> View Details</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/view_projectdetails/`+props.id+'/gantt'} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={granttcharticonimg} alt="" /> Grantt Chart</NavLink>
                            <a href={Globalsettings.url+"api/gantt-chart/"+props.id} className="dropdown-item fontsize14" target="_blank"><img className="img-fluid mr-2" width="12" src={statisticsiconimg} alt="" /> Public Grantt Chart</a>
                        </div>
                    </div>
                    <div className="py-4 d-flex align-items-center">
                        <div>
                            <h4 className="mb-2"><NavLink to={"/view_projectdetails/"+props.id} className="fontsize22 mb-1 blackcolortext">{props.title}</NavLink></h4>
                            <small>{props.title_small}</small>
                            <span className={"d-flex justify-content-center mt-2 px-3 py-2 text-center fontsize12 fontweightmeduim border-radius-100 " + props.badge_bg}>{props.status}</span>
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
                                {users.length > 0 ?
                                users.map((val,index) => {
                                    return (
                                        <span className="m-minus-left-15 avatar" key={index}><img data-toggle="tooltip" data-original-title={val.name} className="img-fluid" width="35" src={val.image_url} alt="" /></span>
                                    )
                                })
                                :
                                <span>No Member Added Yet!</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobLoop;