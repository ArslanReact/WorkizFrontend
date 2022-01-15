import React from 'react';
import { Accordion } from "react-bootstrap";

// import component
import PositionLoop from "../careers/PositionLoop";

// images import
import img1 from "../../../assets/images/website/img_01.png";
import img2 from "../../../assets/images/website/img_02.png";
import img3 from "../../../assets/images/website/img_03.png";

const Careers = () => {
    const PositionLoopArray = [
        {
            key: "0",
            title: "Design",
            subtitle: "Product Designer",
            paragraph: "Lorem Ipsum",
            linktext: "Read More",
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Careers</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-9 mx-auto">
                    <div className="pb-4">
                        <p className="fontsize18 paragraph_grey1_text_color fontweightbold">We’re always <span className="drkblue_text_color">Hiring.</span></p>
                    </div>
                    {/*  */}
                    <div className="main_head text-center">
                        <h4 className="fontsize26">Remodelmate is an online marketplace for buying, selling, and management</h4>
                    </div>
                    <div className="row mt-5">
                        <div className="col-xl-4 col-lg-4 col-md-4 text-center"><img className="img-fluid" src={img1} alt="office1" /></div>
                        <div className="col-xl-4 col-lg-4 col-md-4 text-center"><img className="img-fluid" src={img2} alt="office2" /></div>
                        <div className="col-xl-4 col-lg-4 col-md-4 text-center"><img className="img-fluid" src={img3} alt="office3" /></div>
                    </div>
                    {/*  */}
                    <div className="main_head text-center mt-xl-5">
                        <h4 className="">Open Positions</h4>
                    </div>
                    {/*  */}
                    <div className="card-body">
                        <Accordion defaultActiveKey="0">
                            {PositionLoopArray.map((val) => {
                                return (
                                    <PositionLoop
                                        key={val.key}
                                        title={val.title}
                                        subtitle={val.subtitle}
                                        paragraph={val.paragraph}
                                        linktext={val.linktext}
                                    />
                                )
                            })}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Careers;
