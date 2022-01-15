import React from "react";

const TopBoxesLoop = (props) => {
    return (
        <>
            <li className="col-lg-12 mb-4">
                <div className="card_dashboard card p-4">
                    <div className="d-flex align-items-center h-100">
                        <div className={"ellipse_circle mr-5 " + props.classnth}><img className="img-fluid" width="24" src={props.iconimg} alt={props.altburger} /></div>
                        <div className="">
                            <p className="m-0 lightgraycolortext">{props.toptitle}</p>
                            <h6 className="fontweightbold paragraphcolortext">{props.topnumber}</h6>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default TopBoxesLoop;