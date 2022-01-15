import React from "react";

const TopBoxesLoop = (props) => {
    return (
        <>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-12 mb-4">
                <div className="card card_dashboard p-4">
                    <div className="d-flex align-items-center h-100">
                        <div className={"ellipse_circle " + props.classnth}><img className="img-fluid" width="24" src={props.iconimg} alt="" /></div>
                        <div className="ml-auto">
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