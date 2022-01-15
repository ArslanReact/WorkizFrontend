import React from 'react';
import { NavLink } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
// 
import ReviewCardLoop from "../review/ReviewCardLoop";
import ClientLoop from "../homepage/ClientLoop";
import ClientLoopArray from "../homepage/ClientLoopArray";

// image import
import banner_01 from "../../../assets/images/website/wallpaper_img.svg";

const Reviews = () => {
    const ReviewCardLoopAray = [
        {
            key: "0",
            banner_image: banner_01,
            title: "“Workiz helps you gather all this information in a very easy and professional way.”",
            paragraph: "Robert CEO of HR Locksmith 24/7",
        },
        {
            key: "2",
            banner_image: banner_01,
            title: "“Workiz helps you gather all this information in a very easy and professional way.”",
            paragraph: "Robert CEO of HR Locksmith 24/7",
        },
    ]
    return (
        <>
            <div className="top_banner pt-5 text-center">
                <h5>Reviews</h5>
            </div>
            {/*  */}
            <div className="py-5 pricing_content">
                <div className="col-10 col-xl-9 mx-auto">
                    <div className="main_head text-center mb-4">
                        <h4>Make Your Business Work. It’s Easy </h4>
                        <p>Don’t take our word for it, our customers say it all.</p>
                    </div>
                    {/*  */}
                    <ul className="row list-unstyled mb-4">
                        {ReviewCardLoopAray.map((val) => {
                            return (
                                <ReviewCardLoop
                                    key={val.key}
                                    banner_image={val.banner_image}
                                    title={val.title}
                                    paragraph={val.paragraph}
                                />
                            )
                        })}
                    </ul>
                    <div className="d-flex align-items-center justify-content-center">
                        <NavLink to="#" className="fontweightbold px-4 py-3 fontsize20 drkblue_text_color border_radius_10 seablue_bg_color">Start Free Trial</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 testimonials">
                <div className="col-xl-11 col-10 mx-auto mb-4">
                    <div className="main_head text-center mt-xl-5">
                        <h4 className="text-white">500+ Companies Have Switched to EasyManage</h4>
                    </div>
                    {/*  */}
                    <div className="row pt-lg-4 mb-xl-5">
                        <OwlCarousel className="owl-theme" loop items={3} responsiveClass={true} margin={60} lazyLoad={true} autoplay={true} >
                            {ClientLoopArray.map((val) => {
                                return (
                                    <ClientLoop
                                        key={val.key}
                                        paragraph={val.paragraph}
                                        title_name={val.title_name}
                                        small_name={val.small_name}
                                        avatar_img={val.avatar_img}
                                    />
                                )
                            })}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews;