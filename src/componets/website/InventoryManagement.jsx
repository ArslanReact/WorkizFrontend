import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

// image import
import screen_31 from "../../assets/images/website/screen_31.png";
import screen_32 from "../../assets/images/website/screen_32.png";
import screen_33 from "../../assets/images/website/screen_33.svg";
import screen_34 from "../../assets/images/website/screen_34.svg";
import screen_35 from "../../assets/images/website/screen_35.svg";
import screen_36 from "../../assets/images/website/screen_36.svg";
import frame_vector_2 from "../../assets/images/website/frame_vector_2.svg";
import frame_vector_3 from "../../assets/images/website/frame_vector_3.svg";
import frame_vector_1 from "../../assets/images/website/frame_vector_1.svg";

const InventoryManagement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="top_banner py-5">
                <div className="col-10 col-xl-11 mx-auto">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                            <h5 className="text-left">Inventory Management </h5>
                            <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                        </div>
                        <div className="col-xl-6 col-lg-12"><img className="img-fluid" src={screen_31} alt="screen Scheduling" /></div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4 mt-5">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img width="600" className="img-fluid" src={screen_32} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Inventory Listing</h6>
                                <p className="paragraph_grey1_text_color">List all of your inventory with prices and availability. EasyManage allows you to add, search, or edit inventories of your business.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Inventory Filter</h6>
                                <p className="paragraph_grey1_text_color">Apply different filters on inventories and get desired results. Set date range, category, sub-category, status, and other labels to filter the inventory. This makes it easier for the employee to view the status of each inventory.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_33} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_3} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_34} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Create Inventory</h6>
                                <p className="paragraph_grey1_text_color">Add new inventory to your list with an easy method. Just fill a form with the details of the inventory such as name, category, tax, description, prices, and more.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Product Category</h6>
                                <p className="paragraph_grey1_text_color">EasyManage allows you to sort the inventory according to product categories. Categories make it easier to find the required result from the list and the user can take action.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_35} alt="screen_1" /></div>
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="py-lg-5 py-4">
                <div className="col-xl-11 col-10 mx-auto">
                    <div className="row align-items-center mb-5">
                        <div className="col-xl-5 col-lg-12 order-xl-0 order-1">
                            <div className="position-relative text-center">
                                <span className="vector_top_right bottom right"><img className="img-fluid" src={frame_vector_2} alt="frame_vector" /></span>
                                <div className="position-relative z-index-1"><img className="img-fluid" src={screen_36} alt="screen_1" /></div>
                                <span className="vector_top_right top left"><img className="img-fluid" src={frame_vector_1} alt="frame_vector" /></span>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 order-xl-0 order-0">
                            <div className="heading">
                                <h6>Product Sub Category</h6>
                                <p className="paragraph_grey1_text_color">Assign a sub-category to your inventory products. Sub-category groups the products with similar nature. It enables to further structure products and take action.</p>
                                <NavLink to={`${process.env.PUBLIC_URL}/signup`} className="btnweb d-inline-flex btn mt-4 seablue_bg_color" >Get Started</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventoryManagement;
