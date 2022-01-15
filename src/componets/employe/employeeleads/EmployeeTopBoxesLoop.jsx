import React from "react";

const EmployeeTopBoxesLoop = (props) => {
    return (
        <>
            <div className="col-xxl-4 col-lg-12 mb-xl-0 mb-3">
                <div className="card card_dashboard p-4">
                    <div className="d-flex align-items-center h-100">
                        <div className={"ellipse_circle mr-5 " + props.classnth}><img className="img-fluid" width="24" src={props.iconimg} alt={props.altburger} /></div>
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

export default EmployeeTopBoxesLoop;