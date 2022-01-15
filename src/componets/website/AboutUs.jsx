import React, { useEffect } from 'react';

// image import
import about_img1 from "../../assets/images/website/about_img1.png";
import about_img2 from "../../assets/images/website/about_img2.png";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>About Us</h5>
            </div>
            {/*  */}
            <div className="py-5 about">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-4 col-lg-12 order-xl-0 order-1"><img className="img-fluid w-100" src={about_img1} alt="aboutimage" /></div>
                        <div className="col-xl-8 col-lg-12 order-xl-0 order-0">
                            <div className="card-body">
                                <h4>“Easy Manage Just simply amazing. Feel lucky use their service.Highly recommended and appriciate their service highly trusted.</h4>
                                <p>EasyManage is a management software that allows you to communicate with your employees. Turn your business into a professional one. Sort data according to your preference and make your work easier.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-9 col-xl-11 mx-auto">
                    <div className="row">
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="shadow_box card-body text-center">
                                <h6 className="fontsize48 fontweightbold blue_text_color">1200+</h6>
                                <p className="paragraph_grey1_text_color fontsize18">Positive Review</p>
                                <p className="m-0 blue_text_color fontsize18">A place to think and track ideas</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="shadow_box card-body text-center">
                                <h6 className="fontsize48 fontweightbold blue_text_color">120+</h6>
                                <p className="paragraph_grey1_text_color fontsize18">Branches</p>
                                <p className="m-0 blue_text_color fontsize18">A home for your iqu team, best</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 mb-4 mb-xl-0">
                            <div className="shadow_box card-body text-center">
                                <h6 className="fontsize48 fontweightbold blue_text_color">1K</h6>
                                <p className="paragraph_grey1_text_color fontsize18">Work Done</p>
                                <p className="m-0 blue_text_color fontsize18">Beautiful doc for you APIs, Products</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-5 about">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-12 order-xl-0 order-0">
                            <div className="card-body">
                                <small className="blue_text_color fontweightbold">Our product philosophy</small>
                                <h4>We're looking for the brightest minds to us develop the future of work due.</h4>
                                <p>EasyManage is a software that helps you to manage your business efficiently. There are multiple service management tools available in the market but EasyManage has something more to offer. Instead of spending on marketing campaigns and measuring the status of the business. We bring you something through which you can handle all of your business work productively.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 order-xl-0 order-1"><img className="img-fluid w-100" src={about_img2} alt="aboutimage" /></div>
                        <p className="mt-xl-4">With this exceptional management system, you can always stay connected to your business and monitor your employees. Keep track of your employee's attendance, work, client interactions, proposals, and much more.</p>
                        <p>Get a 14-day free trial and learn more about our software. We help our customers grow their business and productivity. Our software has the most advanced technology used that helps in the smoother completion of tasks.</p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12">
                            <ul className="list-unstyled py-5 px-4 card-body blue_bg_color border_radius_10">
                                <li className="mb-4">
                                    <h5 className="text-white fontsize22">Individual</h5>
                                    <p className="text-white m-0">We help you reach the maximum potential of your business.</p>
                                </li>
                                <li className="mb-4">
                                    <h5 className="text-white fontsize22">Time well spent</h5>
                                    <p className="text-white m-0">Manage your time efficiently and get quicker access to required information.</p>
                                </li>
                                <li className="">
                                    <h5 className="text-white fontsize22">Quietly powerful</h5>
                                    <p className="text-white m-0">With a powerful system, you don't have to worry if you are missing any alerts.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xl-6 col-lg-12">
                            <ul className="list-unstyled py-5 px-4 card-body blue_bg_color border_radius_10">
                                <li className="mb-4">
                                    <h5 className="text-white fontsize22">Big Company</h5>
                                    <p className="text-white m-0">Transform your small or start-up business into a large business.</p>
                                </li>
                                <li className="mb-4">
                                    <h5 className="text-white fontsize22">Make your work easy</h5>
                                    <p className="text-white m-0">Streamline your business processes by using an efficient tool.</p>
                                </li>
                                <li className="">
                                    <h5 className="text-white fontsize22">Build together</h5>
                                    <p className="text-white m-0">Our highly-skilled team of experts collaborates throughout the project. We work together to deliver an outstanding project.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;
