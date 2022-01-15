import React from 'react';

const ApprovedModalTopBoxes = (props) => {
    return (
        <>
            <li className="col-4 mb-3">
                <div className="d-flex align-items-center">
                    <div className={"mr-3 w-50px border-radius-100 text-white align-items-center d-flex justify-content-center h-50px text-center " + props.circlebdcolor}>{props.circletext}</div>
                    <h6>{props.title}</h6>
                </div>
            </li>
        </>
    )
}

export default ApprovedModalTopBoxes;
