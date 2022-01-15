import React from "react";

const TopBoxesLoop = (props) => {
    return (
        <>
            <div className="col-xl-4 col-lg-6 mb-3">
                <div className="card card_dashboard p-4">
                    <div className="d-flex align-items-center h-100">
                        <div className={"ellipse_circle " + props.classnth}><h4 className="fontsize22 m-0 white_text_color">{props.counternumber}</h4></div>
                        <div className="ml-3">
                            <p className="m-0 lightgraycolortext fontweightmeduim">{props.toptitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBoxesLoop;