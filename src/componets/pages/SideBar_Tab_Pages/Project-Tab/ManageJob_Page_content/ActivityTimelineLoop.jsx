import React from 'react';

const ActivityTimelineLoop = (props) => {
    return (
        <>
            <li className="py-3 px-3 d-flex align-items-center justify-content-between">
                <h4 className="fontsize16 blackcolortext">{props.title} <small className="paragraphcolor1text mt-1 d-block fontsize14">{props.smalltext1}</small></h4>
                <small className="paragraphcolor1text">{props.smalltext2}</small>
            </li>
        </>
    )
}

export default ActivityTimelineLoop;
