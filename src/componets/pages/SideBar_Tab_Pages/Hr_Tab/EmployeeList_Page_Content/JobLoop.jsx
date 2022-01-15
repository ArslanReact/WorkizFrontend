import React from 'react';
import { NavLink } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const JobLoop = (props) => {
    return (
        <>
            <div className="col-xl-5 col-lg-12 mb-4">
                <div className="card-body tolightgraycolor2bg pb-2">
                    <div className="py-4 d-flex align-items-center">
                        <div>
                            <p className="fontsize14 paragraphcolor1text mb-3">{props.top_date}</p>
                            <h4 className="mb-2"><NavLink to={`${process.env.PUBLIC_URL}/view_details`} className="fontsize22 fontweightbold mb-1 blackcolortext">{props.title}</NavLink></h4>
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
                </div>
            </div>
        </>
    )
}

export default JobLoop;
