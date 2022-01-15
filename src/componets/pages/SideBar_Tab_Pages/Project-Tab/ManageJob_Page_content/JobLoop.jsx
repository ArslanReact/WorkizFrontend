import React from 'react';
import swal from 'sweetalert';
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Globalsettings from "../../../../Globalsettings";

// 
import vertical_bars from "../../../../../assets/images/vertical_bars.svg";
import editiconimg from "../../../../../assets/images/editiconimg.svg";
import viewdetailiconimg from "../../../../../assets/images/icon_17.svg";
import granttcharticonimg from "../../../../../assets/images/granttchart.svg";
import statisticsiconimg from "../../../../../assets/images/statistics.svg";
import archiveiconimg from "../../../../../assets/images/archive.svg";
import crossiconimg from "../../../../../assets/images/cross.svg";
import plusiconimg from "../../../../../assets/images/plusicon.svg";
import dateFormat from 'dateformat';

const JobLoop = (props) => {
    var users = [];
    {
        props.members.map((val) => {
            users.push(val.user);
        })
    }
    const DeleteJob = (id) => {
        props.DeleteJob(id);
    }
    const DeleteArchive = (id) => {
        props.DeleteArchive(id);
    }
    return (
        <>
            <div className="col-xl-6 col-lg-12 mb-4">
                <div className="card_dashboard card card-body whitecolorbg pb-2">
                    <div className="d-flex align-items-center pb-3 dropdown for_all">
                        <p className="fontsize14 m-0">{dateFormat(props.deadline_date, props.date_format)}</p>
                        <NavLink to="#" data-bs-toggle="dropdown" className="ml-auto" data-toggle="dropdown"><img className="img-fluid" src={vertical_bars} alt="" /></NavLink>
                        <div className="dropdown-menu m-0 dropdown-menu-right">
                            <NavLink to={`${process.env.PUBLIC_URL}/edit/`+props.pid} className="dropdown-item fontsize14"><img className="img-fluid mr-2" src={editiconimg} alt="" /> Edit</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.pid} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={viewdetailiconimg} alt="" /> View Details</NavLink>
                            <NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.pid+'/gantt'} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={granttcharticonimg} alt="" /> Grantt Chart</NavLink>
                            <a href={Globalsettings.url+"api/gantt-chart/"+props.pid} className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={statisticsiconimg} alt="" /> Public Grantt Chart</a>
                            <NavLink onClick={() => DeleteArchive(props.pid)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={archiveiconimg} alt="" /> Archive</NavLink>
                            <NavLink onClick={() => DeleteJob(props.pid)} to="#" className="dropdown-item fontsize14"><img className="img-fluid mr-2" width="12" src={crossiconimg} alt="" /> Delete</NavLink>
                        </div>
                    </div>
                    <div className="d-flex align-items-center pb-4">
                        <div>
                            <h4 className="mb-2"><NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="fontsize22 mb-1 blackcolortext">{props.project_name}</NavLink></h4>
                            {users.length > 0 ?
                                users.map((val) => {
                                    return (
                                        <small>{val.name} [{val.company_name}]</small>
                                    )
                                })
                                :
                                <span></span>

                            }
                            <span className="d-flex justify-content-center mt-2 px-3 py-2 text-center fontsize12 fontweightmeduim border-radius-100 badgegreenbg badgegreencolor" >{props.status}</span>
                        </div>
                        <div className="ml-auto w-100px">
                            <CircularProgressbar
                                value={props.completion_percent}
                                text={`${props.completion_percent}%`}
                                styles={buildStyles({
                                    rotation: 0.50,
                                    strokeLinecap: 'butt',
                                    textSize: '18px',
                                    fontWeight: 'bold',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(0, 163, 137, ${props.completion_percent / 10})`,
                                    textColor: '#00A389',
                                    trailColor: '#E1E3F3',
                                })}
                            />
                        </div>
                    </div>
                    <div className="card-footer d-flex align-items-center py-2 px-0">
                        <div className="d-flex align-items-center">
                            <div className="d-inline-flex">
                                {users.map((val) => {
                                    return (
                                        <span className="m-minus-left-15 avatar"><img className="img-fluid" width="35" src={val.image_url} alt="" /></span>
                                    )
                                })}
                            </div>
                            <NavLink to={`${process.env.PUBLIC_URL}/view_details/`+props.pid+'/member'} className="ml-2 blusecolorbg border-radius-100 w-30px h-30px text-center justify-content-center d-flex"><img width="20" className="img-fluid" src={plusiconimg} alt="" /></NavLink>
                        </div>
                        <div className="ml-auto"><span className={"px-3 py-1 fontsize14 border-radius-100 " + props.bg_color}>{props.weekly_text}</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobLoop;