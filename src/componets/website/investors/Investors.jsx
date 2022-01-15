import React, { useEffect } from 'react';

// component import
import InvestorLoop from "../investors/InvestorLoop";

// import images
import image_01 from "../../../assets/images/website/image_01.svg";

const Investors = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // InvestorLoopArray
    const InvestorLoopArray = [
        {
            key: "0",
            image: image_01,
            title: "“Magenta Venture Partners.”",
            paragraph: "Magenta Venture Partners is a firm based in Herzliya, Israel. The company was founded in 2017 and invests in various technological sectors. Magenta Venture Partners have a Japanese background and is funded by Mitsui & Co. Ltd. The firm has experience in making high investments in startups, technological and corporate businesses.",
            website: "website",
        },
        {
            key: "1",
            image: image_01,
            title: "“Aleph”",
            paragraph: "Aleph is a firm that provides start-up capital for entrepreneurs to build large and globally known companies. The firm was founded in 2013 and has an equal partnership of Eden Shochat, Michael Eisenberg, and Aaron Rosenson. Aleph supports strong businesses that have a high local community. The company invests in the technological ecosystem to transform businesses.",
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
