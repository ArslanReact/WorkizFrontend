import React from 'react';
import { NavLink } from 'react-router-dom';

const ClientLoop = (props) => {
    return (
        <>
            <div className="col-xl-4 text-center item">
                <div className="card-body bg-white border_radius_15 p-xl-5 position-relative">
                    <p className="m-0 mb-5">{props.paragraph}</p>
                    <div className="d-block mb-4">
                        <h4 className="m-0"><NavLink to="#" className="blue_text_color fontweightbold">{props.title_name}</NavLink></h4>
                        <p className="m-0 paragraph_grey1_text_color fontsize14">{props.small_name}</p>
                    </div>
                    <div className="avatar_client"><NavLink to="#"><img className="img-fluid" src={props.avatar_img} alt="avatar" /></NavLink></div>
                </div>
            </div >
        </>
    )
}

export default ClientLoop;
