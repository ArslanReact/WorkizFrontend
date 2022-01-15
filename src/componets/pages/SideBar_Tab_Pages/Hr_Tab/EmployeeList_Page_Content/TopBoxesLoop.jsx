import React from "react";

const TopBoxesLoop = (props) => {
    return (
        <>
            <div className="col-xl-4 col-lg-6 mb-xl-0 mb-3">
                <div className="card card_dashboard p-4">
                    <div className="d-flex align-items-center h-100">
                        <div className={"ellipse_circle mr-5 " + props.classNamenth}><img className="img-fluid" width="24" src={props.iconimg} alt={props.altburger} /></div>
                        <div className="">
                            <p className="m-0 lightgraycolortext">{props.toptitle}</p>
                            <h6 className="fontweightbold paragraphcolortext">{props.topnumber}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBoxesLoop;