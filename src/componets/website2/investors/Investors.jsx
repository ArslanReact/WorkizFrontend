import React from 'react';

// component import
import InvestorLoop from "../investors/InvestorLoop";

// import images
import image_01 from "../../../assets/images/website/image_01.svg";

const Investors = () => {
    const InvestorLoopArray = [
        {
            key: "0",
            image: image_01,
            title: "“Workiz helps you gather all this information in a very easy and professional way.”",
            paragraph: "Magenta Venture Partners is a venture capital firm focused exclusively on Israeli and Israeli-related early stage technology startups across multiple categories including Automotive, Mobility, Enterprise Software, IoT, Industry 4.0, Artificial Intelligence, Fintech, and Digitalization. Magenta Venture Partners is backed by prominent Japanese institutional investors,",
            website: "website",
        },
        {
            key: "1",
            image: image_01,
            title: "“Workiz helps you gather all this information in a very easy and professional way.”",
            paragraph: "Magenta Venture Partners is a venture capital firm focused exclusively on Israeli and Israeli-related early stage technology startups across multiple categories including Automotive, Mobility, Enterprise Software, IoT, Industry 4.0, Artificial Intelligence, Fintech, and Digitalization. Magenta Venture Partners is backed by prominent Japanese institutional investors,",
            website: "website",
        },
    ]
    return (
        <>
            <div className="top_banner pt-5 text-center">
                <h5>Investors</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-9 mx-auto">
                    {InvestorLoopArray.map((val) => {
                        return (
                            <InvestorLoop
                                key={val.key}
                                title={val.title}
                                paragraph={val.paragraph}
                                website={val.website}
                                image={val.image}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Investors;
