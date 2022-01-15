import React from 'react';

const OverviewTopDataLoop = (props) => {
    return (
        <>
            <li><h4 className="fontsize14">{props.headtitle}</h4></li>
            <li><span className="mr-2 greencolortext">{props.earningtitle1}</span>{props.earningtile2}</li>
            <li><span className="mr-2 lightbluecolortext">{props.earningtitle3}</span>{props.earningtile4}</li>
            <li><span className="mr-2 yelowcolortext">{props.earningtitle5}</span>{props.earningtile6}</li>
            <li className="d-flex">
                <div className=""><img className="img-fluid" src={props.avatarimg} alt="" /></div>
                <div className=""><img className="img-fluid" src={props.avatarimg} alt="" /></div>
            </li>
        </>
    )
}

export default OverviewTopDataLoop;
