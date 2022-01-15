import React from 'react';
import ReactTimeAgo from 'react-time-ago';
const C_D_Latest_Client = (props) => {
    return (
        <>
            <li className="px-2 py-2 d-flex align-items-center my-2 whitecolorbg border-radius-10">
                <p className="m-0 mr-3 avatar-image"><img className="img-fluid" src={props.avatar} alt="test" /></p>{props.name} ( {props.company_name} )
                <small className="ml-3 d-block lightgraycolortext"><ReactTimeAgo date={props.created_at} locale="en-US"/></small>
            </li>
        </>
    )
}

export default C_D_Latest_Client;