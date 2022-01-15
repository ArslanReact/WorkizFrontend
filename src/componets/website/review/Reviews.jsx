import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
// 
import ReviewCardLoop from "../review/ReviewCardLoop";
import ClientLoop from "../homepage/ClientLoop";

// image import
import banner_01 from "../../../assets/images/website/wallpaper_img.svg";
import avatar_01 from "../../../assets/images/website/avatar_1.svg";
import avatar_02 from "../../../assets/images/website/avatar_2.svg";
import avatar_03 from "../../../assets/images/website/avatar_3.svg";

const Reviews = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    // ReviewCardLoopAray
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
    // optionsprojects
    const optionsprojects = {
        margin: 15,
        responsiveClass: true,
        nav: false,
        dots: false,
        autoplay: true,
        navText: ["Prev", "Next"],
        smartSpeed: 300,
        loop: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 1,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 2,

            },
            1500: {
                items: 3,

            },
        },
    };
    // ClientLoopArray
    const ClientLoopArray = [
        {
            key: "0",
            paragraph: "EasyManage is a great app that has made our company efficiently manage its tasks. We can easily keep a record of our employees and the projects we are working on.",
            title_name: "John Reeves",
            small_name: "Marketing Manager",
            avatar_img: avatar_01,
        },
        {
            key: "1",
            paragraph: "With this impressive app, our businesses processes are speed up. Our employees have 24/7 access to the software through which they can manage their work calendar easily.",
            title_name: "Milton Austin",
            small_name: "Sales Manager",
            avatar_img: avatar_02,
        },
        {
            key: "2",
            paragraph: "This app is fast and has spectacular functions. Our company had gained 10% more customers in last few months. We are able to maintain a real-time record of existing and proposed projects.",
            title_name: "Martha Rojas",
            small_name: "Director",
            avatar_img: avatar_03,
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Review</h5>
            </div>
            {/*  */}
            <div className="py-5 pricing_content">
                <div className="col-10 col-xl-10 col-lg-11 mx-auto">
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
                        <NavLink to={`${process.env.PUBLIC_URL}/signin`} className="fontweightbold px-4 py-3 fontsize20 drkblue_text_color border_radius_10 seablue_bg_color">Start Free Trial</NavLink>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-4 testimonials mb-5">
                <div className="col-xl-11 col-10 mx-auto mb-4">
                    <div className="main_head text-center mt-xl-5">
                        <h4 className="text-white">500+ Companies Have Switched to EasyManage</h4>
                    </div>
                    {/*  */}
                    <div className="row pt-lg-4 mb-xl-5">
                        <OwlCarousel className='owl-theme h-100' {...optionsprojects}>
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