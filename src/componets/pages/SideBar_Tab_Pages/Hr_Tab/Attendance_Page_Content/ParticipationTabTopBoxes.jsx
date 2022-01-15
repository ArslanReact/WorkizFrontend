import React from 'react';

const PrecencesTabTopBoxes = (props) => {
    return (
        <>
            <div className="col-xl-4 col-lg-12 mb-4 mb-lg-0">
                <div className={"p-3 border-radius-15 d-flex align-items-center " + props.box_bg}>
                    <div className={"mr-3 border-radius-100 w-60px d-flex justify-content-center align-items-center h-60px text-white fontsize16 " + props.circle_bg}>{props.count_number}</div>
                    <h5 className="mr-auto fontsize12 blackcolortext fontweightbold">{props.title}</h5>
                </div>
            </div>
        </>
    )
}

export default PrecencesTabTopBoxes;
