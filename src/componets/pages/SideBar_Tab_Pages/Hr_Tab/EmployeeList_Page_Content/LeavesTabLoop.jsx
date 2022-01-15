import React from 'react';

const LeavesTabLoop = (props) => {
    return (
        <>
            <div className="col-xl-4">
                <div className="tolightredcolorbg d-flex align-items-center py-3 px-3 border-radius-10">
                    <p className="m-0">{props.text}</p>
                    <span className={"ml-auto fontsize14 py-2 px-4 border-radius-100 " + props.badgebgcolor}>{props.badgetext}</span>
                </div>
            </div>
        </>
    )
}

export default LeavesTabLoop;
